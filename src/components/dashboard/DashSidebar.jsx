import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";

const DashSidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const links = [
    { name: "Overview", path: "/dashboard", end: true },
    { name: "My Posts", path: "/dashboard/posts" },
    { name: "All Posts", path: "/dashboard/posts-all" },
    { name: "Home Page", path: "/" },
  ];

  return (
    <aside className="w-full h-screen bg-slate-900 text-slate-100 p-2 flex flex-col justify-between items-center border-r border-slate-800">
      {/* Top Section: Brand & Navigation */}
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="text-lg font-bold  text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
          My Dashboard
        </div>

        <nav className="w-full flex flex-col gap-1.5">
          <div className="my-4">
            <NavLink to={"/dashboard/create-post"} className="btn-primary">
              Create Post
            </NavLink>
          </div>
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.end}
              className={({ isActive }) =>
                `px-4 py-1 rounded-md transition-all duration-200 text-sm font-medium ${
                  isActive
                    ? "bg-blue-border text-white shadow-lg shadow-blue-600/20"
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
      </div>

      <div>
        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="btn-destructive btn-sm"
        >
          Logout
        </button>

        {/* button for testing */}
        {/* <button
          onClick={() => {
            ``;
            logout();
            localStorage.removeItem("users");
            localStorage.removeItem("session");
          }}
          className="w-full rounded-xl py-2 px-4 bg-amber-600/10 hover:bg-amber-600 text-xs font-medium text-amber-400 hover:text-white transition-all duration-200"
        >
          Delete All Data
        </button> */}
      </div>
    </aside>
  );
};

export default DashSidebar;
