// 📌 Directives
'use client';

// 📦 Third-Party imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import React, { use } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// 📦 Internal imports
import type { DataEntity } from '~types/api-generated/getLatestNews';
import { containerDefault } from '~styles/tw-custom';
import { NewsContext } from '../NewsPage.context';
import './Slider.css';

// 🧾 Local types
interface PropsT {
  data: DataEntity[];
}

// ⚙️ Functional component
const SliderUi: React.FC<PropsT> = ({ data }) => {
  const { params } = use(NewsContext);
  if (params.searchString) return;

  return (
    <Swiper
      className={clsx(
        containerDefault,
        'mySwiper newsPage__slider relative mt-16 min-h-[520px] overflow-hidden rounded-lg',
      )}
      spaceBetween={0}
      slidesPerView={1}
      modules={[Navigation, Pagination, Autoplay]}
      pagination={{ clickable: true }}
      autoplay={{ delay: 4_000 }}
      navigation
    >
      {data.map((item, index) => (
        <SwiperSlide key={item.ID}>
          <div className="relative min-h-[520px]">
            <Image
              className="h-auto max-w-full object-cover"
              src={`/images/news-page/slider-bg-${index % 2 === 0 ? '1' : '2'}.png`}
              alt="Crypto Verse"
              fill
            />

            <div className="absolute right-0 -bottom-5 left-0 h-2/5 w-full bg-neutral-950/40 p-8 backdrop-blur-md">
              <div className="inline-block">
                <Link className="inline-block" href={item.URL}>
                  <h2 className="line-clamp-1 text-xl font-semibold">
                    {item.TITLE}
                  </h2>
                </Link>
                <p className="mt-4 line-clamp-3 text-neutral-300">
                  {item.BODY ||
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem magni harum non itaque quo placeat doloribus tenetur reprehenderit, magnam dolorem velit blanditiis, minima est! Odio quis est praesentium perferendis beatae, consequatur blanditiis qui ducimus, facere nobis aperiam et accusamus iure rerum pariatur libero assumenda quidem autem ad sit magnam quaerat.'}
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default SliderUi;
