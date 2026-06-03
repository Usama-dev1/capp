import { NavLink } from "react-router";

const DashSidebar = () => {
  const links = [
    { name: "Overview", path: "/dashboard" },
    { name: "Create", path: "/dashboard/create-post" },
    { name: "All Posts", path: "/dashboard/posts" },
  ];

  return (
    <aside className="w-full h-full bg-slate-900 text-white p-6 flex flex-col gap-6">
      <div className="text-xl font-bold tracking-wider">My Dashboard</div>

      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `px-4 py-2.5 text-center rounded-lg transition-colors duration-200 ${
                isActive
                  ? "bg-blue-600 text-white font-medium"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default DashSidebar;
