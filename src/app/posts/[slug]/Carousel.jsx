import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./MySwiper.css";

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import Image from "next/image";

export default function Carousel({ product }) {
  return (
    <>
      <Swiper
        cssMode={true}
        // slidesPerView={2}
        spaceBetween={30}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        breakpoints={{
          0: {
            slidesPerView: 1, // Mobile
          },
          768: {
            slidesPerView: 2, // Tablet and up
          },
        }}
        className="mySwiper"
      >
        {product.youtube_video_link && (
          <SwiperSlide>
            <div className="rounded-lg w-full h-60">
              <iframe
                src={
                  product.youtube_video_link.includes("embed")
                    ? product.youtube_video_link
                    : product.youtube_video_link.replace("watch?v=", "embed/")
                }
                title={product.product_name}
                className="w-full h-full rounded-lg"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </SwiperSlide>
        )}
        {product?.banners_url &&
          product.banners_url.length > 0 &&
          product.banners_url.map((banner, idx) => (
            <SwiperSlide key={idx} className="rounded-lg w-full">
              <Image
                src={banner}
                alt={product.product_name}
                width={1000}
                height={300}
                className="w-full h-60 object-cover rounded-lg"
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}
