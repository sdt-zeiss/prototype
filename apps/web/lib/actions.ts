"use server";

import { auth, signIn, signOut } from "@/auth";
import { authSchema, commentSchema, postSchema } from "./zod";
import { z } from "zod";
import { prisma } from "database";
import { randomUUID } from "crypto";
import { uploadBuffer } from "s3";
import sharp from "sharp";

export async function submitAuthForm(data: z.infer<typeof authSchema>) {
  const user = await signIn("credentials", {
    ...data,
    redirectTo: `/home?onboarding=${data.signup}`,
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  return user;
}

export async function signOutAndRedirect() {
  await signOut({ redirectTo: "/auth/signin" });
}

export async function getPosts() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        title: true,
        content: true,
        type: true,
        author: {
          select: {
            email: true,
          },
        },
      },
    });
    return posts;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getPostsWithComments() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        status: true,
        title: true,
        content: true,
        type: true,
        author: {
          select: {
            email: true,
          },
        },
        likes: {
          select: {
            id: true,
            user: {
              select: {
                email: true,
              },
            },
          },
        },
        comments: {
          select: {
            id: true,
            content: true,
            createdAt: true,
            updatedAt: true,
            author: {
              select: {
                email: true,
              },
            },
          },
        },
      },
      where: {
        status: {
          in: ["user_generated", "ai_generated_approved"],
        },
      },
    });
    return posts;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getPostById(id: string) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    });
    return post;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function createPost(data: z.infer<typeof postSchema>) {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.email) {
      throw new Error("Unauthorized");
    }

    let imageId: string;
    if (data.imageDataUrl !== undefined) {
      imageId = randomUUID();

      const transformedImage = await sharp(
        Buffer.from(data.imageDataUrl.split(",")[1], "base64"),
      )
        .webp()
        .toBuffer();

      await uploadBuffer(transformedImage, imageId);
      console.log(`Image uploaded with key: ${imageId}`);
    }

    const post = await prisma.post.create({
      data: {
        status: "user_generated",
        title: data.title,
        content: data.content,
        imageId,
        type: data.type,
        author: {
          connect: {
            email: session.user.email,
          },
        },
      },
    });

    return post;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

export async function updatePost(id: string, data: z.infer<typeof postSchema>) {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      throw new Error("Unauthorized");
    }

    const post = await prisma.post.update({
      where: {
        id,
        authorId: session.user.id,
      },
      data,
    });
    return post;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function deletePost(id: string) {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.email) {
      throw new Error("Unauthorized");
    }

    await prisma.post.delete({
      where: {
        id,
        author: {
          email: session.user.email,
        },
      },
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function createLike(postId: string) {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.email) {
      throw new Error("Unauthorized");
    }

    const like = await prisma.like.create({
      data: {
        post: {
          connect: {
            id: postId,
          },
        },
        user: {
          connect: {
            email: session.user.email,
          },
        },
      },
    });
    return like;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function deleteLike(postId: string) {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.email) {
      throw new Error("Unauthorized");
    }

    await prisma.like.deleteMany({
      where: {
        postId,
        userId: session.user.id,
      },
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function createComment(
  postId: string,
  data: z.infer<typeof commentSchema>,
) {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.email) {
      throw new Error("Unauthorized");
    }

    const comment = await prisma.comment.create({
      data: {
        content: data.content,
        post: {
          connect: {
            id: postId,
          },
        },
        author: {
          connect: {
            email: session.user.email,
          },
        },
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        postId: true,
        author: {
          select: {
            email: true,
          },
        },
      },
    });
    return comment;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getComments(postId: string) {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId,
      },
      select: {
        id: true,
        content: true,
        author: {
          select: {
            email: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
    return comments;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function deleteComment(id: string) {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.email) {
      throw new Error("Unauthorized");
    }

    await prisma.comment.delete({
      where: {
        id,
        author: {
          email: session.user.email,
        },
      },
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function updateProfileOnboarding(data: {
  ageRange: string;
  profession: string;
}) {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.email) {
      throw new Error("Unauthorized");
    }
    const user = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        ageGroup: data.ageRange,
        profession: data.profession,
      },
    });
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getProfile() {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.email) {
      throw new Error("Unauthorized");
    }
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getUnreviewedPosts() {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.email) {
      throw new Error("Unauthorized");
    }
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
    if (user.type !== "Admin") {
      throw new Error("Unauthorized");
    }

    const posts = await prisma.post.findMany({
      where: {
        status: "ai_generated_unreviewed",
      },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        status: true,
        title: true,
        content: true,
        type: true,
        author: {
          select: {
            email: true,
          },
        },
        likes: {
          select: {
            id: true,
            user: {
              select: {
                email: true,
              },
            },
          },
        },
        comments: {
          select: {
            id: true,
            content: true,
            createdAt: true,
            updatedAt: true,
            author: {
              select: {
                email: true,
              },
            },
          },
        },
      },
    });
    return posts;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function reviewPost(id: string, status: string) {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.email) {
      throw new Error("Unauthorized");
    }
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
    if (user.type !== "Admin") {
      throw new Error("Unauthorized");
    }
    const post = await prisma.post.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
    return post;
  } catch (error) {
    console.error(error);
    return null;
  }
}
