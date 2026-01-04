// src/pages/Dashboard/Dashboard.jsx
import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router";
import { FaBookOpen, FaPlus, FaUsers, FaSignOutAlt } from "react-icons/fa";
import AuthContext from "../../contexts/Auth/AuthContext/AuthContext";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

    const handleLogout = () => logout();

  const avatarSrc =
    user?.photoURL || "https://i.ibb.co/7y4m2bq/avatar-placeholder.png";

  const menuLinkClass = ({ isActive }) =>
    [
      "font-semibold", // default
      "gap-2", // icon spacing
      "rounded-xl", // nicer pill
      isActive
        ? "active bg-base-200 text-primary" // ✅ visible active state
        : "hover:bg-base-200/60", // hover
    ].join(" ");

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-base-100">
      <div className="max-w-7xl mx-auto px-4 md:px-0 py-6">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* LEFT SIDEBAR */}
          <aside className="lg:col-span-4 xl:col-span-3">
            <div className="card border border-base-300 bg-base-100 min-h-[calc(100vh-4rem-3rem)]">
              <div className="card-body p-4 h-full flex flex-col">
                {/* Brand */}
                <NavLink to="/" className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl grid place-items-center text-primary-content bg-gradient-to-br from-primary to-secondary ring-1 ring-base-300 shadow-sm">
                    <FaBookOpen className="w-5 h-5" />
                  </div>
                  <div className="leading-tight">
                    <div className="font-extrabold text-lg">
                      Study<span className="text-secondary">Sync</span>
                    </div>
                    <div className="text-xs text-base-content/60">Dashboard</div>
                  </div>
                </NavLink>

                <div className="divider my-4 opacity-60" />

                {/* Menu (takes space) */}
                <div className="flex-1">
                  <ul className="menu bg-base-100 rounded-box p-0">
                    <li>
                      <NavLink
                        to="/dashboard/createPartner"
                        className={menuLinkClass}
                        end
                      >
                        <FaPlus className="w-4 h-4" />
                        Create Profile
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/dashboard/connections"
                        className={menuLinkClass}
                        end
                      >
                        <FaUsers className="w-4 h-4" />
                        My Connections
                      </NavLink>
                    </li>
                  </ul>
                </div>

                {/* Bottom user + logout (bottom-left) */}
                <div className="mt-auto pt-4 border-t border-base-300">
                  <div className="flex items-center gap-3 justify-start">
                    <div className="avatar">
                      <div className="w-11 h-11 rounded-full ring ring-primary/20 ring-offset-2 ring-offset-base-100 overflow-hidden">
                        <img
                          src={avatarSrc}
                          alt="User avatar"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <div className="min-w-0 text-left">
                      <div className="font-extrabold truncate">
                        {user?.displayName || "Unknown User"}
                      </div>
                      <div className="text-xs text-base-content/60">user</div>
                    </div>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="btn btn-outline btn-error w-full mt-3 justify-start"
                    type="button"
                  >
                    <FaSignOutAlt className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT CONTENT */}
          <section className="lg:col-span-8 xl:col-span-9">
            <div className="card border border-base-300 bg-base-100 min-h-[calc(100vh-4rem-3rem)]">
              <div className="card-body p-6">
                <Outlet />
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
