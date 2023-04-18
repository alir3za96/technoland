import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function CheckoutSteps({ step1, step2, step3, step4 }) {

    return (
        <Nav className='justify-content-center mb-4'>
            <Nav.Item>
                {step1 ? (
                    <LinkContainer to='/user/login'>
                        {/* <button id="site-header-registration-button" className="btn btn-secondary site-header-auth-button"></button> */}
                        <Nav.Link>ورود به حساب</Nav.Link>
                    </LinkContainer>
                ) : (
                        <Nav.Link disabled>ورود به حساب</Nav.Link>
                    )}
            </Nav.Item>

            <Nav.Item>
                {step2 ? (
                    <LinkContainer to='/order/shipping'>
                        <Nav.Link>آدرس</Nav.Link>
                    </LinkContainer>
                ) : (
                        <Nav.Link disabled>آدرس</Nav.Link>
                    )}
            </Nav.Item>

            <Nav.Item>
                {step3 ? (
                    <LinkContainer to='/order/payment'>
                        <Nav.Link>پرداخت</Nav.Link>
                    </LinkContainer>
                ) : (
                        <Nav.Link disabled>پرداخت</Nav.Link>
                    )}
            </Nav.Item>

            <Nav.Item>
                {step4 ? (
                    <LinkContainer to='/placeorder'>
                        <Nav.Link>سفارش</Nav.Link>
                    </LinkContainer>
                ) : (
                        <Nav.Link disabled>سفارش</Nav.Link>
                    )}
            </Nav.Item>
        </Nav>
    )
}

export default CheckoutSteps
