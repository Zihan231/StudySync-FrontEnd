import React, { use, useContext, useMemo } from "react";
import { NavLink } from "react-router";
import ThemeContext from "../../contexts/Theme/themeContext";
import AuthContext from "../../contexts/Auth/AuthContext/AuthContext";
import { FaBookOpen } from "react-icons/fa";

/** Active link styles */
const linkClasses = ({ isActive }) =>
  [
    "px-3 py-2 rounded-lg text-sm font-medium transition",
    "hover:bg-base-200 hover:text-base-content",
    isActive ? "bg-base-200 text-base-content" : "text-base-content/70",
  ].join(" ");

const NavBar = () => {
  const { darkMode, setDarkMode } = use(ThemeContext);
  const { user, logout } = useContext(AuthContext);



  const handleLogout = () => logout();

  const navItems = useMemo(
    () =>
      user
        ? [
          { to: "/", label: "Home" },
          { to: "/partners", label: "Find Partners" },
          { to: "/create-partner", label: "Create Partner Profile" },
          { to: "/connections", label: "My Connections" },
        ]
        : [
          { to: "/", label: "Home" },
          { to: "/partners", label: "Find Partners" },
          { to: "/about", label: "About" },
        ],
    [user]
  );

  return (
    <header className="sticky top-0 z-50">
      <div className="border navbar bg-base-100/90 backdrop-blur shadow-sm border-b border-base-300 px-4 md:px-30">
        {/* Left: Brand */}
        <div className="flex-1">
          <NavLink to="/" className="btn btn-ghost px-0">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl grid place-items-center text-primary-content bg-gradient-to-br from-primary to-secondary shadow-sm ring-1 ring-base-300">
                <FaBookOpen className="w-5 h-5" />
              </div>

              <div className="flex flex-col leading-none">
                <span className="text-lg md:text-xl font-extrabold tracking-tight">
                  Study<span className="text-secondary">Sync</span>
                </span>
                <span className="text-[11px] md:text-xs text-base-content/60">
                  Find • Match • Study
                </span>
              </div>
            </div>
          </NavLink>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-3">
          <ul className="menu menu-horizontal gap-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className={linkClasses}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* 🔹 Auth Buttons when logged out */}
          {!user && (
            <div className="flex items-center gap-2 ml-4">
              <NavLink to="/login" className="btn btn-outline btn-sm">
                Login
              </NavLink>
              <NavLink to="/register" className="btn btn-primary btn-sm text-primary-content">
                Register
              </NavLink>
            </div>
          )}

          {/* Avatar dropdown when logged in */}
          {user && (
            <div className="dropdown dropdown-end">
              <button tabIndex={0} className="btn btn-ghost btn-circle avatar mr-2">
                <div className="w-10 rounded-full ring ring-primary/30 ring-offset-2 ring-offset-base-100 overflow-hidden">
                  <img
                    alt="User avatar"
                    referrerPolicy="no-referrer"
                    src={user?.photoURL}
                  />
                </div>
              </button>

              <ul
                tabIndex={0}
                role="menu"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-60 mt-3 w-56 p-2 shadow-xl border border-base-300/60"
              >
                <li>
                  <NavLink
                    to="/profile"
                    className="rounded-md px-2 text-sm py-2 hover:bg-base-300/60 transition font-bold"
                  >
                    Profile
                  </NavLink>
                </li>

                <div className="divider my-2" />

                <li>
                  <button
                    onClick={handleLogout}
                    className="rounded-md px-2 py-2 text-error font-bold hover:bg-error/10 hover:text-error transition flex items-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                      />
                    </svg>
                    Log Out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Right: Theme Toggle + Mobile Menu */}
        <div className="flex-none items-center gap-1">
          {/* Theme Toggle */}
          <button
            aria-label="Toggle theme"
            className="btn btn-ghost btn-circle"
            onClick={() => {
              setDarkMode(prev => !prev)
            }}
            title={darkMode ? "Light mode" : "Dark mode"}
          >
            {!darkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="12" cy="12" r="4" strokeWidth="2" />
                <path
                  strokeLinecap="round"
                  strokeWidth="2"
                  d="M12 2v2M12 20v2M2 12h2M20 12h2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
                />
              </svg>
            )}
          </button>
          {/* Mobile menu (visible on < md) */}
          <div className="md:hidden dropdown dropdown-end">
            <button
              tabIndex={0}
              aria-label="Open menu"
              className="btn btn-ghost btn-square"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 6h16M4 12h16M4 18h16"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-60 mt-3 w-64 p-2 shadow-xl border border-base-300/60"
            >
              {/* Core nav items */}
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} className={linkClasses}>
                    {item.label}
                  </NavLink>
                </li>
              ))}

              {/* When logged OUT: show Login/Register buttons */}
              {!user && (
                <li className="mt-2">
                  <div className="flex gap-2">
                    <NavLink to="/login" className="btn btn-outline btn-sm flex-1">
                      Login
                    </NavLink>
                    <NavLink to="/register" className="btn btn-primary btn-sm text-primary-content flex-1">
                      Register
                    </NavLink>
                  </div>
                </li>
              )}

              {/* When logged IN: Profile + Logout */}
              {user && (
                <>
                  <div className="divider my-2" />
                  <li>
                    <NavLink to="/profile" className="font-semibold">
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="px-3 py-2 rounded-lg text-left text-error hover:bg-error/10 font-semibold"
                    >
                      Log Out
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>

        </div>
      </div>
    </header>
  );
};

export default NavBar;
