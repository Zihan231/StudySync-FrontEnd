import React, { use, useContext, useEffect, useMemo } from "react";
import { NavLink } from "react-router";
import ThemeContext from "../../contexts/Theme/themeContext";
import AuthContext from "../../contexts/Auth/AuthContext/AuthContext";

/** Active link styles */
const linkClasses = ({ isActive }) =>
  [
    "px-3 py-2 rounded-lg text-sm font-medium transition",
    "hover:bg-base-200 hover:text-base-content",
    isActive ? "bg-base-200 text-base-content" : "text-base-content/70",
  ].join(" ");

const NavBar = () => {
  // theme from your context
  const { darkMode, setDarkMode } = use(ThemeContext);

  // TEMP ONLY: preview logged-in vs logged-out
  const { user, logout } = useContext(AuthContext);
  console.log(user?.photoURL);
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "studymate-dark" : "studymate"
    );
  }, [darkMode]);

  // Build nav items (Login/Register appear only here when logged out)
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
          { to: "/login", label: "Login" },
          { to: "/register", label: "Register" },
        ],
    [user]
  );

  // Log out
  const handleLogout = () => {
    logout();
  }
  return (
    <header className="sticky top-0 z-50">
      <div className="navbar bg-base-100/90 backdrop-blur shadow-sm border-b border-base-300">
        {/* Left: Brand */}
        <div className="flex-1">
          <NavLink to="/" className="btn btn-ghost px-2">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl grid place-items-center font-bold text-primary-content bg-linear-to-br from-primary to-secondary shadow">
                SM
              </div>
              <span className="text-lg md:text-xl font-extrabold tracking-tight">StudyMate</span>
            </div>
          </NavLink>
        </div>

        {/* Desktop links (the ONLY place Login/Register show when logged out) */}
        <div className="hidden md:flex items-center">
          <ul className="menu menu-horizontal gap-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className={linkClasses}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          {/* Avatar dropdown only when logged in */}
          {user && (
            <div className="dropdown dropdown-end mr-2">
              {/* trigger */}
              <button
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar"
                aria-haspopup="menu"
                aria-expanded="false"
              >
                <div className="w-10 rounded-full ring ring-primary/30 ring-offset-2 ring-offset-base-100">
                  <img
                    alt="User avatar"
                    referrerPolicy="no-referrer"
                    src={user?.photoURL}
                  />
                </div>
              </button>

              {/* menu */}
              <ul
                tabIndex={0}
                role="menu"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[60] mt-3 w-56 p-2 
                 shadow-xl border border-base-300/60"
              >
                {/* Profile */}
                <li role="none">
                  <NavLink
                    role="menuitem"
                    to="/profile"
                    className="rounded-md px-2 text-sm py-2 hover:bg-base-300/60 transition font-bold"
                  >
                    Profile
                  </NavLink>
                </li>

                <div className="divider my-2" />

                {/* Log out (menu style, not big button) */}
                <li role="none">
                  <button
                    role="menuitem"
                    onClick={handleLogout}
                    className="rounded-md px-2 py-2 text-error font-bold hover:bg-error/10 hover:text-error 
                     transition flex items-center gap-2"
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


        {/* Right: Theme toggle + Avatar (avatar only when logged in) */}
        <div className="flex-none items-center gap-1">
          {/* Theme toggle */}
          <button
            aria-label="Toggle theme"
            className="btn btn-ghost btn-circle"
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? "Light mode" : "Dark mode"}
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
                viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
                viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="4" strokeWidth="2" />
                <path strokeLinecap="round" strokeWidth="2"
                  d="M12 2v2M12 20v2M2 12h2M20 12h2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
              </svg>
            )}
          </button>




          {/* Mobile menu (shows same list; desktop links are hidden on md-) */}
          <div className="md:hidden dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-square">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 6h16M4 12h16M4 18h16"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-64 p-2 shadow"
            >
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} className={linkClasses}>
                    {item.label}
                  </NavLink>
                </li>
              ))}

              {/* Extra mobile-only actions when logged in */}
              {user && (
                <>
                  <div className="divider my-2" />
                  <li className="font-bold"><NavLink to="/profile">Profile</NavLink></li>
                  <li>
                    <button className="px-3 py-2 rounded-lg text-left text-error hover:bg-error/10 font-bold">
                      Logout
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
