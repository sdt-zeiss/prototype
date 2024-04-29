import { prisma } from "database";

export async function getPosts() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {},
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

export async function createPost(data: {
  title: string;
  content: string;
  authorId: string;
  type: string;
}) {
  try {
    const post = await prisma.post.create({
      data,
    });
    return post;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function updatePost(
  id: string,
  data: { title: string; content: string },
) {
  try {
    const post = await prisma.post.update({
      where: {
        id,
      },
      data,
    });
    return post;
  } catch (error) {
    console.error(error);
    return null;
  }
}
