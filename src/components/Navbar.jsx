import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { useAuth } from "../hooks/useAuth";
import { NavLink, useNavigate } from "react-router"; // Added useNavigate to prevent logout crashes

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { session, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-900 text-slate-100 border-b border-slate-800 backdrop-blur-md bg-opacity-95 px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
      {/* Brand Logo */}
      <div className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 font-extrabold tracking-wider">
        <NavLink to="/">Blog</NavLink>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-4">
        {!session ? (
          <div className="flex space-x-4">
            <NavLink to="/login" className="btn-ghost">
              Login
            </NavLink>
            <NavLink to="/register" className="btn-primary btn-lg">
              Register
            </NavLink>
          </div>
        ) : (
          <>
            <NavLink
              to="dashboard"
              className="w-30 text-center text-xs p-2  font-medium bg-blue-600 text-white py-2 rounded-xl shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition-all"
            >
              Go to Dashboard
            </NavLink>
            <button onClick={handleLogout} className="btn-ghost btn-lg">
              Logout
            </button>
          </>
        )}
      </div>

      {/* Mobile Toggle Button - Stacked explicitly on top with z-50 relative */}
      <button
        className="md:hidden z-50 relative text-slate-300 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {!menuOpen ? (
          <GiHamburgerMenu className="w-6 h-6" />
        ) : (
          <IoMdClose className="w-6 h-6" />
        )}
      </button>

      {/* Mobile Interactive Layer */}
      {menuOpen && (
        <>
          {/* 1. Dark Backdrop Overlay */}
          <div
            className="md:hidden fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40"
            onClick={() => setMenuOpen(false)}
          />

          {/* 2. Mobile Menu Drawer (Matches Slate-900 Theme) */}
          <div className="md:hidden fixed top-16 left-0 right-0 bg-slate-900 border-t border-slate-800 p-6 z-40 flex flex-col items-center gap-4 shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-top-5">
            {!session ? (
              <>
                <NavLink
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-center text-base font-medium text-slate-300 hover:text-white py-3 rounded-xl hover:bg-slate-800 transition-all"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-center text-base font-medium bg-blue-600 text-white py-3 rounded-xl shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition-all"
                >
                  Register
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="dashboard"
                  className="w-30 text-center text-xs p-2  font-medium bg-blue-600 text-white py-2 rounded-xl shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition-all"
                >
                  Go to Dashboard
                </NavLink>
                <button onClick={handleLogout} className="btn-ghost btn-lg">
                  Logout
                </button>
              </>
            )}
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
