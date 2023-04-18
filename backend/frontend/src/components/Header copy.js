import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, Row, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'
import { useLocation } from 'react-router-dom'
import { listProducts, listProductsSearch } from '../actions/productActions'
import { Link } from 'react-router-dom'

function Header() {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    const dispatch = useDispatch()
    // const location = useLocation()
    
    let keyword = useLocation().search;
    // const searchParams = use
    const logoutHandler = () => {
        dispatch(logout())
    }


    // useEffect(() => {
    //     dispatch(listProducts(keyword))
    // }, [dispatch, keyword]);

    return (
        <header >
            <Navbar dir='rtl' bg="light" variant="light" expand="lg" collapseOnSelect>
                <Container >
                    <LinkContainer to='/'>
                        <Navbar.Brand>
                            <div className="site-header-logo">
                                <Link to={'/'}><img src="/images/Technoland.jpg" alt="Technoland" /></Link>
                            </div>
                        </Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <SearchBox />
                        <Nav className="ml-auto position-relative">
                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/user/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>

                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to='/user/login'>
                                    <Nav.Link><i className="fas fa-user"></i>Login</Nav.Link>
                                </LinkContainer>
                            )}
                            <LinkContainer className={'ms-3'} to='/cart'>
                                <Nav.Link className='position-relative'><i className="fas fa-shopping-cart "></i> سبد خرید
                                {cartItems.reduce((acc, item) => Number(acc) + Number(item.qty), 0) > 0 &&
                                <span className='number-of-cart'>
                                {
                                    cartItems.reduce((acc, item) => Number(acc) + Number(item.qty), 0) > 0 && cartItems.reduce((acc, item) => Number(acc) + Number(item.qty), 0)
                                }
                                </span>

                                    }
                                </Nav.Link>
                                
                            </LinkContainer>
                            
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id='adminmenue'>
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/productlist'>
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>

                                </NavDropdown>
                            )}
                            
                        </Nav>
                    </Navbar.Collapse>
                  
                </Container>
                    
            </Navbar>
        </header>
    )
}

export default Header
