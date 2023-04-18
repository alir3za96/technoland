import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

import axios from "axios";
import { AiFillStar } from "react-icons/ai";
import { BsFillCartPlusFill } from "react-icons/bs";
import { MdCompare } from "react-icons/md";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import toFarsiNumber from '../../utils/PersianNum';
import { getAllProducts } from '../../services/productServices';
import { PreLoader } from '../PreLoader/PreLoader';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts, listProductsSearch } from "../../actions/productActions";
import Product from './Product';
import ProductsPlaceholder from './ProductsPlaceholder';
import Message from '../Message';
import Paginate from '../Paginate';

const ProductsSearch = ({ bg_color, color }) => {
    const num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const listProductsSearchVar = useSelector(state => state.listProductsSearch)
    const { products, loading, error, page, pages } = listProductsSearchVar
    let keyword = useLocation().search;
    const pathname = useLocation().pathname
    const dispatch = useDispatch();
    useEffect(() => {
            dispatch(listProductsSearch(keyword))
    },[keyword]);

    return (
        <div className='container-fluid mt-3'>
            <div className='row '>
                <div className='col-md-2 product-list-filter container-box-shadow'></div>
                <div className='col-md-10 product-list'>
                    <div className='row'>
                        {loading ?
                            (num.map(i => (
                                <div key={i} className='product-box-container col-sm-6 col-md-4 col-lg-3 mb-4'>
                                    <ProductsPlaceholder />
                                </div>
                            )))
                            :
                            error ?
                                <Message text={error} variant='danger'/>
                                :
                                products.map((product) => (
                                    <div key={product._id} className='product-box-container col-sm-6 col-md-4 col-lg-3 mb-4'>
                                        <Product product={product} bg_color={bg_color} color={color} />
                                    </div>
                                ))
                                }
                    </div>
                    <Paginate page={page} pages={pages} keyword={keyword} />
                </div>
            </div>
        </div>
    )
}

export default ProductsSearch

