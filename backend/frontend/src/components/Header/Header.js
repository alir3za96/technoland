// import React from 'react'
// import { Button, Form, NavDropdown, NavItem, NavLink } from 'react-bootstrap';
// import { FiUser, FiShoppingCart } from "react-icons/fi";
// import { TbSearch } from "react-icons/tb";
// import { useSelector, useDispatch } from 'react-redux';
// import { Link, useSearchParams } from 'react-router-dom'
// import products from '../Products/ProductsData'
// import { LinkContainer } from 'react-router-bootstrap'
// import { logout } from '../../actions/userActions';


// const Header = () => {
//   const dispatch = useDispatch()
//   const userLogin = useSelector(state => state.userLogin)
//   const { userInfo } = userLogin
//   const [searchProduct, setSearchProduct] = useSearchParams();
//   let searchValue = searchProduct.get('filter');


//   const logoutHandler = () => {
//     dispatch(logout())
//   }
//   const cart = useSelector(state => state.cart)
//   const { cartItems } = cart

//   return (
//     <>
//       {/* <div className='top-header d-block'>
//         <span> پشتیابانی فوری واتساپ ۰۹۹۲۶۹۵۲۴۱۸</span>
//       </div> */}
//       <header id="site-header">

//         <div id="site-header-container" className='container-fluid'>


//           <div id="site-header-logo">
//             <Link to={'/'}><img src="/images/Technoland.jpg" alt="Technoland" /></Link>
//           </div>

//           <div id="site-header-search">
//             <div id="site-header-search-container">
//               <Form>
//                 <Form.Control
//                   as='text'
//                   autoComplete="off"
//                   value={searchValue || ""}
//                   onChange={event => {
//                     let filter = event.target.value;
//                     if (filter) {
//                       setSearchProduct({ filter })

//                     } else {
//                       setSearchProduct({});
//                     }
//                   }}
//                   id="search" name="search" type="text" placeholder="جستجوی محصولات..." />
//                 <Button id="search_submit" type="submit" />
//               </Form>
//               <i className="icon-search"></i>
//               <i id='search-icon'><TbSearch /></i>
//               <div className='show-search-content container-box-shadow'>
//                 {/* TODO: نمایش هیج درصورت نبود محصول */}

//                 {searchValue ?
//                   <>
//                     {products.filter((product) => {
//                       let name = product.name.toLowerCase();
//                       if (!searchValue) return true;
//                       else return name.startsWith(searchValue.toLowerCase());
//                     })
//                       .map((product) => (
//                         <div>
//                           <p>
//                             {product.name}
//                           </p>
//                           {/* TODO:fix image size */}
//                           <img src={`${product.image}/${product.englishName}.jpg`} />
//                         </div>
//                       ))
//                     }
//                   </>
//                   :
//                   <p>مقدار را وارد کنید</p>
//                 }
//               </div>
//             </div>
//             <div></div>
//           </div>

//           <div id="site-header-auth-container">
//             <button id="site-header-login-button" className="btn btn-secondary site-header-auth-button d-sm-none"><TbSearch /><span>جستوجوی محصولات</span></button>
//             {/* {userInfo && userInfo.is_staff && (
//               <button id="site-header-login-button" className="btn btn-secondary site-header-auth-button">
//                 <Link to='/admin'><FiUser /></Link>
//                 <span>
//                   <Link to='admin'>
//                     <div className='d-inline-block me-2' >
//                       ادمین
//                     </div>
//                   </Link>
//                   <NavDropdown className='d-inline-block ' dir='ltr' id='username'>
//                     <LinkContainer to='/admin/user/list'>
//                       <NavDropdown.Item>Users</NavDropdown.Item>
//                     </LinkContainer>

//                     <LinkContainer to='/admin/product/list'>
//                       <NavDropdown.Item>Products</NavDropdown.Item>
//                     </LinkContainer>

//                     <LinkContainer to='/admin/order/list'>
//                       <NavDropdown.Item>Orders</NavDropdown.Item>
//                     </LinkContainer>
//                   </NavDropdown>
//                 </span>
//               </button>
//             )} */}
//             <button id="site-header-login-button" className="btn btn-secondary site-header-auth-button d-sm-none"><TbSearch /><span>جستوجوی محصولات</span></button>
//             {userInfo ? (
//               <button id="site-header-login-button" className="btn btn-secondary site-header-auth-button">
//                 <Link to='/user/profile'><FiUser /></Link>
//                 <span>
//                   <Link to='/user/profile'>
//                     <div className='d-inline-block me-2' >
//                       {userInfo.username}
//                     </div>
//                   </Link>
//                   <NavDropdown className='d-inline-block ' dir='ltr' id='username'>
//                     <LinkContainer to='/user/profile'>
//                       <NavDropdown.Item>پروفایل</NavDropdown.Item>
//                     </LinkContainer>
//                     <NavDropdown.Item onClick={logoutHandler}>خروج</NavDropdown.Item>
//                   </NavDropdown>
//                 </span>
//               </button>
//             ) : (
//               <Link to={'user/login'}><button id="site-header-login-button" className="btn btn-secondary site-header-auth-button"><FiUser /><span className='ps-sm-3'> ورود | ثبت نام</span></button></Link>
//             )}
//             <Link to={'cart'}><button id="site-header-registration-button" className="btn btn-secondary site-header-auth-button">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<FiShoppingCart /><span> سبد خرید</span>
//               {cartItems.reduce((acc, item) => Number(acc) + Number(item.qty), 0) > 0 ?
//                 <span className='number-of-cart'>
//                   {
//                     cartItems.reduce((acc, item) => Number(acc) + Number(item.qty), 0) > 0 && cartItems.reduce((acc, item) => Number(acc) + Number(item.qty), 0)
//                   }
//                 </span> : <></>
//               }
//             </button></Link>

//           </div>

//         </div>
//         <input type="checkbox" className="toggleSideMenu" id="toggleSideMenu" autoComplete="off" />
//         <label htmlFor="toggleSideMenu" className="hamburger-icon">
//           <div className="hamburger-menu-line diagonal-1"></div>
//           <div className="hamburger-menu-line horizontal"></div>
//           <div className="hamburger-menu-line diagonal-2"></div>
//         </label>

//         <div id="side-menu-container" className='container-fluid'>
//           <div id="before-side-menu">
//             <span>دسته بندی ها</span>
//           </div>
//           <nav id="top-menu">
//             <ul id="main-menu" >
//               <li className="main-menu-item"><a href="#">موبایل{" "}</a></li>
//               <li className='main-menu-item'><a href='#'>کامپیوتر{" "}</a></li>
//               <li className='main-menu-item'><a href='#'>لپ تاپ و تبلت{" "}</a></li>
//               <li className='main-menu-item'><a href='#'>ماشین‌های اداری{" "}</a></li>
//               <li className='main-menu-item'><a href='#'>پردازنده{" "}</a></li>
//               <li className='main-menu-item'><Link to='/products'>محصولات{" "}</Link></li>
//             </ul>

//             <ul className='main-menu-left'>
//               <li className="main-menu-item"><Link to="/about-us">درباره ما{" "}</Link></li>
//               <li className='main-menu-item'><Link to='/contact-us'>تماس با ما{" "}</Link></li>
//             </ul>
//           </nav>

//           <div id="after-side-menu">
//             <span>شبکه های اجتماعی</span>
//             <div className="social-buttons">
//               <i className="fa fa-instagram"></i>
//               <i className="fa fa-whatsapp"></i>
//               <i className="fa fa-telegram"></i>
//             </div>
//           </div>


//         </div>


//       </header>



//     </>
//   )
// }

// export default Header