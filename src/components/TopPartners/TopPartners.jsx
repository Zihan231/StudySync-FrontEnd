// src/components/Partners/TopPartners.jsx
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { FaStar, FaRegStar } from "react-icons/fa";
import useAxios from "../../hooks/axios/useAxios";
import NoPartner from "../NoPartner/NoPartner";
import { HashLoader } from "react-spinners";

const TopPartners = () => {
    const axiosInstance = useAxios();
    const [partners, setPartners] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    // const partners = [
    //     {
    //         _id: "1",
    //         name: "Sadia Rahman",
    //         profileimage:
    //             "https://c4.wallpaperflare.com/wallpaper/743/818/554/girl-image-1920x1200-wallpaper-preview.jpg",
    //         subject: "English",
    //         email: "sadia.rahman@studymate.com",
    //         rating: 4,
    //     },
    //     {
    //         _id: "2",
    //         name: "Zihan Last",
    //         profileimage: "https://randomuser.me/api/portraits/men/12.jpg",
    //         subject: "Mathematics",
    //         email: "zihan.last@studymate.com",
    //         rating: 5,
    //     },
    //     {
    //         _id: "3",
    //         name: "Ayesha Karim",
    //         profileimage: "https://randomuser.me/api/portraits/women/21.jpg",
    //         subject: "Literature",
    //         email: "ayesha.karim@studymate.com",
    //         rating: 4.5,
    //     },
    //     {
    //         _id: "4",
    //         name: "Tanvir Rahman",
    //         profileimage: "https://randomuser.me/api/portraits/men/32.jpg",
    //         subject: "Physics",
    //         email: "tanvir.rahman@studymate.com",
    //         rating: 4.2,
    //     },
    //     {
    //         _id: "5",
    //         name: "Mehnaz Islam",
    //         profileimage: "https://randomuser.me/api/portraits/women/44.jpg",
    //         subject: "Chemistry",
    //         email: "mehnaz.islam@studymate.com",
    //         rating: 4.8,
    //     },
    //     {
    //         _id: "6",
    //         name: "Arif Chowdhury",
    //         profileimage: "https://randomuser.me/api/portraits/men/45.jpg",
    //         subject: "Programming",
    //         email: "arif.chowdhury@studymate.com",
    //         rating: 5,
    //     },
    // ];
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await axiosInstance.get("/topPartners");
                const result = await res.data;
                setPartners(result);
            } catch (error) {
                setError(true);
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [axiosInstance])
    const StarRating = ({ value = 0 }) => (
        <div className="flex items-center justify-center gap-1 text-warning">
            {Array.from({ length: 5 }).map((_, i) =>
                i < Math.round(value) ? (
                    <FaStar key={i} className="w-4 h-4" />
                ) : (
                    <FaRegStar key={i} className="w-4 h-4 opacity-50" />
                )
            )}
        </div>
    );

    const safeImg = (url) =>
        !url || url.includes("create-partner")
            ? "https://i.ibb.co/7y4m2bq/avatar-placeholder.png"
            : url;
    {
        if (loading) {
            return <div className="flex items-center justify-center min-h-[600px]">
                <HashLoader color="#73abff" size={80} />
            </div> 
        }
        if (error) {
            return <NoPartner></NoPartner>
        } else {
            return (
                <section className="bg-base-100 py-12 px-4">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-10">
                            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                                🌟 Top Study Partners
                            </h2>
                            <p className="mt-2 text-base-content/70">
                                Connect with active learners across different subjects.
                            </p>
                        </div>

                        {/* Cards Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {partners.map((p) => (
                                <article
                                    key={p._id}
                                    className="group relative rounded-2xl border border-base-300 bg-base-200/60 backdrop-blur-sm
                 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg overflow-hidden"
                                >
                                    <div className="p-6 sm:p-5 md:p-6 flex flex-col sm:flex-row gap-5 items-center sm:items-stretch">
                                        {/* Avatar (left) */}
                                        <div className="relative shrink-0">
                                            <div className="absolute -inset-2 bg-linear-to-tr from-primary/30 via-secondary/20 to-accent/10 rounded-full blur-md opacity-70 transition duration-500 group-hover:opacity-90" />
                                            <div className="avatar relative">
                                                <div className="w-24 sm:w-28 rounded-full ring ring-primary/30 ring-offset-2 ring-offset-base-100 overflow-hidden">
                                                    <img
                                                        src={safeImg(p.profileimage)}
                                                        alt={p.name}
                                                        className="object-cover w-full h-full"
                                                        loading="lazy"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content (right) */}
                                        <div className="flex flex-col w-full">
                                            {/* Name + Subject badge */}
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                                <h3 className="text-lg font-bold text-base-content">{p.name}</h3>
                                                <span className="badge badge-primary/80">{p.subject}</span>
                                            </div>

                                            {/* Email (inline, subtle pill) */}
                                            <div className="mt-2">
                                                <span className="inline-flex items-center max-w-full px-2 py-1 rounded-md bg-base-300/40 border border-base-300">
                                                    <span className="text-xs text-base-content/70 break-all">{p.email}</span>
                                                </span>
                                            </div>

                                            {/* Rating (inline) */}
                                            <div className="mt-3 flex items-center gap-2">
                                                <StarRating value={p.rating} />
                                                <span className="text-xs text-base-content/60">
                                                    {Number.isFinite(p.rating) ? p.rating.toFixed(1) : "—"} / 5
                                                </span>
                                            </div>

                                            {/* CTA (right-aligned on desktop, full on mobile) */}
                                            <div className="mt-5 flex">
                                                <NavLink
                                                    to={`/partners/${p._id}`}
                                                    className="btn btn-primary btn-sm w-full sm:w-auto transition-transform duration-200 group-hover:scale-[1.02]"
                                                >
                                                    View Profile
                                                </NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>


                        {/* Footer link */}
                        <div className="text-center mt-10">
                            <NavLink
                                to="/partners"
                                className="btn btn-outline btn-sm hover:btn-primary transition-all"
                            >
                                See All Partners
                            </NavLink>
                        </div>
                    </div>
                </section>
            );
        }
    }

};

export default TopPartners;
