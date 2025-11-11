// src/components/Home/BannerSwiper.jsx
import React, { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router"; // your preference
import useAxios from "../../hooks/axios/useAxios";

// Swiper (React)
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";

// Swiper styles (required)
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { HashLoader } from "react-spinners";

const Banner = () => {
  const axiosInstance = useAxios();
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setErr(null);
    axiosInstance
      .get("/partners/recent")
      .then((res) => {
        if (!isMounted) return;
        setSlides(Array.isArray(res.data) ? res.data : []);
      })
      .catch((e) => {
        if (!isMounted) return;
        setErr(e?.message || "Failed to load slides");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [axiosInstance]);

  
  const safeSlides = useMemo(() => {
    if (slides.length >= 2) return slides;
    if (slides.length === 1) {
      const s = slides[0];
      return [s, { ...s, _id: (s._id || s.id || s.name || "slide") + "-clone" }];
    }
    return [];
  }, [slides]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <HashLoader color="#73abff" size={80} />
      </div>
    );
  }

  if (err) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center">
        <div className="alert alert-error">
          <span>Could not load banner data: {err}</span>
        </div>
      </div>
    );
  }

  if (safeSlides.length === 0) {
    return (
      <section className="relative bg-base-100">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="rounded-2xl border border-dashed border-base-300 p-8 text-center">
            <h3 className="text-lg font-bold">No recent partners yet</h3>
            <p className="mt-1 text-base-content/70">
              Create your profile to get matched with peers.
            </p>
            <div className="mt-4">
              <NavLink to="/create-partner" className="btn btn-primary btn-sm md:btn-md">
                Create Profile
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-base-100">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 pt-4 sm:pt-6 pb-6 sm:pb-10">
        <Swiper
          modules={[Navigation, Pagination, A11y, Autoplay]}
          // Behavior
          spaceBetween={12}
          slidesPerView={1}
          loop={safeSlides.length > 1}
          autoplay={
            safeSlides.length > 1
              ? { delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }
              : false
          }
          // UI
          navigation={safeSlides.length > 1}
          pagination={{ clickable: true }}
          // Responsive spacing
          breakpoints={{
            640: { spaceBetween: 16 },
            768: { spaceBetween: 18 },
            1024: { spaceBetween: 20 },
          }}
          className="rounded-2xl border border-base-300 shadow-sm overflow-hidden"
          a11y={{ enabled: true }}
        >
          {safeSlides.map((s) => (
            <SwiperSlide key={s._id || s.id || s.name}>
              {/* IMAGE AREA */}
              <div
                className="
                  relative w-full
                  h-[260px] sm:h-[320px] md:h-[460px] lg:h-[520px] xl:h-[600px]
                  rounded-2xl overflow-hidden
                "
              >
                <img
                  src={s.profileimage}
                  alt={s.name}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  loading="lazy"
                  decoding="async"
                />

                {/* Lighter gradient on mobile so image stays visible */}
                <div className="absolute inset-0 bg-gradient-to-t from-base-100/50 via-base-100/20 to-transparent md:from-base-100/80 md:via-base-100/40" />

                {/* DESKTOP/TABLET OVERLAY CARD (hidden on mobile) */}
                <div className="hidden md:flex absolute inset-0 p-6 lg:p-10 items-end">
                  <div className="max-w-xl bg-base-100/90 backdrop-blur-sm border border-base-300 shadow-lg p-6 rounded-2xl">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold flex flex-wrap items-center gap-2">
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
                    <div className="mt-2 flex flex-wrap items-center gap-3">
                      <div className="rating rating-sm">
                        {[0, 1, 2, 3, 4].map((i) => (
                          <input
                            key={i}
                            type="radio"
                            className={`mask mask-star-2 ${
                              i < Math.round(s.rating) ? "bg-warning" : "bg-base-300/50"
                            }`}
                            readOnly
                            aria-label={`rating star ${i + 1}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs opacity-70">
                        {Number(s.rating ?? 0).toFixed(1)}/5 • Partners: {s.patnerCount ?? 0}
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
                      <NavLink
                        to={`/partners/${s._id || s.id || "profile"}`}
                        className="btn btn-primary btn-sm md:btn-md"
                      >
                        View Profile
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>

              {/* MOBILE CARD (separate, below image) */}
              <div className="md:hidden mt-3 px-2 sm:px-3">
                <div className="bg-base-100 border border-base-300 shadow-md p-4 rounded-2xl">
                  <h3 className="text-lg font-extrabold flex items-center gap-2">
                    {s.name}
                    {s.experienceLevel && (
                      <span className="badge badge-primary badge-outline text-[10px]">
                        {s.experienceLevel}
                      </span>
                    )}
                  </h3>

                  <p className="mt-0.5 text-sm text-base-content/80">
                    {s.subject} • {s.studyMode} • {s.location}
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <div className="rating rating-sm">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <input
                          key={i}
                          type="radio"
                          className={`mask mask-star-2 ${
                            i < Math.round(s.rating) ? "bg-warning" : "bg-base-300/50"
                          }`}
                          readOnly
                        />
                      ))}
                    </div>
                    <span className="text-xs opacity-70">
                      {Number(s.rating ?? 0).toFixed(1)}/5 • {s.availableFrom}–{s.availableTo}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <NavLink
                      to={`/partners/${s._id || s.id || "profile"}`}
                      className="btn btn-primary btn-xs"
                    >
                      View Profile
                    </NavLink>
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

export default Banner;
