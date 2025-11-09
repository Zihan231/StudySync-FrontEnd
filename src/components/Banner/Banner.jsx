// src/components/Home/BannerSwiper.jsx
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import useAxios from '../../hooks/axios/useAxios';

// 🔹 Swiper (React)
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";

// 🔹 Swiper styles (required)
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { HashLoader } from "react-spinners";

const Banner = () => {
    const axiosInstance = useAxios();
    const [slides, setSlides] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        axiosInstance.get('/partners/recent').then(Data => {
            setSlides(Data.data);
            console.log(Data.data);
            setLoading(false);
        })
    }, [axiosInstance]);

    console.log(slides);
    return (
        <>
            {
                loading ? (
                    <div>Loader</div>
                ) :
                    (
                        <section className="relative bg-base-100">
                            <div className="max-w-7xl mx-auto px-4 pt-6 pb-10">
                                <Swiper
                                    // 🔧 Modules
                                    modules={[Navigation, Pagination, A11y, Autoplay]}
                                    // 🔧 Behavior
                                    spaceBetween={16}
                                    slidesPerView={1}
                                    loop={true}
                                    // Autoplay (you can disable or tune)
                                    autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                                    // UI
                                    navigation
                                    pagination={{ clickable: true }}
                                    // Responsive height via tailwind wrappers per slide
                                    className="rounded-2xl border border-base-300 shadow-sm overflow-hidden"
                                >
                                    {slides?.map((s) => (
                                        <SwiperSlide key={s.id}>
                                            <div className="relative w-full h-[340px] md:h-[460px] rounded-2xl overflow-hidden">
                                                {/* Background image */}
                                                <img
                                                    src={s.profileimage}
                                                    alt={s.name}
                                                    className="absolute inset-0 w-full h-full object-cover"
                                                    loading="lazy"
                                                />

                                                {/* Gradient overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-base-100/90 via-base-100/40 to-transparent" />

                                                {/* Content */}
                                                <div className="absolute inset-0 p-5 md:p-10 flex items-end">
                                                    <div className="max-w-xl bg-base-100/90 backdrop-blur-sm border border-base-300 shadow-lg p-5 rounded-2xl">
                                                        <h2 className="text-2xl md:text-4xl font-extrabold flex flex-wrap items-center gap-2">
                                                            {s.name}
                                                            {s.experienceLevel && (
                                                                <span className="badge badge-primary badge-outline text-xs md:text-sm">
                                                                    {s.experienceLevel}
                                                                </span>
                                                            )}
                                                        </h2>

                                                        <p className="mt-1 text-sm md:text-base text-base-content/80">
                                                            {s.subject} • {s.studyMode} • {s.location}
                                                        </p>

                                                        {/* Rating + Partner count */}
                                                        <div className="mt-2 flex items-center gap-3">
                                                            <div className="rating rating-sm">
                                                                {[0, 1, 2, 3, 4].map((i) => (
                                                                    <input
                                                                        key={i}
                                                                        type="radio"
                                                                        className={`mask mask-star-2 ${i < Math.round(s.rating) ? "bg-warning" : "bg-base-300/50"
                                                                            }`}
                                                                        readOnly
                                                                    />
                                                                ))}
                                                            </div>
                                                            <span className="text-xs opacity-70">
                                                                {s.rating?.toFixed(1)}/5 • Partners: {s.patnerCount ?? 0}
                                                            </span>
                                                        </div>

                                                        {/* Availability chips */}
                                                        <div className="mt-3 flex flex-wrap gap-2">
                                                            <div className="badge badge-outline">
                                                                {s.availableFrom} – {s.availableTo}
                                                            </div>
                                                            <div className="badge badge-outline">{s.studyMode}</div>
                                                            <div className="badge badge-outline">{s.location}</div>
                                                        </div>

                                                        {/* Buttons */}
                                                        <div className="mt-4 flex flex-wrap gap-2">
                                                            <NavLink to={`/partners/${s._id}`} className="btn btn-primary btn-sm md:btn-md">
                                                                View Profile
                                                            </NavLink>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </section>
                    )
            }

        </>
    );
};

export default Banner;
