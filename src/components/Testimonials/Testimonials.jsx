import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Ayesha Karim",
      subject: "Physics",
      text: "StudyMate helped me find a study partner who matches my schedule and learning pace. We’ve improved our grades together!",
      image: "https://randomuser.me/api/portraits/women/21.jpg",
      rating: 5,
    },
    {
      id: 2,
      name: "Tanvir Rahman",
      subject: "Mathematics",
      text: "The matching system is amazing — I connected with someone from another city who shares my interests in problem solving.",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 4,
    },
    {
      id: 3,
      name: "Nusrat Jahan",
      subject: "English Literature",
      text: "Such a supportive platform! I found a partner for essay discussions, and now I enjoy studying much more.",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
      rating: 5,
    },
  ];

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-base-100 py-16 px-4 flex flex-col items-center">
      {/* Header */}
      <div className="text-center max-w-2xl mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
          What Students Say
        </h1>
        <p className="text-base-content/70 text-sm md:text-base">
          Real stories from StudyMate learners who’ve found their perfect study partners.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
        {reviews.map((r) => (
          <div
            key={r.id}
            className="card bg-base-200/50 border border-base-300 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
          >
            <div className="card-body">
              {/* User Info */}
              <div className="flex items-center gap-3 mb-3">
                <div className="avatar">
                  <div className="w-12 rounded-full ring ring-primary/30 ring-offset-2 ring-offset-base-100">
                    <img src={r.image} alt={r.name} />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-base">{r.name}</h3>
                  <p className="text-sm text-base-content/70">{r.subject}</p>
                </div>
              </div>

              {/* Review Text */}
              <p className="text-base-content/80 text-sm leading-relaxed mb-3">
                “{r.text}”
              </p>

              {/* Rating with React Icons */}
              <div className="flex items-center gap-1 text-warning">
                {Array.from({ length: 5 }).map((_, i) =>
                  i < r.rating ? (
                    <FaStar key={i} className="w-4 h-4" />
                  ) : (
                    <FaRegStar key={i} className="w-4 h-4 opacity-50" />
                  )
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-16 text-center">
        <h2 className="text-xl md:text-2xl font-semibold mb-3">
          Share Your Experience
        </h2>
        <p className="text-base-content/70 mb-5 max-w-md mx-auto text-sm md:text-base">
          Already used StudyMate? Help others by sharing your review.
        </p>
        <button className="btn btn-primary">Write a Review</button>
      </div>
    </main>
  );
};

export default Testimonials;
