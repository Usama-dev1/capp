import { Outlet } from "react-router";
import DashSidebar from "./DashSidebar";
import DashBoardNav from "./DashboardNav";
const DashBoardLayout = () => {
  return (
    <>
      <div className="sm:hidden">
        <DashBoardNav />
      </div>
      <div className="w-full h-screen mx-auto max-w-6xl flex">
        {/* 2. Sidebar - Fixed width (e.g., 1/4 or 1/3) */}
        <aside className="hidden sm:flex w-50 h-full bg-gray-100">
          <DashSidebar />
        </aside>
        {/* 3. Main Content Area - Grows to fill the remaining space */}
        <main className="w-full sm:flex-1 h-full overflow-y-auto p-2">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default DashBoardLayout;
