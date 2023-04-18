import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { saveShippingAddress } from '../../actions/cartActions'
import FormContainer from '../../components/FormContainer'
import CheckoutSteps from '../../components/CheckoutSteps'

const ShippingScreen = () => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const dispatch = useDispatch()
    const history = useNavigate()

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        history('/order/payment')
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />

            <h4 className="my-4">جزئیات تحویل</h4>
            <Form onSubmit={submitHandler}>

                <Form.Group className='mb-3' controlId='city'>
                    <Form.Label>شهر</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter city'
                        value={city ? city : ''}
                        onChange={(e) => setCity(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group className='mb-3' controlId='address'>
                    <Form.Label>آدرس</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter address'
                        value={address ? address : ''}
                        onChange={(e) => setAddress(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>


                <Form.Group className='mb-3' controlId='postalCode'>
                    <Form.Label>کد پستی</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter postal code'
                        value={postalCode ? postalCode : ''}
                        onChange={(e) => setPostalCode(e.target.value)}
                    >
                    </Form.Control>
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

export default ShippingScreen