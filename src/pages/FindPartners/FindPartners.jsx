import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import {
    FaStar,
    FaRegStar,
    FaMapMarkerAlt,
    FaWifi,
    FaUserFriends,
} from "react-icons/fa";
import useAxios from "../../hooks/axios/useAxios";
import { HashLoader } from "react-spinners";
import Swal from "sweetalert2";
import NotFound from "../NotFound/NotFound";
import NoPartner from "../../components/NoPartner/NoPartner";

const FindPartners = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const axios = useAxios();
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await axios.get("/all-partners");
            const partners = await res.data;
            setData(partners)
            setLoading(false);
        }
        fetchData();
    }, [axios]);

    // --- UI state ---
    const [term, setTerm] = useState("");
    const [sort, setSort] = useState("");

    const onSortChange = (v) => console.log("Sort by:", v);

    // --- Helpers ---
    const levelBadge = (lvl) =>
    ({
        Beginner: "badge-info",
        Intermediate: "badge-warning",
        Expert: "badge-success",
    }[lvl] || "badge-ghost");

    const safeImage = (url) => {
        if (!url || url.includes("create-partner"))
            return "https://i.ibb.co/7y4m2bq/avatar-placeholder.png";
        return url.startsWith("http") ? url : `https://${url}`;
    };

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
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[600px]">
                <HashLoader color="#73abff" size={80} />
            </div>
        );
    }
    else if (data.length == 0) {
        return <NoPartner></NoPartner>;
    }
    else {
        return (
            <main className="min-h-[calc(100vh-4rem)] bg-base-100 px-4 py-10">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-extrabold">Find Partners</h1>
                            <p className="text-sm text-base-content/70">
                                Browse study partners and explore their profiles.
                            </p>
                        </div>

                        {/* Controls */}
                        <div className="w-full sm:w-auto flex items-center gap-2">
                            {/* Sort */}
                            <select
                                className="select select-bordered select-sm"
                                value={sort}
                                onChange={(e) => {
                                    setSort(e.target.value);
                                    onSortChange(e.target.value);
                                }}
                            >
                                <option value="">Sort</option>
                                <option value="newest">Newest</option>
                                <option value="rating_desc">Rating: High → Low</option>
                                <option value="rating_asc">Rating: Low → High</option>
                                <option value="exp_desc">Experience: Expert → Beginner</option>
                                <option value="exp_asc">Experience: Beginner → Expert</option>
                            </select>

                            {/* Search (properly aligned) */}
                            <form
                                onSubmit={async (e) => {
                                    e.preventDefault();
                                    try {
                                        setLoading(true);
                                        const res = await axios.get(`/partners?search=${term.trim()}`);
                                        const searchedData = await res.data;
                                        setData(searchedData);
                                    } catch (error) {
                                        await Swal.fire({
                                            icon: "error",
                                            title: "Oops...",
                                            text: `Something went wrong while Searching: ${error}`,
                                        });
                                    } finally {
                                        setLoading(false);
                                    }

                                    // onSearch(term.trim());
                                }}
                                className="input-group input-group-sm"
                            >
                                <div className="flex items-center gap-1">
                                    <input
                                        type="text"
                                        className="input input-bordered w-48 sm:w-56"
                                        placeholder="Search by subject"
                                        value={term}
                                        onChange={(e) => setTerm(e.target.value)}
                                    />
                                    <button type="submit" className="btn btn-primary btn-sm py-4">
                                        Search
                                    </button>
                                </div>
                            </form>
                        </div>


                    </div>

                    {/* Partner Cards */}
                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.map((p) => (
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
                        ))}
                    </section>
                </div>
            </main>
        );
    }
};

export default FindPartners;
