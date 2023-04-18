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

function Profile() {
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
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-3 container-box-shadow p-0 profile-menu-container' style={IncreaseTop ? { 'top': '140px' } : { 'top': '100px' }}>
                    <ProfileMenu />
                </div>
                <div className='col-md-9 ps-md-0 profile-content-container mt-4 mt-md-0'>
                    <Outlet/>
                    
                </div>
            </div>
        </div>
    )
}

export default Profile;