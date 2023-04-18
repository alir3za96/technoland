import React, { useState, useEffect } from 'react'
import { AiFillStar } from "react-icons/ai";
import { BsFillCartPlusFill } from "react-icons/bs";
import { MdCompare } from "react-icons/md";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import toFarsiNumber from '../../utils/PersianNum';
import { useDispatch, useSelector } from 'react-redux';
import { addCompareProductsAction, addFavoriteProductsAction } from '../../actions/productListActions';

import { ToastContainer, toast } from 'react-toastify';
import { addToCart, removeFromCart } from "../../actions/cartActions";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from 'react-bootstrap';

const Product = ({ product, bg_color, color }) => {
    const dispatch = useDispatch()
    const [productId, setProductId] = React.useState(0);

    const [open, setOpen] = React.useState(false);

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const cart = useSelector(state => state.cart)
    const { cartItems, loading: cartLoading } = cart

    const favoriteProducts = useSelector(state => state.addProductsFavorite)
    const { add: favAdd, error: favError, message: favMessage, remove: favRemove } = favoriteProducts

    const compareProducts = useSelector(state => state.addProductsCompare)
    const { add: compareAdd, error: compareError, message: compareMessage, remove: compareRemove } = compareProducts


    const [favoriteProductsList, setFavoriteProductsList] = useState([])
    const [compareProductsList, setCompareProductsList] = useState([])
    const listProductsByUser = useSelector(state => state.listProductsByUser)
    const { favorite_products, compare_products } = listProductsByUser

    const handleClickOpen = (product_id) => {
        setOpen(true);
        setProductId(product_id)

    };
    const handleClose = () => {
        setOpen(false);

    };
    const addToCartHandler = (e) => {
        dispatch(addToCart(e.target.value, 1))

        toast.success("محصول به سبد خرید اضافه شد", {
            position: "top-center",
            autoClose: true,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });

    }

    const removeFromCartHandler = (e) => {
        dispatch(removeFromCart(Number(e.target.value)))
        toast.warn("محصول از سبد خرید پاک شد", {
            position: "top-center",
            autoClose: true,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    const addToFavoriteListHandler = (e) => {
        if (userInfo) {
            dispatch(addFavoriteProductsAction(e.target.value));

            if (favRemove || !favAdd) {
                toast.success("محصول به لیست اضافه شد", {
                    position: "top-center",
                    autoClose: true,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
            if (favAdd) {
                toast.success("محصول به لیست اضافه شد", {
                    position: "top-center",
                    autoClose: true,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        } else {
            toast.warn("ابتدا وارد حساب کاربری شوید", {
                position: "top-center",
                autoClose: true,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }

    }

    const removeFavoriteListHandler = (productId) => {
        setOpen(false);
        console.log(productId)
        dispatch(addFavoriteProductsAction(productId));
        toast.warn("محصول از لیست پاک شد", {
            position: "top-center",
            autoClose: true,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }


    const addToCompareListHandler = (e) => {
        if (userInfo) {
            dispatch(addCompareProductsAction(e.target.value));
            if (compareRemove || !compareAdd) {
                toast.success("محصول به لیست اضافه شد", {
                    position: "top-center",
                    autoClose: true,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
            if (compareAdd) {
                toast.warn("محصول از لیست پاک شد", {
                    position: "top-center",
                    autoClose: true,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        } else {
            toast.warn("ابتدا وارد حساب کاربری شوید", {
                position: "top-center",
                autoClose: true,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }

    const removeCompareListHandler = (e) => {
        dispatch(addCompareProductsAction(e.target.value));
        toast.warn("محصول از لیست پاک شد", {
            position: "top-center",
            autoClose: true,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }
    useEffect(() => {
        if (favorite_products != undefined) {
            setFavoriteProductsList(favorite_products)
        }
        if (compare_products != undefined) {
            setCompareProductsList(compare_products)
        }

        // console.log(cartItems)
        // setCompareProductsList()
        // if (!favorite_products) {
        //     favorite_products = []
        // }
        // if (!compare_products) {
        //     compare_products = []
        // }
    }, [favorite_products, compare_products, cartItems, cartLoading, addToCartHandler, removeFromCartHandler])
    const moveUpHandler = () => {
        window.scrollTo(0, 0);
    }
    return (

        <div className="product-box" >
            <div className="product-discount-price">۳۰٪</div>
            <div className="product-box-image-container">
                <div className="product-box-image">
                    <Link to={`/products/${product._id}`}>
                        <img onClick={moveUpHandler} className='w-100' src={product.image} />
                    </Link>
                </div>
            </div>
            <div className="product-box-body-container">
                <Link  to={`/products/${product._id}`}>
                    <div onClick={moveUpHandler} className="product-title">
                        <strong>{product.name}</strong>
                    </div>
                    <div onClick={moveUpHandler} className="product-box-price">
                        <span className="product-price-current">{Intl.NumberFormat('fa-IR').format(product.price)}<span
                            className='price-toman'>تومان</span></span>
                    </div>
                </Link>
                <div className="product-box-rating">
                    <span>{toFarsiNumber(Number(product.rating).toFixed(2))}</span><AiFillStar
                        style={{ backgroundColor: bg_color }} />
                </div>
                <div className="product-icon">

                    {/*<BsFillCartPlusFill style={{backgroundColor: bg_color, color: color}}/>*/}
                    {/* <input value={product._id} onClick={addToCompareListHandler} id={`fill-heart-${product._id}`} hidden></input>
                    <label for={`fill-heart-${product._id}`} >
                        <MdCompare className={products.map(item => (item.product._id)).includes(product._id) ? 'product-icon-fill product-icon-on-hover' : 'd-none product-icon-on-hover'} style={{ backgroundColor: bg_color, color: color }} />
                    </label> */}

                    {
                        cartItems.map(item => (item.product)).includes(product._id) ?
                            <>
                                <input value={product._id} onClick={removeFromCartHandler}
                                    id={`fill-cart-${product._id}`} hidden></input>
                                <label for={`fill-cart-${product._id}`}>
                                    <BsFillCartPlusFill
                                        className={cartItems.map(item => (item.product)).includes(product._id) ? 'product-icon-fill product-icon-on-hover fill-cart' : 'd-none product-icon-on-hover fill-cart'}
                                        style={{ backgroundColor: bg_color, color: color }} />
                                </label>
                            </>
                            :
                            <>
                                <input value={product._id} onClick={addToCartHandler}
                                    id={`outline-cart-${product._id}`} hidden></input>
                                <label for={`outline-cart-${product._id}`}>
                                    <BsFillCartPlusFill
                                        className={cartItems.map(item => (item.product)).includes(product._id) ? 'd-none product-icon-on-hover outline-cart' : 'product-icon-outline product-icon-on-hover outline-cart'}
                                        style={{ backgroundColor: bg_color, color: color }} />
                                </label>
                            </>
                    }
                    {/*{*/}
                    {/*    compareProductsList.map(item => (item.product._id)).includes(product._id) ?*/}
                    {/*        <>*/}
                    {/*            <input value={product._id} onClick={removeCompareListHandler}*/}
                    {/*                   id={`fill-compare-${product._id}`} hidden></input>*/}
                    {/*            <label for={`fill-compare-${product._id}`}>*/}
                    {/*                <MdCompare*/}
                    {/*                    className={compareProductsList.map(item => (item.product._id)).includes(product._id) ? 'product-icon-fill product-icon-on-hover fill-compare' : 'd-none product-icon-on-hover fill-compare'}*/}
                    {/*                    style={{backgroundColor: bg_color, color: color}}/>*/}
                    {/*            </label>*/}
                    {/*        </>*/}
                    {/*        :*/}
                    {/*        <>*/}
                    {/*            <input value={product._id} onClick={addToCompareListHandler}*/}
                    {/*                   id={`outline-compare-${product._id}`} hidden></input>*/}
                    {/*            <label for={`outline-compare-${product._id}`}>*/}
                    {/*                <MdCompare*/}
                    {/*                    className={compareProductsList.map(item => (item.product._id)).includes(product._id) ? 'd-none product-icon-on-hover outline-compare' : 'product-icon-outline product-icon-on-hover outline-compare'}*/}
                    {/*                    style={{backgroundColor: bg_color, color: color}}/>*/}
                    {/*            </label>*/}
                    {/*        </>*/}
                    {/*}*/}
                    {
                        favoriteProductsList.map(item => (item.product._id)).includes(product._id) ?
                            <>
                                <input value={product._id} onClick={() => handleClickOpen(product._id)}
                                    id={`fill-heart-${product._id}`} hidden></input>
                                <label for={`fill-heart-${product._id}`}>
                                    <AiFillHeart
                                        className={favoriteProductsList.map(item => (item.product._id)).includes(product._id) ? 'product-icon-fill product-icon-on-hover' : 'd-none product-icon-on-hover'}
                                        style={{ backgroundColor: bg_color, color: color }} />

                                </label>
                               
                            </>
                            :
                            <>
                                <input value={product._id} onClick={addToFavoriteListHandler}
                                    id={`outline-heart-${product._id}`} hidden></input>
                                <label for={`outline-heart-${product._id}`}>
                                    <AiOutlineHeart
                                        className={favoriteProductsList.map(item => (item.product._id)).includes(product._id) ? 'd-none product-icon-on-hover' : 'product-icon-outline product-icon-on-hover'}
                                        style={{ backgroundColor: bg_color, color: color }} />
                                </label>
                            </>
                    }


                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {" آیا اطمینان دارید؟"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                className={'ms-2 w-25 btn-warning'}
                                onClick={() => removeFavoriteListHandler(productId)}>بله</Button>
                            <Button
                                className={' w-25'}
                                onClick={handleClose} autoFocus>
                                کنسل
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}

export default Product