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
  return (
    <div className="mb-10">
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
        onInit={(swiper) => swiper.update()}
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <SwiperSlide
            key={index}
            className="max-w-[85%] bg-transparent py-10 sm:max-w-3/4 lg:max-w-3/5 xl:max-w-1/2"
          >
            <Card
              description="The platform is incredibly user-friendly, and since I became a holder, I've seen a significant increase in my assets. It's great to be part of a project where everything just works smoothly! I’ve been impressed by the continuous innovation and dedication of the team. As a holder, I feel like I'm part of something truly groundbreaking, and I can’t wait to see where this project goes next."
              username="John Doe"
              userProfileImg="/images/dashboard/avatar.png"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default Slider;
