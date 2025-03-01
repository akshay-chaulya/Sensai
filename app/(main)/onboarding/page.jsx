import { industries } from "@/app/data/industries";
import OnboardingFrom from "./_components/onboarding-form";
import { getUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";

const OnboardingPage = async () => {
  // Check if user is already onboarded
  const { isOnboarded } = await getUserOnboardingStatus();

  if (isOnboarded) {
    redirect("/dashboard");
  }

  return (
    <main>
      <OnboardingFrom industries={industries} />
    </main>
  );
};

export default OnboardingPage;
