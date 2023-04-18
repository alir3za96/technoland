import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { AiFillStar } from "react-icons/ai";
import { BsFillCartPlusFill } from "react-icons/bs";
import { MdCompare } from "react-icons/md";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import RatingReadOnly from '../Rating/RatingReadOnly'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { PreLoader } from '../PreLoader/PreLoader'
import Message from '../Message'
// import products, { getProduct } from './ProductsData'
import { Row, Col, ListGroup, Button, Form } from 'react-bootstrap'
import { createProductReview } from "../../actions/productActions";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import Zoom from 'react-medium-image-zoom'
// import ReactImageMagnify from 'react-image-magnify';
// import 'react-medium-image-zoom/dist/styles.css'
// Import Swiper styles

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";
// import toFarsiNumber from "../../utils/PersianNum";
import { getProduct } from '../../services/productServices';
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from '../../actions/productActions'
import { addToCart } from "../../actions/cartActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../../constants/productConstants";
import CategoryRoute from "../CategoryRoute";
import toFarsiNumber from "../../utils/PersianNum";
import { debounce } from "../../helpers/debounce";
import { addFavoriteProductsAction } from "../../actions/productListActions";
import { toast } from "react-toastify";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import ProductSlider from "./ProductSlider";
import ProductSliderList from "./ProductSliderList";
import { listProductsLast } from "../../actions/productActions";
import { LinkContainer } from "react-router-bootstrap";
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const ProductDetail = () => {
    const [galleryImages, setGalleryImages] = useState([]);
    const theme = useTheme();
    const [value, setValue] = React.useState(0);


    const navigate = useNavigate();
    const { productId } = useParams();
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [productColor, setProductColor] = useState('');
    const [IncreaseTop, setIncreaseTop] = useState(true);
    const [scrollValue, setScrollValue] = useState(0)
    const [open, setOpen] = useState(false);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };
    const addToCartHandler = () => {
        // navigate(`/cart/${productId}?qty=${qty}`)
        dispatch(addToCart(productId, qty))
    }
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    // async function fetchProduct() {
    //     const { data } = await getProduct(productId);
    //     console.log(data)
    //     setProduct(data);
    // }
    // fetchProduct()
    // const product = ''
    const productDetails = useSelector(state => state.productDetails)
    const { product, jCreatedAt, loading, error } = productDetails

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const {
        loading: loadingProductReview,
        error: errorProductReview,
        success: successProductReview
    } = productReviewCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const cart = useSelector(state => state.cart)
    const { cartItems, addToCartLoading } = cart
    const isItemInCart = cartItems.map(x => x.product).find(x => x === product._id)
    // console.log(product._id, cartItems.product)
    const maxSale = product.maxSale ?
        product.countInStock > product.maxSale ?
            product.maxSale : product.countInStock
        : product.countInStock
    const dispatch = useDispatch();
    const favoriteProducts = useSelector(state => state.addProductsFavorite)
    const { add: favAdd, error: favError, message: favMessage, remove: favRemove } = favoriteProducts

    const [favoriteProductsList, setFavoriteProductsList] = useState([])
    const listProductsByUser = useSelector(state => state.listProductsByUser)
    const { favorite_products, compare_products } = listProductsByUser
    const listProductsLastVar = useSelector(state => state.listProductsLast)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);

    };
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
    useEffect(() => {

        if (successProductReview) {
            setRating(0)
            setComment('')
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }
        dispatch(listProductDetails(productId))
    }, [successProductReview, dispatch, productId]);
    useEffect(() => {
    }, [addToCartHandler, addToCartLoading]);
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(
            productId, {
            rating,
            comment
        }
        ))
    }

    const slideDownNavHandler = debounce(() => {
        const currentScrollPos = window.pageYOffset;
        setIncreaseTop((scrollValue > currentScrollPos && scrollValue - currentScrollPos > 50) || currentScrollPos < 10);
        setScrollValue(currentScrollPos);
    }, 100);
    useEffect(() => {
        window.addEventListener('scroll', slideDownNavHandler);

        return () => window.removeEventListener('scroll', slideDownNavHandler);

    }, [scrollValue, IncreaseTop, slideDownNavHandler]);
    useEffect(() => {
        setGalleryImages(product.gallery_images)
        if (favorite_products != undefined) {
            setFavoriteProductsList(favorite_products)
        }
        if (product.color.id == '1') {
            setProductColor("#FF0000")
        } else if (product.color.id == '2') {
            setProductColor("#ffa500")
        } else if (product.color.id == '3') {
            setProductColor("#000000")
        } else {
            setProductColor('fff')
        }
    }, [product, favorite_products, productId]);

    // const IsIn = () => {cartItems.find(x => x.product === product._id) ? true : false}
    return (
        <>
            {/* <CategoryRoute product={product} /> */}
            <div className='category-route d-flex container-fluid text-muted'>
                <div className='text-muted'>خانه / {product.category.getRoute}  </div>
                {/* {catRoute.map((cat, index) => (
                    <Link to={`?cat=${cat.slug}`}>
                        <div className='text-muted' key={index}>  /  {cat.title}</div>
                    </Link>
                ))} */}
            </div>
            <div className='container-fluid product-detail-product mt-2'>
                <div className='row'>
                    <div className="col-md-9">
                        <div className="row">
                            <div className='mobile-container product-detail-main-image pe-md-0 py-0 col-md-5 mx-auto'>
                                <div className="container-box-shadow p-2 position-sticky"
                                    style={IncreaseTop ? { 'top': '140px' } : { 'top': '100px' }}>
                                    <div className="product-detail-icon">
                                        {/* <AiOutlineHeart /> */}
                                        {
                                            favoriteProductsList.map(item => (item.product._id)).includes(19) ?
                                                <>
                                                    <input value={productId} onClick={() => handleClickOpen()}
                                                        id={`fill-heart-${productId}`} hidden></input>
                                                    <label for={`fill-heart-${productId}`}>
                                                        <AiFillHeart
                                                            className={favoriteProductsList.map(item => (item.product._id)).includes(productId) ? 'product-icon-fill product-icon-on-hover' : 'd-none product-icon-on-hover'}
                                                        />

                                                    </label>

                                                </>
                                                :
                                                <>
                                                    <input value={productId} onClick={addToFavoriteListHandler}
                                                        id={`outline-heart-${productId}`} hidden></input>
                                                    <label for={`outline-heart-${productId}`}>
                                                        <AiOutlineHeart
                                                            className={favoriteProductsList.map(item => (item.product._id)).includes(productId) ? 'd-none product-icon-on-hover' : 'product-icon-outline product-icon-on-hover'}
                                                        />
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

                                    <Swiper
                                        className="product-detail-gallery-large-swiper"
                                        spaceBetween={10}
                                        thumbs={{ swiper: thumbsSwiper }}
                                        modules={[FreeMode, Navigation, Thumbs]}
                                    >
                                        <SwiperSlide>
                                            <img src={product.image} alt={product.name} />

                                        </SwiperSlide>
                                        {
                                            galleryImages &&
                                            galleryImages.map(item => (
                                                <SwiperSlide>
                                                    <img src={item.image} alt={item.name} />
                                                </SwiperSlide>
                                            ))
                                        }



                                    </Swiper>
                                    <Swiper
                                        onSwiper={setThumbsSwiper}
                                        spaceBetween={5}
                                        slidesPerView={4}
                                        navigation={true}
                                        watchSlidesProgress={true}
                                        modules={[FreeMode, Navigation, Thumbs]}
                                        className="product-detail-gallery mt-1"
                                    >
                                        <SwiperSlide >
                                            <img src={product.image} alt={product.name} />
                                        </SwiperSlide>
                                        {galleryImages &&
                                            galleryImages.map(item => (
                                                <SwiperSlide>
                                                    <img src={item.image} alt={item.name} />
                                                </SwiperSlide>
                                            ))
                                        }
                                    </Swiper>
                                </div>
                            </div>
                            <div className='mobile-container product-detail-short-des pe-md-0 py-0 col-md-7'>
                                <div className="container-box-shadow p-2 position-sticky"
                                    style={IncreaseTop ? { 'top': '140px' } : { 'top': '100px' }}
                                >

                                    <ListGroup variant='flush'>

                                        <ListGroup.Item className='py-3'>

                                            <h1 className="product-detail-short-des-name">
                                                {product.name}
                                            </h1>
                                        </ListGroup.Item>

                                        <ListGroup.Item className='py-3'>

                                            <p className="product-detail-short-des-english-name text-muted text-start">{product.english_name}</p>
                                        </ListGroup.Item>

                                        <ListGroup.Item className='py-3'>


                                            <p className="">برند: {product.brand.englishName}</p>
                                        </ListGroup.Item>
                                        <ListGroup.Item className='py-3'>

                                            <p className="">رنگ:  <span className="product-color-circle ms-1" style={{ 'backgroundColor': `${productColor}` }}></span>
                                                {product.color.persianName}
                                            </p>
                                        </ListGroup.Item>

                                        <ListGroup.Item className='py-3'>
                                            <p className="product-detail-rating">
                                                <i className=
                                                    'fa-solid fa-star'></i>{" "}
                                                {toFarsiNumber(Number(product.rating))}
                                                {" "}
                                                <span className="text-muted">
                                                    از
                                                </span>
                                                <span className="text-muted">
                                                    {" "}({toFarsiNumber(Number(product.numReviews))})
                                                </span>
                                            </p>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <p className="">ویژگی های محصول: </p>
                                            <p className="product-short-description pt-2">{product.shortDescription} </p>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </div>
                            </div>
                            <div className='mobile-container col-md-3 p-md-0 d-block d-md-none'>
                                <div className="container-box-shadow position-sticky "
                                    style={IncreaseTop ? { 'top': '140px' } : { 'top': '100px' }} >
                                    <ListGroup variant='flush' className="product-detail-cart-container p-2">
                                        {product.countInStock > 0 &&
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>قیمت:</Col>
                                                    <Col className="text-end">

                                                        <h3><strong>{Intl.NumberFormat('fa-IR').format(product.price)}</strong> <span
                                                            className='price-toman'>تومان</span></h3>

                                                    </Col>

                                                </Row>
                                            </ListGroup.Item>
                                        }
                                        <ListGroup.Item className="mt-2">
                                            <Row>
                                                <Col>وضعیت کالا در انبار:</Col>
                                                <Col className="text-end">
                                                    {product.countInStock > 0 ? 'موجود' : 'ناموجود'}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        {product.countInStock > 0 && (
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col className="d-flex align-items-center">تعداد</Col>
                                                    <Col className='my-1'>
                                                        <Form.Control
                                                            as="select"
                                                            value={qty}
                                                            onChange={(e) => setQty(e.target.value)}
                                                        >
                                                            {
                                                                [...Array(maxSale).keys()].map((x) => (
                                                                    <option key={x + 1} value={x + 1}>
                                                                        {x + 1}
                                                                    </option>
                                                                ))
                                                            }
                                                        </Form.Control>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )}


                                        <ListGroup.Item className="mx-auto mt-auto">
                                            {
                                                isItemInCart ?
                                                    <Button
                                                        onClick={addToCartHandler}

                                                        className='btn-block btn btn-success in-your-cart-btn'
                                                        type='button'
                                                    // disabled
                                                    >
                                                        در سبد خرید شما
                                                    </Button> :
                                                    addToCartLoading ?
                                                        <Button
                                                            className='btn-block'
                                                            type='button'>
                                                            در حال افزودن
                                                        </Button>
                                                        :
                                                        <Button
                                                            onClick={addToCartHandler}
                                                            className='btn-block'
                                                            disabled={product.countInStock == 0}
                                                            type='button'>
                                                            افزودن به سبد خرید
                                                        </Button>
                                            }
                                        </ListGroup.Item>
                                    </ListGroup>
                                </div>
                            </div>
                            <div className="mobile-container pe-md-0 col mt-3">
                                <Box className={'container-box-shadow'} sx={{ bgcolor: 'background.paper' }}>
                                    <AppBar position="static">
                                        <Tabs
                                            value={value}
                                            onChange={handleChange}
                                            indicatorColor="secondary"
                                            textColor="inherit"
                                            variant="flush"
                                        >
                                            <Tab label="مشخصات محصول" {...a11yProps(0)} />
                                            <Tab label="دیدگاه ها" {...a11yProps(1)} />
                                        </Tabs>
                                    </AppBar>
                                    <SwipeableViews
                                        axis={theme.direction === 'ltr' ? 'x-reverse' : 'x'}
                                        index={value}
                                        onChangeIndex={handleChangeIndex}
                                    >
                                        <TabPanel value={value} index={0} dir={'rtl'}>
                                            <div className="product-short-description">
                                                {product.description}
                                            </div>
                                        </TabPanel>
                                        <TabPanel value={value} index={1} dir={'rtl'}>
                                            {product.reviews.length === 0 && <Message variant='info'>بدون دیدگاه</Message>}
                                            <ListGroup variant='flush'>
                                                {product.reviews.map((review) => (
                                                    <ListGroup.Item key={review.id}>
                                                        <strong>{review.name}</strong>
                                                        <RatingReadOnly value={review.rating} />
                                                        {/* <p>{toFarsiNumber(review.rating)}</p> */}
                                                        <p>{new Date(review.createdAt).toLocaleDateString('fa-IR')}</p>
                                                        <p>{review.comment}</p>
                                                    </ListGroup.Item>
                                                ))}

                                                <ListGroup.Item className="mt-4">
                                                    <h4>افزودن دیدگاه</h4>

                                                    {loadingProductReview && <PreLoader />}
                                                    {successProductReview && <Message variant='success'>دیدگاه شما ثبت شد</Message>}
                                                    {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}

                                                    {userInfo ? (
                                                        <Form onSubmit={submitHandler} className="my-4">
                                                            <Form.Group controlId='rating' className="my-4">
                                                                <Form.Label>امتیاز</Form.Label>
                                                                <Form.Control
                                                                    as='select'
                                                                    value={rating}
                                                                    onChange={(e) => setRating(e.target.value)}
                                                                >
                                                                    <option value=''>...انتخاب</option>
                                                                    <option value='1'>۱ - بسیار ضعیف</option>
                                                                    <option value='2'>۲ - ضعیف</option>
                                                                    <option value='3'>۳ - معمولی</option>
                                                                    <option value='4'>۴ - مطلوب</option>
                                                                    <option value='5'>۵ - بسیار مطلوب</option>
                                                                </Form.Control>
                                                            </Form.Group>

                                                            <Form.Group controlId='comment'>
                                                                <Form.Label>دیدگاه شما</Form.Label>
                                                                <Form.Control
                                                                    as='textarea'
                                                                    row='5'
                                                                    value={comment}
                                                                    onChange={(e) => setComment(e.target.value)}
                                                                ></Form.Control>
                                                            </Form.Group>

                                                            <div style={{ 'height': '50px' }} className="mx-auto text-start">
                                                                <Button
                                                                    disabled={loadingProductReview}
                                                                    type='submit'
                                                                    variant='primary'
                                                                    className="mt-4 "
                                                                >
                                                                    تایید
                                                                </Button>
                                                            </div>

                                                        </Form>
                                                    ) : (
                                                        <Message variant='info'>برای ثبت دیدگاه خود لطفا <Link onClick={() => window.scrollTo(0, 0)} to='/user/login'>وارد</Link> شوید.</Message>
                                                    )}
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </TabPanel>

                                    </SwipeableViews>
                                </Box>

                            </div>
                        </div>
                    </div>
                    <div className='mobile-container col-md-3 p-0 d-none d-md-block'>
                        <div className="container-box-shadow position-sticky "
                            style={IncreaseTop ? { 'top': '140px' } : { 'top': '100px' }} >
                            <ListGroup variant='flush' className="product-detail-cart-container p-2">
                                {product.countInStock > 0 &&
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>قیمت:</Col>
                                            <Col className="text-end">

                                                <h3><strong>{Intl.NumberFormat('fa-IR').format(product.price)}</strong> <span
                                                    className='price-toman'>تومان</span></h3>

                                            </Col>

                                        </Row>
                                    </ListGroup.Item>
                                }
                                <ListGroup.Item className="mt-2">
                                    <Row>
                                        <Col>وضعیت کالا در انبار:</Col>
                                        <Col className="text-end">
                                            {product.countInStock > 0 ? 'موجود' : 'ناموجود'}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                {product.countInStock > 0 && (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col className="d-flex align-items-center">تعداد</Col>
                                            <Col className='my-1'>
                                                <Form.Control
                                                    as="select"
                                                    value={qty}
                                                    onChange={(e) => setQty(e.target.value)}
                                                >
                                                    {
                                                        [...Array(maxSale).keys()].map((x) => (
                                                            <option key={x + 1} value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        ))
                                                    }
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}


                                <ListGroup.Item className="mx-auto mt-auto">
                                    {
                                        isItemInCart ?
                                            <Button
                                                onClick={addToCartHandler}

                                                className='btn-block btn btn-success in-your-cart-btn'
                                                type='button'
                                            // disabled
                                            >
                                                در سبد خرید شما
                                            </Button> :
                                            addToCartLoading ?
                                                <Button
                                                    className='btn-block'
                                                    type='button'>
                                                    در حال افزودن
                                                </Button>
                                                :
                                                <Button
                                                    onClick={addToCartHandler}
                                                    className='btn-block'
                                                    disabled={product.countInStock == 0}
                                                    type='button'>
                                                    افزودن به سبد خرید
                                                </Button>
                                    }
                                </ListGroup.Item>
                            </ListGroup>
                        </div>
                    </div>
                </div>
                <Row>
                    <div className="col p-md-0 mobile-container mt-3">
                        <div className="container-box-shadow p-2">
                            <div className='d-flex pt-2'>
                                <h4>کالاهای مشابه</h4>
                            </div>
                            <ProductSliderList title={'محصولات برتر'} sliderState={listProductsLastVar} func={listProductsLast()} color={'white'} bg_color={"#fff"} />
                        </div>
                    </div>
                </Row>
            </div >

        </>
    )
}

export default ProductDetail