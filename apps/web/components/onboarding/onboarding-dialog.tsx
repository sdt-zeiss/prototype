"use client";

import { useEffect, useRef, useState } from "react";
import {
  DialogContent,
  DialogPortal,
  DialogOverlay,
  DialogTitle,
} from "@ui/components/dialog";
import { Button } from "@ui/components/button";
import { Input } from "@ui/components/input";
import { AnimatePresence, motion } from "framer-motion";
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
import { updateProfileOnboarding } from "@/lib/actions";
import { RadioGroup, RadioGroupItem } from "@ui/components/radio-group";
import { onboardingSchema } from "@/lib/zod";

export default function OnboardingDialog({
  setDialogOpen,
}: {
  setDialogOpen: (open: boolean) => void;
}) {
  const [step, setStep] = useState<1 | 2>(1);
  const prevStepRef = useRef(step);

  useEffect(() => {
    prevStepRef.current = step;
  }, [step]);

  const prevStep = prevStepRef.current;

  const form = useForm<z.infer<typeof onboardingSchema>>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      ageRange: "",
      profession: "",
    },
  });

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

  useEffect(() => { }, []);

  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogContent className=" overflow-hidden">
        <DialogTitle>
          <h1 className="text-3xl font-bold">Welcome to the platform!</h1>
        </DialogTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                layout
                initial={{ opacity: 0, x: step > prevStep ? 300 : -300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: step > prevStep ? 300 : -300 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-4"
              >
                {step === 1 && (
                  <div>
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
                                <label htmlFor="r2">25-34</label>
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
                  </div>
                )}
                {step === 2 && (
                  <div>
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
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
            <AnimatePresence mode="sync">
              <motion.div
                key={step}
                className="flex flex-row gap-4"
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Button
                  type={step === 1 ? "button" : "submit"}
                  onClick={() => step === 1 && setStep(2)}
                >
                  {
                    {
                      1: "Next",
                      2: "Finish",
                    }[step]
                  }
                </Button>
              </motion.div>
            </AnimatePresence>
          </form>
        </Form>
      </DialogContent>
    </DialogPortal>
  );
}
