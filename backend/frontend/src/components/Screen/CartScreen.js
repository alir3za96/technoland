import React, {useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap'
import Message from '../../components/Message'
import {addToCart, removeFromCart} from '../../actions/cartActions'
// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { debounce } from '../../helpers/debounce'

function CartScreen() {
    const [open, setOpen] = React.useState(false);
    const [productId, setProductId] = React.useState(0);
    const [IncreaseTop, setIncreaseTop] = React.useState(true);
    const [scrollValue, setScrollValue] = React.useState(0)
    const handleClickOpen = (product_id) => {
        setOpen(true);
        setProductId(product_id)
    };

    const handleClose = () => {
        setOpen(false);
    };
    const slideDownNavHandler = debounce(() => {
        const currentScrollPos = window.pageYOffset;
        setIncreaseTop((scrollValue > currentScrollPos && scrollValue - currentScrollPos > 50) || currentScrollPos < 10);
        setScrollValue(currentScrollPos);
    }, 100);

    useEffect(() => {
        window.addEventListener('scroll', slideDownNavHandler);

        return () => window.removeEventListener('scroll', slideDownNavHandler);

    }, [scrollValue, IncreaseTop, slideDownNavHandler]);
    // const productId = match.params.id
    // const qty = location.search ? Number(location.search.split('=')[1]) : 1
    // const qty = location.search ? Number(location.search.split('=')[1]) : 1
    const dispatch = useDispatch()
    const history = useNavigate();
    const cart = useSelector(state => state.cart)
    const {cartItems} = cart


    // useEffect(() => {
    //     if (productId) {
    //         dispatch(addToCart(productId, qty))
    //     }
    // }, [dispatch, productId, qty])


    const removeFromCartHandler = () => {
        setOpen(false);
        dispatch(removeFromCart(productId))
    }

    const checkoutHandler = () => {
        history('/user/login?redirect=/order/shipping')
    }

    return (
        <div className={'container-fluid cart-screen-container'}>
            <Row className={'p-0'}>
                <Col md={8} className={'p-0 '}>
                    <div className='container-box-shadow w-100 text-center mb-3 mx-auto pt-3 p-2'
                         style={{'top': '100px'}}>
                        <h2>سبد خرید</h2>
                    </div>
                    {cartItems.length === 0 ? (
                        <Message variant='info show'>
                            سبد خرید شما خالی است <Link to='/'>برگشت به خانه</Link>
                        </Message>
                    ) : (
                        <ListGroup variant='flush '>
                            {cartItems.map(item => (
                                <ListGroup.Item
                                    className={'p-4 justify-content-between container-box-shadow mb-2 text-center'}
                                    key={item.product}>

                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name} fluid rounded/>
                                        </Col>
                                        <Col md={3} className={'overflow-hidden my-auto pe-2 h-50'}>
                                            <Link to={`/products/${item.product}`}>{item.name}</Link>
                                        </Col>

                                        <Col md={2} className={'m-auto mt-2 mt-md-auto'}>
                                            <h3>
                                                {Intl.NumberFormat('fa-IR').format(item.price)}<span
                                                className='price-toman'>تومان</span>

                                            </h3>
                                        </Col>

                                        <Col md={3} className={'m-auto mt-2 mt-md-auto'}>
                                            <Form.Control
                                                as="select"
                                                value={item.qty}
                                                onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                            >
                                                {
                                                    item.maxSale ?
                                                        item.countInStock > item.maxSale ?
                                                            [...Array(item.maxSale).keys()].map((x) => (
                                                                <option key={x + 1} value={x + 1}>
                                                                    {x + 1}
                                                                </option>
                                                            ))
                                                            :
                                                            [...Array(item.countInStock).keys()].map((x) => (
                                                                <option key={x + 1} value={x + 1}>
                                                                    {x + 1}
                                                                </option>
                                                            ))
                                                        :
                                                        [...Array(item.countInStock).keys()].map((x) => (
                                                            <option key={x + 1} value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        ))
                                                }

                                            </Form.Control>
                                        </Col>

                                        <Col md={1} className={'my-auto me-auto ps-5 text-start mt-5 mt-md-auto'}>
                                            <div>
                                                <Button
                                                    type='button'
                                                    variant='light'
                                                    onClick={() => handleClickOpen(item.product)}>
                                                    <i className='fas fa-trash'></i>
                                                </Button>
                                                <Dialog
                                                    open={open}
                                                    onClose={handleClose}
                                                    aria-labelledby="alert-dialog-title"
                                                    aria-describedby="alert-dialog-description"
                                                >
                                                    <DialogTitle id="alert-dialog-title">
                                                        {" آیا اطمینان دارید؟"}
                                                    </DialogTitle>
                                                    <DialogContent>
                                                        <DialogContentText id="alert-dialog-description">
                                                        </DialogContentText>
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button
                                                            className={'ms-2 w-25 btn-warning'}
                                                            onClick={() => removeFromCartHandler()}>بله</Button>
                                                        <Button
                                                            className={' w-25'}
                                                            onClick={handleClose} autoFocus>
                                                            کنسل
                                                        </Button>
                                                    </DialogActions>
                                                </Dialog>
                                            </div>

                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Col>

                <Col md={4} className={'ps-0 mobile-container'}>
                    <Card className={'p-4 justify-content-between container-box-shadow position-sticky'}
                          style={IncreaseTop?{'top': '140px'}:{'top': '100px'}} >
                        <ListGroup variant='flush '>
                            <h2 className={'mb-3'}>جمع اقلام محصولات
                                ({cartItems.reduce((acc, item) => Number(acc) + Number(item.qty), 0)})
                            </h2>
                            <ListGroup.Item className={'text-start'}>

                            </ListGroup.Item>
                        </ListGroup>

                        <div style={{'height': '80px'}} className={'text-start mt-5'}>
                            <h2>{Intl.NumberFormat('fa-IR').format(cartItems.reduce((acc, item) => acc + item.qty * item.price, 0))}
                                <span className='price-toman'>تومان</span>
                            </h2>
                            <Button
                                type='button'
                                className='btn-block py-2 mb-auto'
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandler}
                            >
                                رفتن به صفحه پرداخت
                            </Button>
                        </div>


                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default CartScreen