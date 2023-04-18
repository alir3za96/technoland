import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import './sliders.css'

// import sliders from './SliderContent'

// import required modules
import { EffectFade, Autoplay, Navigation, Pagination } from "swiper";
import { getSliders } from "../../services/otherServices";
import { Link } from "react-router-dom";

export default function Sliders() {
  const [sliders, setSliders] = useState([]);


  useEffect(() => {

    const fetchData = async () => {
      try {
        const { data: slidersData } = await getSliders();

        setSliders(slidersData);
      } catch (err) {
        setSliders(err.message);
      }
    };

    fetchData();
  }, []);
  const handleMouseEnter = () => {
    Autoplay.stop();
  };
  const handleMouseLeave = () => {
    Autoplay.start();
  };
  return (
    <>
      <Swiper
        spaceBetween={30}
        dir="rtl"
        effect={"fade"}
        navigation={true}

        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Autoplay, Navigation, Pagination]}
        onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
        className="mySwiper main-slider container-fluid mt-2 container-box-shadow"
      >

        {
          sliders.map((slider, index) => (
            <SwiperSlide className="slider-container" key={index}>
              <img src={slider.image} />
              <div className="slider-div">
               <p className="slider-title">
               {slider.title}
               </p>
               <Link to={`${slider.url}`}>
               <p className="slider-url">
                <span className="ps-2">
                خرید
                </span>
                <i className='fas fa-angle-left'></i>
               </p>
               </Link>
               {/* <div className="slider-subtitle">
               {slider.subtitle}
               </div> */}
              </div>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </>
  );
}
