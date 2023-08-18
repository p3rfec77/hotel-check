import { useSelector } from "react-redux";
import { selectPics } from "../../store/hotels.slice";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Navigation } from "swiper/modules";

import "./hotels-slider.scss";
export const HotelsSlider = () => {
  const pics = useSelector(selectPics);
  return (
    <div className="swiper-container">
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={10}
        loop={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {pics.map(({ id, img }) => (
          <SwiperSlide key={id} className="swiper-pic-container">
            <img className="swiper-pic" src={img} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
