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
import { AiFillStar } from "react-icons/ai";
import toFarsiNumber from "../../utils/PersianNum";
import { listFavoriteProducts } from "../../actions/productListActions";

export default function ProductSliderListPreview({ title, bg_color, color, func, sliderState }) {
    // const listProductsAllShow = useSelector(state => state.listProductsAllShow)
    const num = [1, 2, 3]
    const { products, loading, error } = sliderState

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(func)
    }, []);
    return (
        <>
            <div className="product-box-slider-list position-relative mt-5"
                style={{ backgroundColor: bg_color }}
            >

                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    grabCursor={true}
                    navigation={{
                        clickable: true,
                    }}
                    breakpoints={{
                        540: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        1024: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        1400: {
                            slidesPerView: 3,
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
                                        <div className="product-box" >
                                            <div className="product-discount-price">۳۰٪</div>
                                            <div className="product-box-image-container">
                                                <div className="product-box-image">
                                                    <Link to={`/products/${product._id}`} onClick={()=>window.scroll(0,0)}>
                                                        <img src={product.image} />
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="product-box-list-body-container pb-3">
                                                <Link to={`/products/${product._id}`} onClick={()=>window.scroll(0,0)}>
                                                    <div className="product-title">
                                                        <strong>{product.name}</strong>
                                                    </div>
                                                    <div className="product-box-price">
                                                        <span className="product-price-current">{Intl.NumberFormat('fa-IR').format(product.price)}<span className='price-toman'>تومان</span></span>
                                                    </div>
                                                </Link>
                                                
                                               
                                            </div>
                                        </div>
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
