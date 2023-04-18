import React, { useState, useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// import { PayPalButton } from 'react-paypal-button-v2'
import Message from '../../components/Message'
import { PreLoader } from '../PreLoader/PreLoader'
import { getOrderDetails, payOrder, deliverOrder } from '../../actions/orderActions'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../../constants/orderConstants'
import toFarsiNumber from '../../utils/PersianNum'
import { debounce } from '../../helpers/debounce'

function OrderScreen() {
    const orderId = useParams().id;
    console.log(orderId)
    const dispatch = useDispatch()
    const history = useNavigate();
    const [IncreaseTop, setIncreaseTop] = useState(true);
    const [scrollValue, setScrollValue] = useState(0)

    // const [sdkReady, setSdkReady] = useState(false)

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, error, loading } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    // const orderDeliver = useSelector(state => state.orderDeliver)
    // const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    if (!loading && !error) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    }


    const slideDownNavHandler = debounce(() => {
            const currentScrollPos = window.pageYOffset;
            setIncreaseTop((scrollValue > currentScrollPos && scrollValue - currentScrollPos > 50) || currentScrollPos < 10);
            setScrollValue(currentScrollPos);
        }, 100);
    useEffect(() => {
            window.addEventListener('scroll', slideDownNavHandler);

            return () => window.removeEventListener('scroll', slideDownNavHandler);

        }, [scrollValue, IncreaseTop, slideDownNavHandler]);
    // const addPayPalScript = () => {
    //     const script = document.createElement('script')
    //     script.type = 'text/javascript'
    //     script.src = 'https://www.paypal.com/sdk/js?client-id=AeDXja18CkwFUkL-HQPySbzZsiTrN52cG13mf9Yz7KiV2vNnGfTDP0wDEN9sGlhZHrbb_USawcJzVDgn'
    //     script.async = true
    //     script.onload = () => {
    //         setSdkReady(true)
    //     }
    //     document.body.appendChild(script)
    // }

    useEffect(() => {

        if (!userInfo) {
            history('/users/login')
        }
{/* successDeliver*/ }
        if (!order || successPay || order._id !== Number(orderId)) {
            dispatch({ type: ORDER_PAY_RESET })
            // dispatch({ type: ORDER_DELIVER_RESET })

            dispatch(getOrderDetails(orderId))
        } else if (!order.isPaid) {
            // if (!window.paypal) {
            //     addPayPalScript()
            // } else {
            //     setSdkReady(true)
            // }
        }
    }, [dispatch, order, orderId, successPay])
{/* successDeliver*/ }

    // const successPaymentHandler = (paymentResult) => {
    //     dispatch(payOrder(orderId, paymentResult))
    // }

    // const deliverHandler = () => {
    //     dispatch(deliverOrder(order))
    // }

    const moveUpScreen = () => {
        window.scrollTo(0, 0);
    }
    return loading ? (
        <PreLoader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <div className="container-fluid">
             
            <Row className='p-0'>
                <Col md={8} className="p-0">
                <div className='container-box-shadow w-100 text-center mb-3 mx-auto pt-3 p-2'
                         style={{'top': '100px'}}>
                        <h2>سفارش</h2>
                    </div>
                    <ListGroup variant='flush' className='container-box-shadow'>
                        <ListGroup.Item>
                            <h2>اطلاعات</h2>
                            <p><strong>نام: </strong> {order.user.name}</p>
                            <p><strong>ایمیل: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                            <p>
                                <strong>آدرس: </strong>
                                {order.shippingAddress.address},  {order.shippingAddress.city}
                                {'  '}
                                {order.shippingAddress.postalCode}
                            </p>

                            {order.isDelivered ? (
                                <Message className={'text-center'} variant='success'>تحویل در {order.deliveredAt}</Message>
                            ) : (
                                <Message className={'text-center'} variant='warning'>تحویل داده نشده</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>روش پرداخت</h2>
                            <p>
                                <strong>روش: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (
                                <Message variant='success' className={'text-center'}>پرداخت در {order.paidAt}</Message>
                            ) : (
                                <Message variant='warning' className={'text-center'}>پرداخت نشده</Message>
                            )}

                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>اقلام سفارش</h2>
                            {order.orderItems.length === 0 ? <Message variant='info'>
                                سفارش خالی است
                            </Message> : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1} className='text-center'>
                                                    <Image style={{'max-height':'200px'}}  src={item.image} alt={item.name} fluid rounded />
                                                </Col>

                                                <Col>
                                                    <Link onClick={moveUpScreen} to={`/products/${item.product}`}>{item.name}</Link>
                                                </Col>

                                                <Col md={4}>
                                                {toFarsiNumber(Number(item.qty))}<span className='price-toman'>عدد</span> <div className='d-inline'>X</div> {Intl.NumberFormat('fa-IR').format(item.price)}<span className='price-toman'>تومان</span> = {Intl.NumberFormat('fa-IR').format(item.qty * item.price)}<span className='price-toman'>تومان</span>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>

                    </ListGroup>

                </Col>

                <Col md={4} className=" ps-md-0 profile-content-container mt-4 mt-md-0 ">
                    <Card className='container-box-shadow position-sticky pt-3 p-2 '
                    style={IncreaseTop?{'top': '140px'}:{'top': '100px'}}
                    > 
                        <ListGroup variant='flush' className=''>
                            <ListGroup.Item>
                                <h2>صورتحصاب</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>جمع اقلام سفارش:</Col>
                                    <Col>{Intl.NumberFormat('fa-IR').format(order.itemsPrice)}<span className='price-toman'>تومان</span></Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>هزینه حمل:</Col>
                                    <Col>{Intl.NumberFormat('fa-IR').format(order.shippingPrice)}<span className='price-toman'>تومان</span></Col>
                                </Row>
                            </ListGroup.Item>


                            <ListGroup.Item>
                                <Row>
                                    <Col>جمع:</Col>
                                    <Col>{Intl.NumberFormat('fa-IR').format(order.totalPrice)}<span className='price-toman'>تومان</span></Col>
                                </Row>
                            </ListGroup.Item>


                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <PreLoader />}

                                    {/* {!sdkReady ? (
                                        <PreLoader />
                                    ) : (
                                        // <PayPalButton
                                        //     amount={order.totalPrice}
                                        //     onSuccess={successPaymentHandler}
                                        // />
                                        <></>
                                    )} */}
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                        {/* {loadingDeliver && <PreLoader />} */}
                        {userInfo && userInfo.isStaff && order.isPaid && !order.isDelivered && (
                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn btn-block'
                                    // onClick={deliverHandler}
                                >
                                    تحویل داده شد
                                </Button>
                            </ListGroup.Item>
                        )}
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default OrderScreen
