import React, { useEffect, useState } from 'react'
import { Button, Form, Nav, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import { useNavigate,  useLocation } from 'react-router-dom'
import { listProducts, listProductsSearch, listProductsSearchPreShow } from '../actions/productActions'

function SearchBox() {
    const [keyword, setKeyword] = useState('')
    const [show, setShow] = useState(false)

    const dispatch = useDispatch()
    let query = keyword.split('?keyword=')[1]
    let history = useNavigate()
    const pathname = useLocation().pathname

    const listProductsSearchVarPreShow = useSelector(state => state.listProductsSearchPreShow)
    const { products, loading, error } = listProductsSearchVarPreShow

    const submitHandler = (e) => {
        e.preventDefault()
        if (query && keyword) {
            history(`/products/search${keyword}&page=1`)
        } else {
            e.preventDefault()
        }
    }
    useEffect(() => {
        dispatch(listProductsSearchPreShow(keyword))
    }, [dispatch, keyword]);

    const searchCloseHandler = () => {
        if (show){
            setShow(false)
        }
    }
    return (
        <>
        <Form className='d-flex search-form position-relative' onSubmit={submitHandler} inline>
            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyword(`?keyword=${e.target.value}`)}
                className='mx-2 w-100 search-input'
                autoComplete="off"
                // onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
            >

           
            </Form.Control>
            <div 
            
            className='show-search-content shadow'>
                {loading?
                (
                    <div className='d-flex justify-content-center mx-auto'>
                        <Spinner className='m-3 mx-auto spinner-border' animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                )   :
                (
                    <>
                    {
                    query != '' && !!query?

                        (<>   
                            {products.length != 0?
                            (
                                <>
                            {products.map(product => (
                                    <Link onClick={searchCloseHandler} to={`products/${product._id}`}>

                                    <div className='product-in-preshow-search'>
                                        <img src={product.image} className='image-in-preshow-search' />
                                        <p>{product.name}</p>                                      
                                    </div>
                                </Link>
                                ))}
                            </>
                            ):
                            (
                                <p className='text-center p-3'>
                                محصول یافت نشد
                            </p>
                            )
                            }
                            
                            </>
                        ):
                        (
                            <p className='text-center p-3'>
                                نام محصول را وارد کنید 
                            </p>
                        )
                                }
                    </>
                ) 
            
            }
                
            </div>
                
                <Button
                type='submit'
                variant='outline-success'
                className='p-2'
            >
                جتسجو
            </Button>
            
        </Form>
        </>
    )
}

export default SearchBox
