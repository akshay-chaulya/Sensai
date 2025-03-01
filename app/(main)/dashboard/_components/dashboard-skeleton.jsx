import { Card } from "@/components/ui/card";

export default function DashboardSkeleton() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 dark:bg-gray-900 p-4 hidden md:block">
        {/* Sidebar content */}
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation Bar */}
        <header className="h-16 bg-white dark:bg-gray-800 shadow px-4 flex items-center">
          {/* Top bar content */}
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 bg-gray-50 dark:bg-gray-950">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Cards (Empty UI) */}
            <Card className="h-40" />
            <Card className="h-40" />
            <Card className="h-40" />
          </div>
        </main>
      </div>
    </div>
  );
}
