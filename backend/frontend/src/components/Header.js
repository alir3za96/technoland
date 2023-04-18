import Offcanvas from 'react-bootstrap/Offcanvas';
import 'react-toastify/dist/ReactToastify.css';

import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Navbar, Nav, Form, Container, Col, Row, NavDropdown, Button, ListGroup} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import SearchBox from './SearchBox'
import {logout} from '../actions/userActions'
import {useLocation} from 'react-router-dom'
import {listProducts, listProductsSearch} from '../actions/productActions'
import {Link} from 'react-router-dom'
import Category from './Category';
import Message from './Message';
import {debounce} from '../helpers/debounce';
import {ToastContainer} from 'react-toastify';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import {removeFromCart} from "../actions/cartActions";

function OffcanvasExample() {
    const [show, setShow] = useState(false);
    const [activeMessage, setActiveMessage] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [secondNav, setSecondNav] = useState(true)
    const [scrollValue, setScrollValue] = useState(0)

    // const [secondNav, setSecondNav] = useState(true)
    // const [scrollValue, setScrollValue] = useState(0);

    const slideDownNavHandler = debounce(() => {
        const currentScrollPos = window.pageYOffset;
        setSecondNav((scrollValue > currentScrollPos && scrollValue - currentScrollPos > 50) || currentScrollPos < 10);
        setScrollValue(currentScrollPos);
    }, 100);

    useEffect(() => {
        window.addEventListener('scroll', slideDownNavHandler);

        return () => window.removeEventListener('scroll', slideDownNavHandler);

    }, [scrollValue, secondNav, slideDownNavHandler]);
    // const slideDownNavHandler = () => {
    // console.log(window.scrollY,scrollValue)
    // console.log(scrollValue, window.scrollY)
    // setScrollValue(window.scrollY * 100)
    // if (window.scrollY * 100 >= scrollValue && scrollValue >= 15){
    //   setSecondNav(false)
    // } else {
    //   setSecondNav(true)
    // }
    //   if (typeof window !== 'undefined') {
    //     if (window.scrollY > setScrollValue) { // if scroll down hide the navbar
    //       secondNav(false);
    //     } else { // if scroll up show the navbar
    //       secondNav(true);
    //     }
    // }
    // }

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart

    const compareProducts = useSelector(state => state.addProductsCompare)
    const {success: ComSuccess, error: ComError, message: ComMessage, remove: ComRemove} = compareProducts
    const favoriteProducts = useSelector(state => state.addProductsFavorite)
    const {success: FavSuccess, error: FavError, message: FavMessage, remove: FavRemove} = favoriteProducts

    const dispatch = useDispatch()

    // const closeMessage = () => {
    //   if (success) {
    //     setInterval(() => {
    //       console.log('This will run every second!');
    //     }, 1000);
    //   }
    // }
    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    // const [messagesList, setMessagesList] = useState({ success: '', error: '', message: '', remove: '' })
    useEffect(() => {
        // setMessagesList()
        console.log()
        if (ComSuccess || FavSuccess || ComRemove || FavRemove) {
            setActiveMessage(true)
            const interval = setTimeout(() => {
                setActiveMessage(false)
            }, 4000);
        }
    }, [ComSuccess, FavSuccess, ComRemove, FavRemove]);

    let keyword = useLocation().search;
    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <>
            {['lg'].map((expand) => (

                <Navbar key={expand} bg="light" onScroll={'false'} collapseOnSelect expand={expand}
                        className={secondNav ? 'mb-3 px-2 px-xl-0 my-nav' : 'mb-3 my-nav single-mode'}>
                    <Container fluid className='mb-auto'>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`}/>
                        <Navbar.Brand>
                            <div className="site-header-logo">
                                <Link to={'/'}><img src="/static/images/Technoland.jpg" alt="Technoland"/></Link>
                            </div>
                        </Navbar.Brand>
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    Offcanvas
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <SearchBox/>

                                <Nav className="justify-content-end flex-grow-1 pe-3">
                                    {userInfo ? (
                                        <NavDropdown title={userInfo.name}
                                                     id={`offcanvasNavbarDropdown-expand-${expand}`}>
                                            <LinkContainer to='/user/dashboard' onClick={()=>window.scroll(0,0)}>
                                                <NavDropdown.Item>پروفایل</NavDropdown.Item>
                                            </LinkContainer>

                                            <NavDropdown.Item onClick={logoutHandler}>خروج</NavDropdown.Item>
                                        </NavDropdown>
                                    ) : (
                                        <LinkContainer to='/user/login' onClick={()=>window.scroll(0,0)}>
                                            <Nav.Link><i className="fas fa-user"></i> حساب کاربری </Nav.Link>
                                        </LinkContainer>
                                    )}
                                    <LinkContainer className='ms-3 d-none d-lg-block' to='#'>
                                        <Nav.Link onClick={handleShow} className='position-relative'><i
                                            className="fas fa-shopping-cart "></i> سبد خرید
                                            {cartItems.reduce((acc, item) => Number(acc) + Number(item.qty), 0) > 0 &&
                                            <span className='number-of-cart'>
                          {
                              cartItems.reduce((acc, item) => Number(acc) + Number(item.qty), 0) > 0 && cartItems.reduce((acc, item) => Number(acc) + Number(item.qty), 0)
                          }
                        </span>

                                            }
                                        </Nav.Link>

                                    </LinkContainer>
                                    <LinkContainer className='ms-3 d-block d-lg-none' to='/cart'>
                                        <Nav.Link className='position-relative'><i
                                            className="fas fa-shopping-cart "></i> سبد خرید
                                            {cartItems.reduce((acc, item) => Number(acc) + Number(item.qty), 0) > 0 &&
                                            <span className='number-of-cart'>
                          {
                              cartItems.reduce((acc, item) => Number(acc) + Number(item.qty), 0) > 0 && cartItems.reduce((acc, item) => Number(acc) + Number(item.qty), 0)
                          }
                        </span>

                                            }
                                        </Nav.Link>

                                    </LinkContainer>


                                </Nav>


                            </Offcanvas.Body>


                        </Navbar.Offcanvas>
                    </Container>
                    <Container fluid className='position-relative'>
                        <Nav className={secondNav ? 'second-nav active' : 'second-nav'} onScroll={slideDownNavHandler}>
                            <LinkContainer className='mx-1' to='/user/login'>
                                <Category/>
                            </LinkContainer>
                            
                            <LinkContainer className='mx-1' to='/products?cat=products'>
                                <Nav.Link><i class="fas fa-shopping-bag ps-1"></i>محصولات</Nav.Link>
                            </LinkContainer>
                            
                            <LinkContainer className='mx-1' to='/products?cat=most-sellers'>
                                <Nav.Link><i className="fas fa-fire ps-1"></i>پر‌فروش ترین‌ها</Nav.Link>
                            </LinkContainer>
                            <LinkContainer className='mx-1' to='/products?cat=special-offer'>
                                <Nav.Link><i className="fas fa-percentage ps-1"></i>شگفت‌انگیز‌ها</Nav.Link>
                            </LinkContainer>
                            <LinkContainer className='mx-1' to='/'>
                                <Nav.Link><i className="fas fa-headset ps-1"></i>تماس با‌ما</Nav.Link>
                            </LinkContainer>


                        </Nav>
                        {/* {ComSuccess && <Message className={`${activeMessage ? 'active-message' : ''}`} variant={`${ComRemove ? 'primary' : 'success'}`}>
              {ComMessage}
            </Message>}
            {ComError && <Message className={`${activeMessage ? 'active-message' : ''}`} variant='danger'>
              {ComError}
            </Message>}
            {FavSuccess && <Message className={`${activeMessage ? 'active-message' : ''}`} variant={`${FavError ? 'primary' : 'success'}`}>
              {FavMessage}
            </Message>}
            {FavError && <Message className={`${activeMessage ? 'active-message' : ''}`} variant='danger'>
              {FavError}
            </Message>} */}
                        <ToastContainer/>

                    </Container>
                </Navbar>

            ))}

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className='mt-3 me-5'>سبد خرید</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ListGroup className='cart-list-group' variant='flush'>
                        {cartItems.map(item => (
                            <ListGroup.Item className='cart-list-group-items d-flex my-1 container-box-shadow row'>
                                <div className='cart-slider-product d-flex col-7'>
                                    <Link onClick={handleClose} to={`/products/${item.product}`}>
                                        <img className='cart-product-image' src={item.image} alt={item.name}/>
                                    </Link>
                                    <Link onClick={handleClose} className={'h-50 overflow-hidden my-auto pe-2'} to={`/products/${item.product}`}>
                                        <p className='my-auto '> {item.name}</p>
                                    </Link>
                                </div>
                                <div className='d-flex col-4'>
                                    <p className='m-auto'> تعداد: <span className={'count-num'}>X</span>
                                        {Intl.NumberFormat('fa-IR').format(item.qty)}
                                    </p>
                                    <p className='m-auto'> قیمت:
                                        {Intl.NumberFormat('fa-IR').format(item.price)}
                                    </p>
                                </div >
                                <div className='col-1 my-auto'>
                                    <DeleteRoundedIcon onClick={() => removeFromCartHandler(item.product)} className={'cart-sidebar-delete-icon'}/>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    <h1 className='h'></h1>
                    <ListGroup className='cart-list-group container-box-shadow' variant='flush'>
                        <ListGroup.Item>
                            <div className='total-cart-slider d-flex justify-content-between '>
                                <p>
                                    جمع سفارش:
                                </p>
                                <p>
                                    قیمت:
                                    {Intl.NumberFormat('fa-IR').format(cartItems.reduce((acc, item) => acc + item.qty * item.price, 0))}

                                </p>
                            </div>
                        </ListGroup.Item>
                        <div className='my-4 d-flex justify-content-around'>

                            <Link onClick={handleClose} to={'/cart'}>
                                <Button calssName='btn-success'>نهایی کردن سفارش</Button>
                            </Link>
                            <Link onClick={handleClose} to={'/'}>
                                <Button>ادامه خرید</Button>
                            </Link>
                        </div>
                    </ListGroup>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default OffcanvasExample;