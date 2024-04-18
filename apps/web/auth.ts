import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { saltAndHashPassword } from "@/utils/password";
import { createUser, verifyAndGetUser } from "./utils/users";
import { authSchema } from "./lib/zod";

export const { handlers, auth, signIn } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
        signup: {},
      },
      authorize: async (credentials) => {
        try {
          const { email, password, signup } =
            await authSchema.parseAsync(credentials);
          // not sure how to do the zod transform to work with the form, so this is what we are doing for now..
          const createNewUser = signup === "true";
          if (!createNewUser) {
            const user = await verifyAndGetUser(email, password);

            if (!user) {
              throw new Error("User not found.");
            }

            return user;
          }

          // logic to salt and hash password
          const pwHash = await saltAndHashPassword(password);
          // logic to create a new user
          const user = await createUser(email, pwHash);
          return user;
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
});
