'use client'
import Image from 'next/image';

export default function Gallery() {
  const photos = [
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
    <div className="w-full max-w-xl mx-auto p-4">
      <div className="grid grid-cols-2 gap-4">
        {photos.map((photo) => (
          <div key={photo.id} className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
            <Image
              src={photo.src}
              alt={photo.title}
              width={300}
              height={300}
              className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
              loading={photo.id === 2 ? 'eager' : 'lazy'}
              quality={75}
            />
          </div>
        ))}
      </div>
    </div>
  );
};