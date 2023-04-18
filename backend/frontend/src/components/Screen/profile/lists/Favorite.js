import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Table, ListGroup } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { PreLoader } from '../../../PreLoader/PreLoader'
import Message from '../../../Message'
import { getUserDetails, updateUserProfile } from '../../../../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../../../../constants/userConstants'
import { listMyOrders } from '../../../../actions/orderActions'
import toFarsiNumber from '../../../../utils/PersianNum'
import ProfileMenu from '../ProfileMenu'
import { listProducts, listProductsLast, listProductsTop } from '../../../../actions/productActions';
import ProductSliderList from '../../../Products/ProductSliderList'
import Product from '../../../Products/Product'
import Paginate from '../../../Paginate'
import ProductsPlaceholder from '../../../Products/ProductsPlaceholder'
import { listByUserProducts } from '../../../../actions/productListActions'

function Favorite() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const orderListMy = useSelector(state => state.orderListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

    const listProductsByUser = useSelector(state => state.listProductsByUser)
    const { favorite_products, loading:loadingProducts, page, pages } = listProductsByUser

    const num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    const url = useLocation().search.replace('keyword=undefined&', '')
    const keyword = `?${useLocation().search.split('?')[1]}`

    const history = useNavigate();
    useEffect(() => {
        if (!userInfo) {
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

    }, [dispatch, userInfo, user, success])

    useEffect(() => {
        dispatch(listByUserProducts())
    }, [dispatch, keyword])
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

    const listProductsLastVar = useSelector(state => state.listProductsLast)

    return (
        <>
        <div className='container-box-shadow w-100 text-center mb-4 mx-auto pt-3 p-2'>
            <h2>علاقه‌مندی‌ها</h2>
        </div>

        <div className='row mt-4'>

            {/* todo: multi list create in backend and redux in front like products */}
            {loadingProducts ?
                (num.map(i => (
                    <div key={i} className='product-box-container col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-4'>
                        <ProductsPlaceholder />
                    </div>
                )))
                :
                error ?
                    <Message text={error} variant='danger' />
                    :
                    favorite_products.map((item) => (
                        <div key={item.product._id} className='product-box-container col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-4'>
                            <Product product={item.product} bg_color={'#3b2c35'} color={'#fff'} />
                        </div>
                    ))

            }

        </div>
        <Paginate page={page} pages={pages} />
    </>
    )
}

export default Favorite;