
import "bootswatch/dist/lumen/bootstrap.min.css";
import { Routes, Route } from 'react-router-dom'

import Home from './components/Screen/Home';
import CartScreen from './components/Screen/CartScreen';
import Footer from './components/Footer/Footer';
import Header from './components/Header';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import ProductDetail from "./components/Products/ProductDetail";
import Products from "./components/Products/Products";
import ProductsSearch from "./components/Products/ProductsSearch";
import CartTest from "./components/Screen/CartTest";
import LoginScreen from "./components/Screen/LoginScreen";
import RegisterScreen from "./components/Screen/RegisterScreen";
import ProfileScreen from "./components/Screen/ProfileScreen";
import ShippingScreen from "./components/Screen/ShippingScreen";
import PaymentScreen from "./components/Screen/PaymentScreen";
import PlaceOrderScreen from "./components/Screen/PlaceOrderScreen";
import OrderScreen from "./components/Screen/OrderScreen";
import UserListScreen from "./components/Screen/UserListScreen";
import UserEditScreen from "./components/Screen/UserEditScreen";
import ProductListScreen from "./components/Screen/ProductListScreen";
import Dashboard from "./components/Screen/profile/Dashboard";
import Addresses from "./components/Screen/profile/Addresses";
import ChangePass from "./components/Screen/profile/ChangePass";
import Comments from "./components/Screen/profile/Comments";
import Information from "./components/Screen/profile/Information";
import Lists from "./components/Screen/profile/lists/Lists";
import Messages from "./components/Screen/profile/Messages";
import Orders from "./components/Screen/profile/Orders";
import Favorite from "./components/Screen/profile/lists/Favorite";
import Profile from "./components/Screen/profile/Profile";
// import Product from "./components/Products/";

function App() {
  return <>
    <Header />
    <main className='py-1 px-xl-1'>
      <Routes>
        <Route path='/' exact element={<Home />} />

        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/contact-us' element={<ContactUs />} />

        <Route path='/products/' element={<Products color={'white'} bg_color={"#3b2c35"} />} />
        <Route path='/products/search/' element={<ProductsSearch color={'white'} bg_color={"#3b2c35"} />} />
        <Route path='/products/:productId' element={<ProductDetail />} />

        <Route path='/cart' element={<CartScreen />} />
        <Route path='/user/login' element={<LoginScreen />} />
        <Route path='/user/register' element={<RegisterScreen />} />
        <Route path='/user' element={<Profile />} >
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='orders' element={<Orders />} />
          <Route path='information' element={<Information />} />
          <Route path='lists' element={<Lists />} />
          <Route path='lists/favorite' element={<Favorite />} />
          <Route path='messages' element={<Messages />} />
          <Route path='orders' element={<Orders />} />
        </Route>

        <Route path='/user/addresses' element={<Addresses />} />
        <Route path='/user/password-change' element={<ChangePass />} />
        <Route path='/user/comments' element={<Comments />} />




        <Route path='/order/shipping' element={<ShippingScreen />} />
        <Route path='/order/payment' element={<PaymentScreen />} />
        <Route path='/order/place' element={<PlaceOrderScreen />} />
        <Route path='/order/:id' element={<OrderScreen />} />

        <Route path='/admin/user/list' element={<UserListScreen />} />
        <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
        {/* <Route path='/admin/product/list' element={<ProductListScreen />} /> */}


      </Routes>
    </main>
    <Footer />
    {/* <ProductSlider title={'فروش ویژه'} color={'white'} bg_color={"#ff6633"} /> */}
    {/* <ProductSlider title={'پیشنهاد ویژه'} color={'white'} bg_color={"#3b2c35"} /> */}
  </>;
}

export default App;
