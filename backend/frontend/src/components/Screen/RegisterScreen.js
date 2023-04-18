import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { PreLoader } from '../PreLoader/PreLoader'
import Message from '../Message'
import FormContainer from '../FormContainer'
import { register } from '../../actions/userActions'

function RegisterScreen() {
    const location = useLocation();
    const history = useNavigate();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()
    const redirect = location.search ? location.search.split('=')[1] : '/'


    const userRegister = useSelector(state => state.userRegister)
    const { error, loading, userInfo } = userRegister

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo: isLogin } = userLogin

    useEffect(() => {
        if (userInfo || isLogin) {
            history(redirect)
        }
    }, [history, userInfo, isLogin, redirect])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage('گذرواژه یکسان نیست')
        } else {
            dispatch(register(username, password))
            setMessage('')

        }
    }
    return (
        <FormContainer>
            <h1 className='text-center'>ثبت نام</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <PreLoader />}
            <Form onSubmit={submitHandler}>


                <Form.Group controlId='username' className='my-3'>
                    <Form.Label>نام کاربری</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='نام کاربری خود را وارد کنید'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>


                <Form.Group controlId='password' className='my-3'>
                    <Form.Label>گذرواژه</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='گذرواژه خود را وارد کنید'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='confirm-password' className='my-3'>
                    <Form.Label>تکرار گذرواژه</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='تکرار گذرواژه خود را وارد کنید'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <div className='' style={{height:'75px'}} >
                <Button type='submit' className='px-3' variant='primary'>
                    ثبت نام
                </Button>
                </div>
            </Form>
            <Row className='py-3'>
                <Col>
                    قبلا ثبت نام کرده اید؟ <Link
                        to={redirect ? `/user/login?redirect=${redirect}` : '/user/login'}>
                        ورود
                    </Link>
                </Col>
            </Row>


        </FormContainer>

    )
}

export default RegisterScreen