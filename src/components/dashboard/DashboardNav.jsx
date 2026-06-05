import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { useAuth } from "../../hooks/useAuth";
import { NavLink, useNavigate } from "react-router";

const DashBoardNav = () => {
  const links = [
    { name: "Overview", path: "/dashboard", end: true },
    { name: "My Posts", path: "/dashboard/posts" },
    { name: "All Posts", path: "/dashboard/posts-all" },
    { name: "Home Page", path: "/" },
  ];

  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    closeMenu();
  };

  return (
    <nav className="sticky top-0 z-50 bg-blue-muted border-b border-slate-800 px-4 sm:px-6 lg:px-8 h-16 flex justify-between text-center items-center mb-2">
      <div className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 font-extrabold tracking-wider">
        <NavLink to="/">Blog</NavLink>
      </div>

      <button
        className="md:hidden z-50 relative text-slate-300 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? (
          <IoMdClose className="w-6 h-6" />
        ) : (
          <GiHamburgerMenu className="w-6 h-6" />
        )}
      </button>

      {menuOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40"
            onClick={closeMenu}
          />
          <div className="md:hidden fixed top-16 left-0 right-0 bg-slate-900 border-t border-slate-800 p-6 z-40 flex flex-col items-center gap-4 shadow-2xl animate-in fade-in slide-in-from-top-5">
            <div className="w-full flex flex-col gap-1.5">
              <div className="my-4">
                <NavLink
                  to="/dashboard/create-post"
                  className="btn-primary"
                  onClick={closeMenu}
                >
                  Create Post
                </NavLink>
              </div>
              {links.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.end}
                  onClick={closeMenu}
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
              <div>
                <button
                  onClick={handleLogout}
                  className="w-20 btn-destructive btn-sm"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default DashBoardNav;
