import React, { useState, useEffect } from 'react'
import { Link, Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Table, ListGroup } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { PreLoader } from '../../PreLoader/PreLoader'
import Message from '../../../components/Message'
import { getUserDetails, updateUserProfile } from '../../../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../../../constants/userConstants'
import { listMyOrders } from '../../../actions/orderActions'
import toFarsiNumber from '../../../utils/PersianNum'
import ProfileMenu from './ProfileMenu'
import ProductSliderListPreView from "../../Products/ProductSliderListPreView";
import { listProductsLast } from '../../../actions/productActions';
import { debounce } from '../../../helpers/debounce'
import Information from './Information'

function Dashboard() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [orderMyCurrent, setOrderMyCurrent] = useState(0)
    const [orderMyDelivered, setOrderMyDelivered] = useState(0)
    const [orderMyCanceled, setOrderMyCanceled] = useState(0)
    const [message, setMessage] = useState('')
    const [IncreaseTop, setIncreaseTop] = React.useState(true);
    const [scrollValue, setScrollValue] = React.useState(0)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const orderListMy = useSelector(state => state.orderListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

    const listProductsLastVar = useSelector(state => state.listProductsLast)
    const products = useSelector(state => state.listFavoriteProducts)

    const slideDownNavHandler = debounce(() => {
        const currentScrollPos = window.pageYOffset;
        setIncreaseTop((scrollValue > currentScrollPos && scrollValue - currentScrollPos > 50) || currentScrollPos < 10);
        setScrollValue(currentScrollPos);
    }, 100);

    useEffect(() => {
        window.addEventListener('scroll', slideDownNavHandler);

        return () => window.removeEventListener('scroll', slideDownNavHandler);

    }, [scrollValue, IncreaseTop, slideDownNavHandler]);
    const history = useNavigate();

    useEffect(() => {
        if (!userInfo) {
            history('/user/login')
        } else {
            if (!user || !user.username || success || userInfo.id !== user.id) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            } else {
                setUsername(user.username)
                setEmail(user.email)
                setFirstName(user.first_name)
                setLastName(user.last_name)
            }
        }
        if (orders) {
            setOrderMyCurrent(orders.reduce((a, c) => c.isDelivered ? a : ++a, 0))
            setOrderMyDelivered(orders.reduce((a, c) => c.isDelivered ? ++a : a, 0))
            setOrderMyCanceled(orders.reduce((a, c) => c.isCanceled ? ++a : a, 0))
        } else {
            setOrderMyCurrent(0)
            setOrderMyDelivered(0)
            setOrderMyCanceled(0)
        }
    }, [dispatch, history, userInfo, user, success, orders])

    // console.log(order)
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        if (password != confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(updateUserProfile({
                'id': user.id,
                'username': username,
                'email': email,
                'first_name': firstName,
                'last_name': lastName,
                'password': password
            }))
            setMessage('')
        }
    }
    const profileMenuListGroupHandler = (event) => {
        navigate(`/user/${event.target.value}`)

    }
    // console.log(orders)
    return (
        <>
            <div className='container-box-shadow w-100 text-center mb-4 mx-auto pt-3 p-2'>
                <h2>داشبورد</h2>
            </div>
            <div className='container-box-shadow pt-3 p-2'>
                {loadingOrders ? (
                    <PreLoader />
                ) : (
                    <>
                        <div className='d-flex justify-content-between'>
                            <h4>سفارش های من</h4>
                            <LinkContainer to={`/user/orders`}>
                                <span className='more-detail ms-5 text-muted'>مشاهده همه<i
                                    className='fas fa-angle-left more-detail-icon'></i></span>
                            </LinkContainer>
                        </div>
                        <Table striped responsive className='table-sm mt-4'>
                            <thead>
                                <tr className='dashboard-head'>
                                    <th className='col-4'>
                                        <i class="fa-solid fa-hourglass-end px-1"></i>
                                        جاری
                                    </th>
                                    <th className='col-4'>
                                        <i class="fa-solid fa-square-check px-1"></i>
                                        تحویل شده
                                    </th>
                                    <th className='col-4'>
                                        <i class="fa-solid fa-rotate-left px-1"></i>
                                        مرجوع شده
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='dashboard-body'>
                                    <td className='col-4'>
                                        {toFarsiNumber(orderMyCurrent)}

                                    </td>
                                    <td className='col-4'>
                                        {toFarsiNumber(orderMyDelivered)}
                                    </td>
                                    <td className='col-4'>
                                        {toFarsiNumber(orderMyCanceled)}
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </>
                )}
            </div>
            <div className='container-box-shadow pt-3 p-2 mt-4'>
                <div className='d-flex justify-content-between'>
                    <h4>لیست های من</h4>
                    <LinkContainer to={`/user/lists`}>
                        <span className='more-detail ms-5 text-muted'>مشاهده همه<i
                            className='fas fa-angle-left more-detail-icon'></i></span>
                    </LinkContainer>
                </div>
                <div className={'row text-center'}>
                    <div className={'col-6'}>
                        <div>بازدید های اخیر</div>
                        <div className={'product-list-slider-preview-container'}>
                            <ProductSliderListPreView title={'محصولات برتر'} sliderState={listProductsLastVar}
                                func={listProductsLast()} color={'white'} bg_color={"#fff"} />

                        </div>
                    </div>
                    <div className={'col-6'}>
                        <div>خرید های پرتکرار</div>
                        <div className={'product-list-slider-preview-container'}>
                            <ProductSliderListPreView title={'محصولات برتر'} sliderState={listProductsLastVar}
                                func={listProductsLast()} color={'white'} bg_color={"#fff"} />

                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Dashboard;