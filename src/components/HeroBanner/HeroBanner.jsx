// src/components/Home/HeroBanner.jsx
import React from "react";
import { NavLink } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
    {
        _id: "1",
        title: "Find Your Perfect Study Partner",
        subtitle:
            "Connect with students who share your subjects, skills, and schedule preferences.",
        cta: { label: "Create Profile", to: "/create-partner" },
        image:
            "https://images.pexels.com/photos/7972345/pexels-photo-7972345.jpeg",
    },
    {
        _id: "2",
        title: "Collaborate and Learn Together",
        subtitle:
            "Boost your learning efficiency by studying with peers online or offline.",
        cta: { label: "Browse Partners", to: "/partners" },
        image:
            "https://cdn.givingcompass.org/wp-content/uploads/2019/10/07124849/5-Ways-to-Build-Collaborative-Learning-Skills.jpg",
    },
    {
        _id: "3",
        title: "Track Your Progress",
        subtitle:
            "Rate your study partners, track connections, and improve continuously.",
        cta: { label: "View Connections", to: "/connections" },
        image:
            "https://img.freepik.com/free-vector/back-school-background-hand-drawn-style_23-2148613802.jpg?semt=ais_hybrid&w=740&q=80",
    },
];

const HeroBanner = () => {
    return (
        <section className="relative bg-base-100">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay, A11y]}
                    slidesPerView={1}
                    loop
                    autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                    navigation
                    pagination={{ clickable: true }}
                    className="rounded-3xl shadow-xl overflow-hidden"
                >
                    {slides.map((slide) => (
                        <SwiperSlide key={slide._id}>
                            <div className="relative w-full rounded-3xl overflow-hidden flex flex-col md:flex-row">
                                {/* Image */}
                                <div className="w-full md:w-full h-[320px] sm:h-[400px] md:h-[560px] lg:h-[640px] relative">
                                    <img
                                        src={slide.image}
                                        alt={slide.title}
                                        className="absolute inset-0 w-full h-full object-cover object-center rounded-3xl"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/20 to-transparent rounded-3xl" />
                                </div>

                                {/* Info Card */}
                                <div className="w-full md:w-auto flex justify-start md:absolute md:bottom-6 md:left-6 p-4 md:p-0">
                                    <div className="max-w-sm bg-base-100/85 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-base-300">
                                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-base-content">
                                            {slide.title}
                                        </h2>
                                        <p className="mt-2 text-base-content/70 text-sm md:text-base leading-relaxed">
                                            {slide.subtitle}
                                        </p>
                                        {slide.cta && (
                                            <NavLink
                                                to={slide.cta.to}
                                                className="btn btn-primary mt-4 btn-sm md:btn-md transition-transform duration-300 hover:scale-105"
                                            >
                                                {slide.cta.label}
                                            </NavLink>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>

    );
};

export default HeroBanner;
