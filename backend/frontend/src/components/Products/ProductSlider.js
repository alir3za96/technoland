import React, { useState, useEffect } from "react";
// Import Swiper React components
import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";

// import products from "./ProductsData";
import { Navigation } from "swiper";


// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";
import { PreLoader } from "../PreLoader/PreLoader";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productActions";
import Product from "./Product";
import ProductsPlaceholder from "./ProductsPlaceholder";

export default function ProductSlider({ title, bg_color, color,func, sliderState }) {
    // const listProductsAllShow = useSelector(state => state.listProductsAllShow)
    const num = [1, 2, 3, 4, 5, 6]
    const { products, loading, error } = sliderState

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(func)
    }, []);
    return (
        <>
            <div className="product-box-slider position-relative container-box-shadow container-fluid mt-5"
                style={{ backgroundColor: bg_color }}
            >
                <div className="product-slider-title">
                    <h3>{title}</h3>
                </div>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    grabCursor={true}
                    navigation={{
                        clickable: true,
                    }}
                    breakpoints={{
                        540: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 10,
                        },
                        1400: {
                            slidesPerView: 5,
                            spaceBetween: 15,
                        },
                    }}
                    className="mySwiper"
                    modules={[Navigation]}
                >
                    {loading ?

                        (num.map((i, index) => (
                            <SwiperSlide key={index}>
                                <ProductsPlaceholder />
                            </SwiperSlide>
                        )))
                        : (
                            <>
                                {products.map((product, index) => (
                                    <SwiperSlide key={product._id}>
                                        <Product product={product} bg_color={bg_color} color={color} />
                                    </SwiperSlide>
                                ))}
                            </>
                        )
                    }
                </Swiper>
            </div>
        </>
    );
}
