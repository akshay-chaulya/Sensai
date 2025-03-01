import { Suspense } from "react";
import InterviewSkeleton from "./_components/interview-skeleton";

const Layout = ({ children }) => {
  return (
    <div className="px-5">
      <Suspense fallback={<InterviewSkeleton />}>{children}</Suspense>
    </div>
  );
};

export default Layout;
