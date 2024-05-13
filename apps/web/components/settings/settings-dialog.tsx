"use client";

import { useEffect, useState } from "react";
import {
  DialogContent,
  DialogPortal,
  DialogOverlay,
  DialogTitle,
} from "@ui/components/dialog";
import { Button } from "@ui/components/button";
import { Input } from "@ui/components/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@ui/components/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getProfile, updateProfileOnboarding } from "@/lib/actions";
import { useSession } from "next-auth/react";
import { RadioGroup, RadioGroupItem } from "@ui/components/radio-group";
import { onboardingSchema } from "@/lib/zod";

export default function SettingsDialog({
  setDialogOpen,
}: {
  setDialogOpen: (open: boolean) => void;
}) {
  const { data: session } = useSession();

  const [isProfileLoaded, setIsProfileLoaded] = useState(false);

  const form = useForm<z.infer<typeof onboardingSchema>>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      ageRange: "",
      profession: "",
    },
  });

  useEffect(() => {
    if (session?.user?.email) {
      getProfile().then((profile) => {
        form.setValue("ageRange", profile.ageGroup);
        form.setValue("profession", profile.profession);
        setIsProfileLoaded(true);
      });
    }
  }, [session]);

  const onSubmit = async (data: z.infer<typeof onboardingSchema>) => {
    if (!data.ageRange || !data.profession) {
      return;
    }
    const user = await updateProfileOnboarding({
      ageRange: data.ageRange,
      profession: data.profession,
    });
    if (!user) {
      return;
    }
    setDialogOpen(false);
  };

  useEffect(() => {}, []);

  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogContent className=" overflow-hidden">
        <DialogTitle>
          <h1 className="text-3xl font-bold">Welcome to the platform!</h1>
        </DialogTitle>
        {isProfileLoaded && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="ageRange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Please select your age range</FormLabel>
                    <FormControl>
                      <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <div className="flex flex-row items-center justify-start gap-4">
                          <RadioGroupItem value={"18-24"} id="r1" />
                          <label htmlFor="r1">18-24</label>
                        </div>
                        <div className="flex flex-row items-center justify-start gap-4">
                          <RadioGroupItem value={"25-34"} id="r2" />
                          <label htmlFor="r2">35-44</label>
                        </div>
                        <div className="flex flex-row items-center justify-start gap-4">
                          <RadioGroupItem value={"35-44"} id="r3" />
                          <label htmlFor="r3">35-44</label>
                        </div>
                        <div className="flex flex-row items-center justify-start gap-4">
                          <RadioGroupItem value={"45-54"} id="r4" />
                          <label htmlFor="r4">45-54</label>
                        </div>
                        <div className="flex flex-row items-center justify-start gap-4">
                          <RadioGroupItem value={"55-64"} id="r5" />
                          <label htmlFor="r5">55-64</label>
                        </div>
                        <div className="flex flex-row items-center justify-start gap-4">
                          <RadioGroupItem value={"65+"} id="r6" />
                          <label htmlFor="r6">65+</label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="profession"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Please enter your profession</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit">Save</Button>
            </form>
          </Form>
        )}
      </DialogContent>
    </DialogPortal>
  );
}
