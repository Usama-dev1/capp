import { Outlet } from "react-router";
import DashSidebar from "./DashSidebar";

const DashBoardLayout = () => {
  return (
    <div className="w-full h-screen mx-auto max-w-6xl flex">
      {/* 2. Sidebar - Fixed width (e.g., 1/4 or 1/3) */}
      <aside className="w-1/4 h-full bg-gray-100 p-1">
        <DashSidebar />
      </aside>

      {/* 3. Main Content Area - Grows to fill the remaining space */}
      <main className="flex-1 h-full overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashBoardLayout;
