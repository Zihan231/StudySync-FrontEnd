import React from 'react';
import { NavLink } from "react-router";
import {
    FaStar,
    FaRegStar,
    FaMapMarkerAlt,
    FaWifi,
    FaUserFriends,
} from "react-icons/fa";

const PartnerCard = ({ p }) => {
     // --- Helpers ---
    const levelBadge = (lvl) =>
    ({
        Beginner: "badge-info",
        Intermediate: "badge-warning",
        Expert: "badge-success",
    }[lvl] || "badge-ghost");
    // Simple badge renderer for study mode
    const renderStudyMode = (mode) => {
        const isOnline = mode === "Online";
        return (
            <span
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${isOnline
                    ? "bg-success/20 text-success"
                    : "bg-error/20 text-error"
                    }`}
            >
                {isOnline ? <FaWifi /> : <FaUserFriends />}
                {isOnline ? "Online" : "Offline"}
            </span>
        );
    };
    const safeImage = (url) => {
        if (!url || url.includes("create-partner"))
            return "https://i.ibb.co/7y4m2bq/avatar-placeholder.png";
        return url.startsWith("http") ? url : `https://${url}`;
    };
    return (
        <article
            key={p._id}
            className="card bg-base-200/50 border border-base-300 hover:shadow-lg hover:-translate-y-[3px] transition-all"
        >
            <div className="card-body">
                {/* Avatar + Name */}
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="w-16 rounded-full ring ring-primary/30 ring-offset-2 ring-offset-base-100">
                            <img src={safeImage(p.profileimage)} alt={p.name} />
                        </div>
                    </div>
                    <div className="min-w-0">
                        <h3 className="font-semibold text-base truncate">
                            {p.name}
                        </h3>
                        <p className="text-sm text-base-content/70 truncate">
                            {p.subject}
                        </p>
                    </div>
                </div>

                {/* Study Mode + Experience */}
                <div className="mt-3 flex items-center justify-between">
                    {renderStudyMode(p.studyMode)}
                    <span className={`badge ${levelBadge(p.experienceLevel)}`}>
                        {p.experienceLevel}
                    </span>
                </div>

                {/* Availability + Location */}
                <div className="mt-3 space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                        <span className="text-base-content/60">Time:</span>
                        <span className="font-medium">{p.availabilityTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="opacity-60" />
                        <span className="truncate">{p.location}</span>
                    </div>
                </div>

                {/* Rating + Connections */}
                <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-warning">
                        {Array.from({ length: 5 }).map((_, i) =>
                            i < Math.round(p.rating) ? (
                                <FaStar key={i} className="w-4 h-4" />
                            ) : (
                                <FaRegStar key={i} className="w-4 h-4 opacity-50" />
                            )
                        )}
                    </div>
                    <div className="text-xs text-base-content/70">
                        {p.partnerCount} connections
                    </div>
                </div>
                {/* Email */}
                <div className="mt-3 text-xs text-base-content/70 truncate">
                    📧 {p.email}
                </div>

                {/* Actions */}
                <div className="card-actions mt-4">
                    <NavLink
                        to={`/partners/${p._id}`}
                        className="btn btn-primary btn-sm w-full"
                    >
                        View Profile
                    </NavLink>
                </div>
            </div>
        </article>
    );
};

export default PartnerCard;