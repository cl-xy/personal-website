'use client'
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Gallery() {
  const photos = [
    {
      id: 1,
      src: "/gallery/img1.jpg",
      title: "aboutme_img1"
    },
    {
      id: 2,
      src: "/gallery/img2.jpg",
      title: "aboutme_img2"
    },
    {
      id: 3,
      src: "/gallery/img3.jpg",
      title: "aboutme_img3"
    },
    {
      id: 4,
      src: "/gallery/img4.jpg",
      title: "aboutme_img4"
    }
  ];

  return (
    <div className="max-w-xl mx-auto p-4">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        className="rounded-lg"
      >
        {photos.map((photo) => (
          <SwiperSlide key={photo.id}>
            <div className="relative aspect-[4/3]">
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};