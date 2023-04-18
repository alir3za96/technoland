import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
import { listByUserProducts } from '../../../../actions/productListActions'

function Lists() {
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
    // const {favorite_products:products} = listProductsByUser

    const listProductsLastVar = useSelector(state => state.listProductsLast)
    // const products = useSelector(state => state.listFavoriteProducts)


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
            {console.log(listProductsByUser)}

        }

    }, [dispatch, history, userInfo, user, success])
    useEffect(() => {

        dispatch(listByUserProducts())

    }, [dispatch])


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
    

    return (
        <>
            <div className='container-box-shadow w-100 text-center mb-4 mx-auto pt-3 p-2'>
                <h2>لیست ها</h2>
            </div>
            <div className='container-box-shadow pt-3 p-2 mt-4'>
                {loadingOrders ? (
                    <PreLoader />
                ) :
                    (

                        <div>
                            <div className='d-flex justify-content-between'>
                                <h4>علاقه‌مندی‌ها</h4>
                                <LinkContainer to={`/user/lists/favorite`}>
                                    <span className='more-detail ms-5 text-muted'>مشاهده همه<i className='fas fa-angle-left more-detail-icon'></i></span>
                                </LinkContainer>
                                
                            </div>
                            <ProductSliderList  sliderState={listProductsByUser} func={listByUserProducts()} color={'white'} bg_color={"#fff"} />
                        </div>
                    )}
            </div>
            <div className='container-box-shadow pt-3 p-2 mt-4'>
                {loadingOrders ? (
                    <PreLoader />
                ) :
                    (

                        <div>
                            <div className='d-flex justify-content-between'>
                                <h4>بازدید‌های اخیر</h4>
                                <LinkContainer to={`/user/lists/`}>
                                    <span className='more-detail ms-5 text-muted'>مشاهده همه<i className='fas fa-angle-left more-detail-icon'></i></span>
                                </LinkContainer>
                            </div>
                            <ProductSliderList title={'محصولات برتر'} sliderState={listProductsLastVar} func={listProductsLast()} color={'white'} bg_color={"#fff"} />
                        </div>
                    )}
            </div>
            <div className='container-box-shadow pt-3 p-2 mt-4'>
                {loadingOrders ? (
                    <PreLoader />
                ) :
                    (
                        <>
                            <div className='d-flex justify-content-between'>
                                <h4>خرید‌های پر‌تکرار</h4>
                                <LinkContainer to={`/user/lists/`}>
                                    <span className='more-detail ms-5 text-muted'>مشاهده همه<i className='fas fa-angle-left more-detail-icon'></i></span>
                                </LinkContainer>
                            </div>
                            <ProductSliderList title={'محصولات برتر'} sliderState={listProductsLastVar} func={listProductsLast()} color={'white'} bg_color={"#fff"} />

                        </>
                    )}

            </div>
        </>
    )
}

export default Lists;