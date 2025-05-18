"use client"
import React from "react";
import Slider from "react-slick";

const Testimonials = () => {
  const reviews = [
    {
      name: "Amina J.",
      quote:
        "Book Lab changed how I read! I can borrow any book instantly and return when done. So convenient.",
    },
    {
      name: "Emeka O.",
      quote:
        "No more excuses! I finally finished 5 books in one month thanks to Book Lab’s easy borrowing system.",
    },
    {
      name: "Grace L.",
      quote:
        "I love how organized it is. Returning books is simple — and the late fee system keeps me accountable.",
    },
    {
      name: "Tunde K.",
      quote:
        "Their collection is 🔥. I always find what I’m looking for, from fiction to self-help.",
    },
  ];

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     autoplay: true,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: false,
//   };

  return (
    <section className="bg-[#F3F4F6] py-20 px-4 text-[#1E2A38]">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">What Readers Are Saying</h2>
        {/* <Slider {...settings}> */}
          {reviews.map((review, index) => (
            <div key={index} className="p-6">
              <div className="bg-white rounded-xl shadow p-6 md:p-10">
                <p className="italic text-[#374151] mb-4">"{review.quote}"</p>
                <h4 className="font-semibold">– {review.name}</h4>
              </div>
            </div>
          ))}
        {/* </Slider> */}
      </div>
    </section>
  );
};

export default Testimonials;
