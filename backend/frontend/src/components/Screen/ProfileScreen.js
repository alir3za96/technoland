import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Table, ListGroup } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { PreLoader } from '../PreLoader/PreLoader'
import Message from '../../components/Message'
import { getUserDetails, logout, updateUserProfile } from '../../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../../constants/userConstants'
import { listMyOrders } from '../../actions/orderActions'
import toFarsiNumber from '../../utils/PersianNum'
import ProfileMenu from './profile/ProfileMenu'

function ProfileScreen() {
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
    const { loading:loadingOrders, error:errorOrders, orders } = orderListMy



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
    }, [dispatch, history, userInfo, user, success])

    
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
    
    return (
        <div className='container-fluid'>
        <div className='row'>
            <div className='col-md-3 container-box-shadow py-3'>
                <ProfileMenu />
                {/* <h2>اطلاعات حساب کاربری</h2>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <PreLoader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='username' className='pb-3'>
                        <Form.Label>نام کاربری</Form.Label>
                        <Form.Control
                            required
                            type='username'
                            value={username}
                            placeholder='نام کاربری خود را وارد کنید'
                            onChange={(e) => setUsername(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email' className='pb-3'>
                        <Form.Label>ایمیل</Form.Label>
                        <Form.Control
                            required
                            type='email'
                            placeholder='ایمیل خود را وارد کنید'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='firstName' className='pb-3'>
                        <Form.Label>نام</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='نام خود را وارد کنید'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='lastName' className='pb-3'>
                        <Form.Label>نام خانوادگی</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='نام خانوادگی خود را وارد کنید'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password' className='pb-3'>
                        <Form.Label>گذرواژه</Form.Label>
                        <Form.Control

                            type='password'
                            placeholder='گذرواژه خود را وارد کنید'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='passwordConfirm' className='pb-3'>
                        <Form.Label>تکرار گذرواژه</Form.Label>
                        <Form.Control

                            type='password'
                            placeholder='گذرواژه خود را تکرار کنید'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary'>
                        Update
                    </Button>

                </Form> */}
            </div>

            <div className='col-md-9 ps-0'>
                <div className='container-box-shadow pt-3 p-2'>
                <h2>سفارشات من</h2>
                {loadingOrders ? (
                    <PreLoader />
                ) : errorOrders ? (
                    <Message variant='danger'>{errorOrders}</Message>
                ) : (
                            <Table striped responsive className='table-sm'>
                                <thead>
                                    <tr>
                                        <th>شناسه</th>
                                        <th>تاریخ ایجاد</th>
                                        <th>جمع</th>
                                        <th>پرداخت</th>
                                        <th>تحویل</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order._id}>
                                            <td>{toFarsiNumber(Number(order._id))}</td>
                                            <td>{new Date(order.createdAt).toLocaleDateString('fa-IR')}</td>
                                            <td>{Intl.NumberFormat('fa-IR').format(order.totalPrice)}<span className='price-toman'>تومان</span></td>
                                            <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                                                <i className='fas fa-times' style={{ color: 'red' }}></i>
                                            )}</td>
                                            <td>
                                                <LinkContainer to={`/order/${order._id}`}>
                                                    <Button className='btn-sm'>جزئیات</Button>
                                                </LinkContainer>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
            </div>
                </div>
        </div>
        </div>
    )
}

export default ProfileScreen;