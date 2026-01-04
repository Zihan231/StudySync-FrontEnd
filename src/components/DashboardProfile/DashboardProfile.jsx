// src/pages/Dashboard/DashboardProfile.jsx
import React, { useContext } from "react";
import { NavLink } from "react-router";
import AuthContext from "../../contexts/Auth/AuthContext/AuthContext";
import { FaUserCircle, FaEnvelope, FaIdBadge, FaClock } from "react-icons/fa";

const InfoBox = ({ label, icon, children }) => (
  <div className="rounded-2xl border border-base-300 bg-base-100/60 p-4">
    <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-base-content/60 font-semibold">
      <span className="opacity-80">{icon}</span>
      <span>{label}</span>
    </div>
    <div className="mt-2 font-semibold text-base-content break-words">{children}</div>
  </div>
);

const DashboardProfile = () => {
  const { user } = useContext(AuthContext);

  const name = user?.displayName || "Unknown User";
  const email = user?.email || "No email";
  const photo = user?.photoURL;
  const uid = user?.uid || "—";
  const createdAt = user?.metadata?.creationTime || "—";
  const lastLogin = user?.metadata?.lastSignInTime || "—";

  const initials =
    name
      ?.split(" ")
      ?.slice(0, 2)
      ?.map((w) => w[0])
      ?.join("")
      ?.toUpperCase() || "U";

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="badge badge-accent badge-outline">Profile</span>
          <span className="text-xs opacity-70">Your StudySync identity</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold">My Profile</h1>
        <p className="mt-1 text-sm md:text-base text-base-content/70">
          View your basic account details here.
        </p>
      </div>

      {/* Main Card */}
      <div className="card bg-base-200/50 border border-base-300 shadow-sm">
        <div className="card-body p-5 md:p-6">
          {/* Top: Avatar + Basic */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="avatar placeholder">
              <div className="w-20 h-20 rounded-full ring ring-primary/30 ring-offset-2 ring-offset-base-100 overflow-hidden bg-base-200 border border-base-300 grid place-items-center">
                {photo ? (
                  <img
                    src={photo}
                    alt={`${name} avatar`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="font-extrabold text-lg">{initials}</span>
                )}
              </div>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <FaUserCircle className="w-5 h-5 opacity-70" />
                <h2 className="text-xl md:text-2xl font-extrabold truncate">{name}</h2>
              </div>
              <div className="mt-1 flex items-center gap-2 text-sm text-base-content/70 break-all">
                <FaEnvelope className="w-4 h-4 opacity-70" />
                <span>{email}</span>
              </div>
            </div>
          </div>

          <div className="divider my-5 opacity-60" />

          {/* Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoBox label="User ID" icon={<FaIdBadge className="w-4 h-4" />}>
              {uid}
            </InfoBox>

            <InfoBox label="Account created" icon={<FaClock className="w-4 h-4" />}>
              {createdAt}
            </InfoBox>

            <div className="md:col-span-2">
              <InfoBox label="Last login" icon={<FaClock className="w-4 h-4" />}>
                {lastLogin}
              </InfoBox>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-wrap gap-2 justify-end">
            <NavLink to="/" className="btn btn-ghost">
              Home
            </NavLink>
            <NavLink to="/dashboard/createPartner" className="btn btn-primary">
              Create Profile
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardProfile;
