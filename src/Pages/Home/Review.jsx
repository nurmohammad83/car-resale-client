import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./SwiperStyles/reviews.css";

// import required modules
import {
  Autoplay,
  EffectCoverflow,
  Pagination,
  Navigation,
  Keyboard,
} from "swiper";
import Loading from "../Shared/Loading";
import Customer from "./Customer";
import { useQuery } from "@tanstack/react-query";

const Review = () => {
  const {data:reviews=[],isLoading}=useQuery({
    queryKey:['reviews'],
    queryFn:async()=>{
        const res = await fetch("https://car-resale-server-nurmohammad83.vercel.app/reviews");
        const data = await res.json()
        return data
    }
  })

  
  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <section className="pt-32 max-w-6xl mx-auto">
      <h2 className="text-5xl font-semibold text-center">Customer Feedback</h2>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        loop={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{
          clickable: true,
        }}
        keyboard={{
          enabled: true,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[EffectCoverflow, Autoplay, Pagination, Keyboard, Navigation]}
        className="mySwiper"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review._id}>
            <Customer review={review} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Review;
