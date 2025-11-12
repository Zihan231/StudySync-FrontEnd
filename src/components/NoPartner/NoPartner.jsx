// src/components/Partners/NoPartner.jsx
import React from "react";
import { NavLink } from "react-router";

const NoPartner = ({
  title = "No partners found",
  subtitle = "Try adjusting your search or filters to see more results.",
  ctaTo = "/create-partner",
}) => {
  return (
    <section className="flex flex-col items-center justify-center text-center min-h-[60vh] px-4">
      {/* Icon bubble */}
      <div className="mb-6 flex items-center justify-center">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center shadow-sm">
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-primary opacity-80"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
        </div>
      </div>

      {/* Texts */}
      <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
        {title}
      </h2>
      <p className="mt-2 text-base text-base-content/70 max-w-md">
        {subtitle}
      </p>

      {/* Actions */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <NavLink to="/partners" className="btn btn-outline btn-sm">
          Back to List
        </NavLink>
        <NavLink to={ctaTo} className="btn btn-primary btn-sm">
          Create Partner Profile
        </NavLink>
      </div>
    </section>
  );
};

export default NoPartner;
