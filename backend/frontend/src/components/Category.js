import React, { useEffect, useState } from 'react'
import { ListGroup, Row, Col, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import { getMainCategories } from '../services/otherServices'



const Category = () => {
    const [close, setClose] = useState(true)
    const [activeCatImage, setActiveCatImage] = useState('mobile-accessories')
    const [mainCat, setMainCat] = useState([]);

    // const closeCatBox = () => {
    //     if (!close){
    //         setClose(false)
    //     }
    // }

    const onHoverHandler = () => {
        setClose(false)
    }

    const onLeaveHandler = () => {
        setClose(true)
    }

    const [imageCat, setImageCat] = useState('');

    const catTitleHoverHandler = (e) => {
        
        setActiveCatImage(e.target.id)
        
    }

    const catTitleLeaveHandler = () => {
    }



    
        

    

    useEffect(() => {

        const fetchData = async () => {
          try {
            const { data: mainCatData } = await getMainCategories();
    
            setMainCat(mainCatData);
          } catch (err) {
            setMainCat(err.message);
          }
          
        };
        if (activeCatImage == 'mobile-accessories'){
            setImageCat('/static/images/mainCat/mobile-accessories.jpg');
        }
    
        else if (activeCatImage == 'headphone-headset-microphone'){
            setImageCat('/static/images/mainCat/headphone-headset-microphone.jpg');
        }
        else if (activeCatImage == 'speaker'){
            setImageCat('/static/images/mainCat/speaker.jpg');
        }
        else if (activeCatImage == 'computer-parts'){
            setImageCat('/static/images/mainCat/computer-parts.jpg');
        }
        else if (activeCatImage == 'notebook-netbook-ultrabook'){
            setImageCat('/static/images/mainCat/notebook-netbook-ultrabook.jpg');
        }
        else if (activeCatImage == 'compact-disc'){
            setImageCat('/static/images/mainCat/compact-disc.jpg');
        }
        else if (activeCatImage == 'other'){
            setImageCat('/static/images/mainCat/other.jpg');
        }
        
        fetchData();
      }, [activeCatImage]);

    const catBoxHandler = () => {
        setClose(true)
    }
    
    return (
    <Nav.Link 
    onMouseEnter={onHoverHandler}
    onMouseLeave={onLeaveHandler} 
    className='category-btn'>
        <i className={`fas fa-stream ps-1 ${close || 'pb-4'} `}></i>دسته‌بندی‌ کالا‌ها

    <div 
              className={`${close ? 'category-box-close ' : 'category-box '} shadow container-fluid w-50 position-absolute`}
              >
        <Row>
            <Col className='main-category d-flex'>
            <ListGroup className='category-list-group ' variant='flush'>
                {mainCat.map(cat =>(
                    <LinkContainer 
                    to={`products?cat=${cat.slug}`}
                    onClick={catBoxHandler}
                    >
                        <ListGroup.Item 
                        onMouseEnter={catTitleHoverHandler} 
                        onMouseLeave={catTitleLeaveHandler}
                        key={cat.slug}
                        id={cat.slug}
                        className={`py-3 cat-item`}>
                        {cat.title}
                        </ListGroup.Item>
                    </LinkContainer>
                ))}
                <ListGroup.Item className='py-3 cat-item cat-hover-other-cat'
                    onMouseEnter={catTitleHoverHandler} 
                    onMouseLeave={catTitleLeaveHandler}
                    id='other'
                            >
                    سایر دسته بندی ها
                    </ListGroup.Item>
                  </ListGroup>
                <div className={`main-cat-image main-cat-image-for-${activeCatImage}`}>
                    <img src={imageCat} alt={imageCat} />
                    {/* {imageCat} */}
                </div>
            </Col>
            {/* <Col md={8} className='category-list-group-items-container'>
            <Row>
                <Col sm={3}>
                <ListGroup className='category-list-group-items' variant='flush'>
                    <Link onClick={closeCatBox} to='/products'>
                    <div className='category-list-group-title'>تست</div>
                    </Link>
                    <ListGroup.Item>
                    موبایل
                </ListGroup.Item>
                <ListGroup.Item>
                    کارت حافظه
                </ListGroup.Item>
                <ListGroup.Item>
                    اسپیکر 
                </ListGroup.Item>
                <ListGroup.Item>
                    هندزفری
                </ListGroup.Item>
                <ListGroup.Item>
                    کابل و اتصالات
                </ListGroup.Item>
                <ListGroup.Item>
                    هارد
                </ListGroup.Item>
                </ListGroup>
                
                </Col>
                <Col sm={3}>
                <ListGroup className='category-list-group-items' variant='flush'>
                    <div className='category-list-group-title'>تست</div>
                    <ListGroup.Item>
                    موبایل
                </ListGroup.Item>
                <ListGroup.Item>
                    کارت حافظه
                </ListGroup.Item>
                <ListGroup.Item>
                    اسپیکر 
                </ListGroup.Item>
                <ListGroup.Item>
                    هندزفری
                </ListGroup.Item>
                <ListGroup.Item>
                    کابل و اتصالات
                </ListGroup.Item>
                <ListGroup.Item>
                    هارد
                </ListGroup.Item>
                </ListGroup>
                
                </Col>
                <Col sm={3}>
                <ListGroup className='category-list-group-items' variant='flush'>
                    <div className='category-list-group-title'>تست</div>
                    <ListGroup.Item>
                    موبایل
                </ListGroup.Item>
                <ListGroup.Item>
                    کارت حافظه
                </ListGroup.Item>
                <ListGroup.Item>
                    اسپیکر 
                </ListGroup.Item>
                <ListGroup.Item>
                    هندزفری
                </ListGroup.Item>
                <ListGroup.Item>
                    کابل و اتصالات
                </ListGroup.Item>
                <ListGroup.Item>
                    هارد
                </ListGroup.Item>
                </ListGroup>
                
                </Col>
                <Col sm={3}>
                <ListGroup className='category-list-group-items' variant='flush'>
                    <div className='category-list-group-title'>تست</div>
                    <ListGroup.Item>
                    موبایل
                </ListGroup.Item>
                <ListGroup.Item>
                    کارت حافظه
                </ListGroup.Item>
                <ListGroup.Item>
                    اسپیکر 
                </ListGroup.Item>
                <ListGroup.Item>
                    هندزفری
                </ListGroup.Item>
                <ListGroup.Item>
                    کابل و اتصالات
                </ListGroup.Item>
                <ListGroup.Item>
                    هارد
                </ListGroup.Item>
                </ListGroup>
                
                </Col>
                </Row>
            </Col> */}
        </Row>
          </div>
          </Nav.Link>
  )
}

export default Category