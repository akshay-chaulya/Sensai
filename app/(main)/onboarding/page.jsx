"use client";

import { industries } from "@/app/data/industries";
import OnboardingFrom from "./_components/onboarding-form";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserOnboardingStatus } from "@/actions/user";

const OnboardingPage = () => {
  const router = useRouter();

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const { isOnboarded } = await getUserOnboardingStatus();
        if (isOnboarded) {
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Error checking onboarding status: ", error.message);
      }
    };

    checkOnboardingStatus();
  }, [router]);

  return (
    <main>
      <OnboardingFrom industries={industries} />
    </main>
  );
};

export default OnboardingPage;