"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@ui/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/components/form";
import { Input } from "@ui/components/input";
import { useToast } from "@ui/components/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { authSchema } from "@/lib/zod";
import { z } from "zod";
import { submitAuthForm } from "@/lib/actions";
import { useRouter, useSearchParams } from "next/navigation";

export default function Auth() {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
      signup: "false",
    },
  });

  async function onSubmit(data: z.infer<typeof authSchema>) {
    try {
      await submitAuthForm(data);
    } catch (error) {
      toast({
        title: "Invalid credentials",
        description: "Please check your email and password and try again.",
      });
    }
  }

  if (searchParams.get("token") && searchParams.get("email")) {
    onSubmit({
      email: searchParams.get("email") ?? "",
      password: searchParams.get("token") ?? "",
      signup: searchParams.get("signup") === "true" ? "true" : "false",
    })
      .then(() => {
        router.push("/home");
      })
      .catch(() => {
        router.push("/auth/signin");
      });
  }

  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Sign in</h1>
            <p className="text-muted-foreground text-balance">
              Enter your email and password below to sign in
            </p>
          </div>
          <Form {...form}>
            <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="signup"
                defaultValue="false"
                render={() => null}
              />

              <Button type="submit" className="w-full">
                Sign in
              </Button>
              {/*
              <Button variant="outline" className="w-full">
                Sign up with Google
              </Button>
              */}
            </form>
          </Form>

          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account yet?{" "}
            <Link href="/auth/signup" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-muted hidden lg:block">
        <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
