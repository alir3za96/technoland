import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { PreLoader } from '../PreLoader/PreLoader' 
import Message from '../Message' 
import FormContainer from '../FormContainer'
import { login } from '../../actions/userActions'

function LoginScreen() {
    const location = useLocation();
    const history = useNavigate();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    useEffect(() => {
        if (userInfo) {
            history(redirect)
            console.log('ok')

        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(username, password))
    }

    return (
        <FormContainer>
            <div className='authenticate-title'>
                <h1 className='text-center'>ورود به حساب کاربری</h1>
            </div>

            {error && <Message variant='danger'>{error}</Message>}
            {loading && <PreLoader />}
            <Form className='mt-5 '  onSubmit={submitHandler}>
                <Form.Group controlId='username' className='my-3'>
                    <Form.Label>نام کاربری</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='نام کاربری خود را وارد کنید'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    >
                    </Form.Control>
                </Form.Group>


                <Form.Group controlId='password' className='my-3'>
                    <Form.Label>گذرواژه</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='گذرواژه خود را وارد کنید'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    >
                    </Form.Control>
                </Form.Group>

                <div className='' style={{height:'75px'}} >
                <Button type='submit' className='px-4' variant='primary'>
                    ورود
                </Button>
                </div>
            </Form>

            <Row className='py-3'>
                <Col>
                    کاربر جدید هستید؟ <Link
                        to={redirect ? `/user/register?redirect=${redirect}` : '/user/register'}>
                        ثبت نام
                    </Link>
                </Col>
            </Row>

        </FormContainer>
    )
}

export default LoginScreen
