import React, { useState, useEffect } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../../components/FormContainer'
import CheckoutSteps from '../../components/CheckoutSteps'
import { savePaymentMethod } from '../../actions/cartActions'
import { useNavigate } from 'react-router-dom'
import Message from '../Message'

function PaymentScreen() {
    const history = useNavigate()
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const dispatch = useDispatch()

    const [paymentMethod, setPaymentMethod] = useState('')
    if (!shippingAddress.address) {
        history('/shipping')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if (paymentMethod) {
            dispatch(savePaymentMethod(paymentMethod))
            history('/order/place')
            setMessage('')

        } else {
            setMessage('لطفا یک روش پرداخت انتخاب کنید.')
        }
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            {message && <Message variant='danger'>{message}</Message>}

            <Form name='paymentMethod' onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>انتخاب روش پرداخت</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='زرین پال'
                            id='zarinpal'
                            name='paymentMethod'

                            onChange={(e) => setPaymentMethod(e.target.id)}
                        >

                        </Form.Check>
                        <Form.Check
                            type='radio'
                            label='درگاه پرداخت 1'
                            id='paymentWay1'
                            name='paymentMethod'

                            onChange={(e) => setPaymentMethod(e.target.id)}
                        >

                        </Form.Check>
                        <Form.Check 
                            className='mb-3'
                            type='radio'
                            label='درگاه پرداخت 2'
                            id='paymentWay2'
                            name='paymentMethod'

                            onChange={(e) => setPaymentMethod(e.target.id)}
                        >

                        </Form.Check>
                    </Col>
                </Form.Group>
                <div style={{ 'height': '50px' }} className="mx-auto text-start">

                <Button type='submit' variant='primary'>
                    ادامه
                </Button>
                </div>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
