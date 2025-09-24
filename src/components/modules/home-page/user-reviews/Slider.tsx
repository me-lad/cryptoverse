// 📌 Directives
'use client';

// 📦 Third-Party imports
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useRef } from 'react';
import clsx from 'clsx';

// TP (Swiper package) imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import SwiperType from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

// 📦 Internal imports
import { flexBetween, posCenter } from '~styles/tw-custom';
import Card from './Card';
import './Slider.css';

// 🧾 Local types & variables
const coverflowEffect = {
  rotate: 0,
  stretch: 0,
  depth: 150,
  modifier: 1.5,
  slideShadows: false,
};

const pagination = {
  clickable: true,
};

const swiperClass = clsx(
  'mySwiper homePage__slider',
  'flex w-full items-center justify-center',
  '*:select-none',
);

// ⚙️ Functional component
const Slider = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="my-10">
      {/* Slider */}
      <Swiper
        className={swiperClass}
        slidesPerView={'auto'}
        modules={[Navigation, Pagination, EffectCoverflow]}
        effect="coverflow"
        coverflowEffect={coverflowEffect}
        pagination={pagination}
        navigation
        centeredSlides={true}
        loop={true}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onInit={(swiper) => swiper.update()}
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <SwiperSlide key={index} className="max-w-1/2 bg-transparent py-10">
            <Card
              description="The platform is incredibly user-friendly, and since I became a holder, I've seen a significant increase in my assets. It's great to be part of a project where everything just works smoothly! I’ve been impressed by the continuous innovation and dedication of the team. As a holder, I feel like I'm part of something truly groundbreaking, and I can’t wait to see where this project goes next."
              username="John Doe"
              userProfileImg="/images/dashboard/avatar.png"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation */}
      {false && (
        <div
          className={`${flexBetween} ${posCenter} !-right-16 !-left-16 *:relative *:z-10`}
        >
          {/* Previous navigator */}
          <div
            onClick={() => swiperRef.current?.slidePrev()}
            className="hover:bg-primary-700 hover:border-primary-700 cursor-pointer rounded-full border border-gray-500 p-1 transition-all"
          >
            <ChevronLeft size={28} />
          </div>

          {/* Next navigator */}
          <div
            onClick={() => swiperRef.current?.slideNext()}
            className="hover:bg-primary-700 hover:border-primary-700 cursor-pointer rounded-full border border-gray-500 p-1 transition-all"
          >
            <ChevronRight size={28} />
          </div>
        </div>
      )}
    </div>
  );
};
export default Slider;
