import { Suspense } from "react";
import DashboardSkeleton from "./_components/dashboard-skeleton";

const Layout = ({ children }) => {
  return (
    <div className="px-5">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-6xl font-bold gradient-title">Industry Insights</h1>
      </div>
      <Suspense fallback={<DashboardSkeleton />}>{children}</Suspense>
    </div>
  );
};

export default Layout;
