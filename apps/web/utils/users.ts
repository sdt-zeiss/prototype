import { prisma } from "database";
import { verifyPassword } from "./password";

export async function verifyAndGetUser(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function createUser(email: string, password: string) {
  try {
    const user = await prisma.user.create({
      data: {
        email,
        password,
      },
    });

    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}
