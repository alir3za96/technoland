import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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

function Messages() {
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
                <h2>پیام ها</h2>
            </div>
            <Message className={'w-50 text-center mx-auto'} variant='warning'>
                صندوق پیام خالی است !
            </Message>
            {/* <div className='container-box-shadow pt-3 p-2'>

            </div> */}
        </>
    )
}

export default Messages;