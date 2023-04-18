import React, { useState, useEffect } from 'react'
import ProductSlider from '../Products/ProductSlider';
import Sliders from '../Sliders/Sliders';
import { listProducts, listProductsLast, listProductsTop } from '../../actions/productActions';
import { useSelector } from 'react-redux';
import InfoBar from '../InfoBar';
import { useDispatch } from 'react-redux';
import { listByUserProducts, addCompareProductsAction } from '../../actions/productListActions';

const Home = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listByUserProducts())
        // dispatch(addCompareProductsAction())
    }, [])
    const listProductsLastVar = useSelector(state => state.listProductsLast)

    const listProductsTopVar = useSelector(state => state.listProductsTop)
    
    return (
        <>
            <Sliders />
            <InfoBar />
            <ProductSlider title={'محصولات برتر'} sliderState={listProductsTopVar} func={listProductsTop()} color={'white'} bg_color={"#3b2c35"} />
            <ProductSlider title={'آخرین محصولات'} sliderState={listProductsLastVar} func={listProductsLast()} color={'white'} bg_color={"#15616D"} />
            {/* <ProductSlider title={'پرفروش ترین ها'} sliderState={listProductsLastVar} func={listProductsLast()} color={'white'} bg_color={"#15616D"} /> */}
            {/* <ProductSlider title={'فروش ویژه'} sliderState={listProductsLastVar} func={listProductsLast()} color={'white'} bg_color={"#15616D"} /> */}
        </>
    )
}

export default Home;