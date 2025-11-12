import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router";
import {
    FaStar,
    FaRegStar,
    FaMapMarkerAlt,
    FaClock,
    FaBook,
    FaWifi,
    FaUserFriends,
} from "react-icons/fa";
import { HashLoader } from "react-spinners";
import useAxios from "../../hooks/axios/useAxios";
import NoPartner from "../../components/NoPartner/NoPartner";


const PartnerDetails = () => {
    const [err, setErr] = useState("");
    const axiosInstance = useAxios();
    const { id } = useParams();
    // console.log(id);

    // UI state
    const [partner, setPartner] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await axiosInstance.get(`/partner/${id}`);
                const result = await res.data;
                setPartner(result);
            } catch (error) {
                // This will trigger on any non-2xx response or network error
                console.error(error);
                setErr("No Partner Found !!!");
            } finally {
                setLoading(false);
            }
        };
        fetchData();

    }, [axiosInstance, id])

    const onSendRequest = () => {

    }
    // Helpers
    const safeImage = (url) =>
        !url || url.includes("create-partner")
            ? "https://i.ibb.co/7y4m2bq/avatar-placeholder.png"
            : url.startsWith("http")
                ? url
                : `https://${url}`;

    const levelBadge = (lvl) =>
    ({
        Beginner: "badge-info",
        Intermediate: "badge-warning",
        Expert: "badge-success",
    }[lvl] || "badge-ghost");

    const StudyModePill = ({ mode }) => {
        const isOnline = mode === "Online";
        return (
            <span
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold tracking-tight ${isOnline ? "bg-success/15 text-success" : "bg-error/15 text-error"
                    }`}
                title="Preferred study format"
            >
                {isOnline ? <FaWifi /> : <FaUserFriends />}
                {isOnline ? "Online" : "Offline"}
            </span>
        );
    };

    const Stars = ({ value = 0 }) => (
        <div className="flex items-center gap-1 text-warning">
            {Array.from({ length: 5 }).map((_, i) =>
                i < Math.round(value) ? (
                    <FaStar key={i} className="w-4 h-4" />
                ) : (
                    <FaRegStar key={i} className="w-4 h-4 opacity-50" />
                )
            )}
        </div>
    );

    // Loading
    if (loading) {
        return (
            <main className="flex items-center justify-center min-h-[500px]">
                <HashLoader color="#73abff" size={80} />
            </main>
        );
    }

    // Error
    if (err) {
        return (
            <main className="min-h-[calc(100vh-4rem)] bg-base-100 px-4 py-10">
                <div className="max-w-3xl mx-auto">
                    <NoPartner></NoPartner>
                </div>
            </main>
        );
    }

    if (!partner) return null;

    return (
        <main className="min-h-[calc(100vh-4rem)] bg-base-100 px-4 py-10">
            <div className="max-w-6xl mx-auto">
                {/* Hero header */}
                <div className="relative overflow-hidden rounded-2xl border border-base-300 bg-linear-to-br from-primary/10 via-base-100 to-secondary/10 p-6 md:p-8 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                        {/* Avatar */}
                        <div className="avatar">
                            <div className="w-28 md:w-32 rounded-full ring ring-primary/30 ring-offset-2 ring-offset-base-100">
                                <img
                                    src={safeImage(partner.profileimage || partner.profileImage)}
                                    alt={partner.name}
                                />
                            </div>
                        </div>

                        {/* Hero content */}
                        <div className="flex-1 min-w-0">
                            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                                {partner.name}
                            </h1>

                            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                                <span className="inline-flex items-center gap-2 text-base-content/80">
                                    <FaBook className="opacity-70" />
                                    <strong className="font-semibold">{partner.subject}</strong>
                                </span>
                                <span className="opacity-40">•</span>
                                <StudyModePill mode={partner.studyMode} />
                                <span className="opacity-40">•</span>
                                <span className={`badge ${levelBadge(partner.experienceLevel)}`}>
                                    {partner.experienceLevel}
                                </span>
                            </div>

                            <div className="mt-3 flex flex-wrap items-center gap-3">
                                <Stars value={partner.rating} />
                                <span className="text-xs text-base-content/60">
                                    {Number.isFinite(partner.rating)
                                        ? `${partner.rating.toFixed(1)} / 5`
                                        : "—"}
                                </span>
                                <span className="opacity-40">•</span>
                                <span className="text-xs text-base-content/70">
                                    {partner.partnerCount} connections
                                </span>
                            </div>
                        </div>

                        {/* Primary action */}
                        <div className="shrink-0">
                            <button
                                className="btn btn-primary"
                                onClick={() => onSendRequest?.(partner)}
                            >
                                Send Partner Request
                            </button>
                        </div>
                    </div>
                </div>

                {/* Details grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Left column: quick facts */}
                    <div className="space-y-4">
                        <div className="stat bg-base-200/50 border border-base-300 rounded-2xl p-4">
                            <div className="text-xs text-base-content/60 mb-1">Availability</div>
                            <div className="flex items-center gap-2">
                                <FaClock className="opacity-70" />
                                <span className="font-medium">{partner.availabilityTime}</span>
                            </div>
                        </div>

                        <div className="stat bg-base-200/50 border border-base-300 rounded-2xl p-4">
                            <div className="text-xs text-base-content/60 mb-1">Location</div>
                            <div className="flex items-center gap-2">
                                <FaMapMarkerAlt className="opacity-70" />
                                <span className="font-medium truncate">{partner.location}</span>
                            </div>
                        </div>

                        <div className="stat bg-base-200/50 border border-base-300 rounded-2xl p-4">
                            <div className="text-xs text-base-content/60 mb-1">Email</div>
                            <div className="font-medium break-all">{partner.email}</div>
                        </div>
                    </div>

                    {/* Right columns: about & actions */}
                    <div className="md:col-span-2">
                        <div className="card bg-base-200/50 border border-base-300 rounded-2xl">
                            <div className="card-body">
                                <h2 className="card-title">About</h2>
                                <p className="mt-1 text-sm leading-relaxed text-base-content/80">
                                    {partner.bio || "No bio provided yet."}
                                </p>
                                <div className="mt-6 flex flex-wrap gap-2">
                                    <NavLink to="/partners" className="btn btn-primary">
                                        Back to List
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default PartnerDetails;
