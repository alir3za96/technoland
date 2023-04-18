import React, { useState, useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import CheckoutSteps from '../../components/CheckoutSteps'
import { createOrder } from '../../actions/orderActions'
import { ORDER_CREATE_RESET } from '../../constants/orderConstants'
import toFarsiNumber from '../../utils/PersianNum'
import { debounce } from '../../helpers/debounce'

function PlaceOrderScreen() {

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, error, success } = orderCreate
    const [IncreaseTop, setIncreaseTop] = React.useState(true);
    const [scrollValue, setScrollValue] = React.useState(0)

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
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)

    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 10)

    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice))



    useEffect(() => {
        if (success) {
            history(`/order/${order._id}`)
            dispatch({ type: ORDER_CREATE_RESET })
        }
        if (!cart.paymentMethod) {
            history('/order/payment')
        }
    }, [success, cart])

    const placeOrder = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            totalPrice: cart.totalPrice,
        }))
    }
    console.log(cart.paymentMethod)

    return (
        <div className='container-fluid '>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row className={'p-0'}>
                <Col md={8} className={'p-0 mobile-container'}>
                    <ListGroup variant='flush' className='container-box-shadow p-2'>
                        <ListGroup.Item className='py-2'>
                            <h4>جزئیات تحویل</h4>

                            <p>
                                <strong>آدرس: </strong>
                                {cart.shippingAddress.city}, {cart.shippingAddress.address}
                                {'  '}
                                {cart.shippingAddress.postalCode}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item className='py-2'>
                            <h4>روش پرداخت</h4>
                            <p>
                                <strong>پرداخت از طریق: </strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item className='py-2'>
                            <h2>اقلام سفارش</h2>
                            {cart.cartItems.length === 0 ? <Message variant='info'>
                                سبد خرید شما خالی است !
                            </Message> : (
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>

                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>

                                                <Col md={4} className='text-start'>
                                                    <div className='d-inline'>
                                                        {toFarsiNumber(item.qty)} <span className={'count-num'}>X</span> {"   "}
                                                    </div>
                                                    <div className='d-inline'>
                                                        {Intl.NumberFormat('fa-IR').format(item.price)}  {"      "}
                                                    </div>
                                                    <div className='d-inline'>
                                                        = {Intl.NumberFormat('fa-IR').format((item.qty * item.price))}
                                                    </div>


                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>

                    </ListGroup>

                </Col>

                <Col md={4} className='ps-0 mobile-container'>
                    <Card className='container-box-shadow position-sticky p-2' 
                    style={IncreaseTop?{'top': '140px'}:{'top': '100px'}}
                    >
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>جمع سفارش</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>اقلام سفارش:</Col>
                                    <Col>{Intl.NumberFormat('fa-IR').format(cart.itemsPrice)}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>هزینه حمل:</Col>
                                    <Col>{Intl.NumberFormat('fa-IR').format(cart.shippingPrice)}</Col>
                                </Row>
                            </ListGroup.Item>



                            <ListGroup.Item>
                                <Row >
                                    <Col>جمع کل:</Col>
                                    <Col>{Intl.NumberFormat('fa-IR').format(cart.totalPrice)}</Col>
                                </Row>
                            </ListGroup.Item>


                            <ListGroup.Item>
                                {/* {error && <Message variant='danger'>{error}</Message>} */}
                            </ListGroup.Item>

                            <ListGroup.Item className='mt-4'>
                                <div style={{ 'height': '50px' }} className="mx-auto text-start">

                                    <Button
                                        type='button'
                                        className='btn-block'
                                        disabled={cart.cartItems === 0}
                                        onClick={placeOrder}
                                    >
                                        ثبت نهایی سفارش
                                    </Button>
                                </div>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default PlaceOrderScreen
