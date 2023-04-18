import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import axios from "axios";
import { AiFillStar } from "react-icons/ai";
import { BsFillCartPlusFill } from "react-icons/bs";
import { MdCompare } from "react-icons/md";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import toFarsiNumber from '../../utils/PersianNum';
import { getAllProducts } from '../../services/productServices';
import { PreLoader } from '../PreLoader/PreLoader';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from "../../actions/productActions";
import Product from './Product';
import ProductsPlaceholder from './ProductsPlaceholder';
import Message from '../Message';
import Paginate from '../Paginate';
import { Accordion, Form, ListGroup, Row, Col } from 'react-bootstrap';
import { getBrands, getCatRoute, getColors } from '../../services/otherServices';
import { LinkContainer } from 'react-router-bootstrap';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import CategoryRoute from '../CategoryRoute';
import { listByUserProducts } from '../../actions/productListActions';
import { debounce } from '../../helpers/debounce';

const Products = ({ bg_color, color }) => {


    const listProductsVar = useSelector(state => state.listProducts)

    const {
        products,
        loading,
        error,
        page,
        pages,
        totalProductsLen,
        maxPriceProducts,
        minPriceProducts,
    } = listProductsVar
    const [catRoute, setCatRoute] = useState([]);
    const [minPrice, setMinPrice] = useState(minPriceProducts);
    const [maxPrice, setMaxPrice] = useState(maxPriceProducts);
    const [value, setValue] = useState([]);
    const [IncreaseTop, setIncreaseTop] = useState(true);
    const [scrollValue, setScrollValue] = useState(0)
    // const [maxValue, setMaxValue] = useState(10000);
    // const [firstValue, setFirstValue] = useState([0, 100]);
    const [brands, setBrands] = useState([]);
    const [colors, setColors] = useState([]);
    const num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    let keyword = useLocation().search;

    const navigate = useNavigate()
    // const pathname = useLocation().search
    // console.log(pathname)
    const [brandFilter, setBrandFilter] = useState([])
    const brandUrl = `${brandFilter.map(x => (`brand=${x}`)).join("&")}`
    const [colorFilter, setColorFilter] = useState([])
    const colorUrl = `${colorFilter.map(x => (`color=${x}`)).join("&")}`

    const [activeSort, setActiveSort] = useState('')
    const [sortName, setSortName] = useState('')
    const sortUrl = keyword.includes('sort') ? `sort=${keyword.split('sort=')[1].split('&')[0]}` : '';
    const priceUrl = (value[1] == maxPriceProducts) || !value[0] ? '' : `&min=${value[0]}&max=${value[1]}`

    const keywordUrl = `&${brandUrl}${colorUrl && `&${colorUrl}`}${priceUrl && `${priceUrl}`}${sortUrl && `&${sortUrl}`}`

    const dispatch = useDispatch();
    useEffect(() => {
        let filter = keyword.split('?cat=')[1]

        if (keyword === '?cat=products' || keyword === '?cat=most-sellers' || keyword === '?cat=special-offer') {
            if (filter !== '&') {
                const brandForm = document.getElementById('brandFilterCheckBox');
                const colorForm = document.getElementById('colorFilterCheckBox');
                brandForm.reset()
                colorForm.reset()
                setBrandFilter([])
                setColorFilter([])
                window.scrollTo(0, 0);
                setActiveSort('')
                setValue([minPriceProducts, maxPriceProducts])
            }
        }
    }, [keyword]);
    useEffect(() => {
        dispatch(listProducts(keyword))
        dispatch(listByUserProducts())

    }, [dispatch, keyword, brandFilter, colorFilter, sortName, catRoute]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: brandsData } = await getBrands();
                const { data: colorsData } = await getColors();
                setBrands(brandsData);
                setColors(colorsData);
            } catch (err) {
                setBrands(err.message);
                setColors(err.message);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {

        const catName = keyword.includes('cat=') ? keyword.split('cat=')[1].split('&')[0] : ''
        const fetchData = async () => {
            try {
                const { data: catRouteData } = await getCatRoute(catName);

                setCatRoute(catRouteData);
            } catch (err) {
                setCatRoute(err.message);
            }
        };


        fetchData();
    }, [keyword]);

    const catUrl = keyword.includes('cat=') ? keyword.split('cat=')[1].split('&')[0] : ''
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [showOnce, setShowOnce] = useState(0)
    useEffect(() => {
        setValue([minPriceProducts, maxPriceProducts])
    }, [])

    const filterBrandHandler = (event) => {
        let updatedList = [...brandFilter];
        let removeUrl = keyword
        if (event.target.checked) {
            updatedList = ([...brandFilter, event.target.value])
            navigate(`${keyword ? `${keyword}` : '?keyword='}&brand=${event.target.value}`)
        } else {
            updatedList.splice(brandFilter.indexOf(event.target.value), 1);
            setBrandFilter(updatedList)
            removeUrl = keyword.replace(`&brand=${event.target.value}`, '')
            navigate(removeUrl)
        }

        setBrandFilter(updatedList)

        window.scrollTo(0, 0);
    }
    const filterColorHandler = (event) => {
        let updatedList = [...colorFilter];
        let removeUrl = keyword
        if (event.target.checked) {
            updatedList = ([...colorFilter, event.target.value])
            navigate(`${keyword ? `${keyword}` : '?keyword='}&color=${event.target.value}`)
        } else {
            updatedList.splice(colorFilter.indexOf(event.target.value), 1);
            setColorFilter(updatedList)
            removeUrl = keyword.replace(`&color=${event.target.value}`, '')
            navigate(removeUrl)
        }
        setColorFilter(updatedList)
        window.scrollTo(0, 0);
    }

    const removeFilterHandler = () => {
        const brandForm = document.getElementById('brandFilterCheckBox');
        const colorForm = document.getElementById('colorFilterCheckBox');
        brandForm.reset()
        colorForm.reset()
        setBrandFilter([])
        setColorFilter([])
        navigate('/products')
        window.scrollTo(0, 0);
        setActiveSort('')
        setValue([minPriceProducts, maxPriceProducts])
    }
    const priceRangeHandler = () => {
        if (showOnce < 1) {
            setValue([minPriceProducts, maxPriceProducts])
            setShowOnce(+1)
        }
    }

    const minPriceRangeInoutHandleChange = (event, newValue) => {
        setMinPrice([event.target.value]);
        setValue([event.target.value, maxPrice])
    }

    const maxPriceRangeInoutHandleChange = (event, newValue) => {
        setMaxPrice([event.target.value]);
        setValue([minPrice, event.target.value])
    }
    console.log(catRoute)
    const topSellingSortHandler = () => {
        if (activeSort !== 'topSelling') {
            setActiveSort('topSelling')
            if (keyword.includes('sort=')) {
                const sortName = keyword.split('sort=')[1].split('&')[0]
                setSortName(sortName)
                const removeSort = keyword.replace(`sort=${sortName}`, '')
                navigate(keyword ? `?${catUrl && 'cat='}${catUrl}${catUrl && '&'}${brandUrl && '&'}${brandUrl}${colorUrl && '&'}${colorUrl}${priceUrl && '&'}${priceUrl}${(brandUrl || colorUrl || priceUrl) && '&'}sort=topSelling` : `${removeSort}sort=topSelling`)
            } else {
                navigate(`${keyword ? `${keyword}&sort=topSelling` : '?sort=topSelling'}`)
            }
        }
    }
    const mostVisitedSortHandler = () => {
        if (activeSort !== 'mostVisited') {
            setActiveSort('mostVisited')
            if (keyword.includes('sort=')) {
                const sortName = keyword.split('sort=')[1].split('&')[0]
                setSortName(sortName)
                const removeSort = keyword.replace(`sort=${sortName}`, '')
                navigate(keyword ? `?${catUrl && 'cat='}${catUrl}${catUrl && '&'}${brandUrl && '&'}${brandUrl}${colorUrl}${priceUrl && '&'}${priceUrl}${(brandUrl || colorUrl || priceUrl) && '&'}sort=mostVisited` : `${removeSort}sort=mostVisited`)
            } else {
                navigate(`${keyword ? `${keyword}&sort=mostVisited` : '?sort=mostVisited'}`)
            }
        }
    }
    const newestSortHandler = () => {
        if (activeSort !== 'newest') {
            setActiveSort('newest')
            if (keyword.includes('sort=')) {
                const sortName = keyword.split('sort=')[1].split('&')[0]
                setSortName(sortName)
                const removeSort = keyword.replace(`sort=${sortName}`, '')
                navigate(keyword ? `?${catUrl && 'cat='}${catUrl}${catUrl && '&'}${brandUrl && '&'}${brandUrl}${colorUrl && '&'}${colorUrl}${priceUrl && '&'}${priceUrl}${(brandUrl || colorUrl || priceUrl) && '&'}sort=newest` : `${removeSort}sort=newest`)
            } else {
                navigate(`${keyword ? `${keyword}&sort=newest` : '?sort=newest'}`)
            }
        }
    }
    const biggestDiscountSortHandler = () => {
        if (activeSort !== 'biggestDiscount') {
            setActiveSort('biggestDiscount')
            if (keyword.includes('sort=')) {
                const sortName = keyword.split('sort=')[1].split('&')[0]
                setSortName(sortName)
                const removeSort = keyword.replace(`sort=${sortName}`, '')
                navigate(keyword ? `?${catUrl && 'cat='}${catUrl}${catUrl && '&'}${brandUrl && '&'}${brandUrl}${colorUrl && '&'}${colorUrl}${priceUrl && '&'}${priceUrl}${(brandUrl || colorUrl || priceUrl) && '&'}sort=biggestDiscount` : `${removeSort}sort=biggestDiscount`)
            } else {
                navigate(`${keyword ? `${keyword}&sort=biggestDiscount` : '?sort=biggestDiscount'}`)
            }
        }
    }
    const mostExpensiveSortHandler = () => {
        if (activeSort !== 'mostExpensive') {
            setActiveSort('mostExpensive')
            if (keyword.includes('sort=')) {
                const sortName = keyword.split('sort=')[1].split('&')[0]
                setSortName(sortName)
                const removeSort = keyword.replace(`sort=${sortName}`, '')
                navigate(keyword ? `?${catUrl && 'cat='}${catUrl}${catUrl && '&'}${brandUrl && '&'}${brandUrl}${colorUrl && '&'}${colorUrl}${priceUrl && '&'}${priceUrl}${(brandUrl || colorUrl || priceUrl) && '&'}sort=mostExpensive` : `${removeSort}sort=mostExpensive`)
            } else {
                navigate(`${keyword ? `${keyword}&sort=mostExpensive` : '?sort=mostExpensive'}`)
            }
        }
    }
    const mostCheapestSortHandler = () => {
        if (activeSort !== 'mostCheapest') {
            setActiveSort('mostCheapest')
            if (keyword.includes('sort=')) {
                const sortName = keyword.split('sort=')[1].split('&')[0]
                setSortName(sortName)
                const removeSort = keyword.replace(`sort=${sortName}`, '')
                navigate(keyword ? `?${catUrl && 'cat='}${catUrl}${catUrl && '&'}${brandUrl && '&'}${brandUrl}${colorUrl && '&'}${colorUrl}${priceUrl && '&'}${priceUrl}${(brandUrl || colorUrl || priceUrl) && '&'}sort=mostCheapest` : `${removeSort}sort=mostCheapest`)
            } else {
                navigate(`${keyword ? `${keyword}&sort=mostCheapest` : '?sort=mostCheapest'}`)
            }
        }
    }


    const handleKeyUp = (e) => {
        navigate(keyword ? `?${brandUrl && '&'}${brandUrl}${colorUrl && '&'}${colorUrl}${(brandUrl || colorUrl) && '&'}${sortUrl && `&${sortUrl}`}${priceUrl}` : `?${priceUrl}`)
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


    return (
        <>
            <div className='category-route d-flex container-fluid text-muted'>
                <Link to='/'>
                    <div className='text-muted cat-title'>خانه</div>
                </Link>
                {catRoute.map((cat, index) => (
                    <Link to={`?cat=${cat.slug}`}>
                        <div className='text-muted ' key={index}>  /  <span className='cat-title'>{cat.title}</span></div>
                    </Link>
                ))}
            </div>
            <div className='container-fluid mt-2'>

                <div className='row'>
                    <div className='col-md-4 col-lg-3 product-list-filter container-box-shadow pt-2 pb-4 position-sticky '
                        style={IncreaseTop ? { 'top': '140px' } : { 'top': '100px' }}
                    >
                        <ListGroup className='filter-list-group py-2 ' variant='flush'>
                            <ListGroup.Item className='filter-items'>
                                فیلتر ها
                            </ListGroup.Item>
                        </ListGroup>
                        {(brandFilter.length > 0 || colorFilter.length > 0 || keyword.includes('min')) && (
                            <Accordion defaultActiveKey="0">
                                <Accordion.Item className='mb-3' eventKey="0">
                                    <Accordion.Header>فیلتر های انتخاب شده</Accordion.Header>
                                    <Accordion.Body>
                                        <ListGroup className='filter-list-group d-block' variant='flush'>
                                            <LinkContainer to='/products' onClick={removeFilterHandler}>
                                                <ListGroup.Item className='remove-filter-button'>
                                                    <div>
                                                        <i className="fa-solid fa-xmark ps-1"></i>
                                                        <span>حذف تمام فیلتر ها</span>
                                                    </div>
                                                </ListGroup.Item>
                                            </LinkContainer>

                                            {brandFilter.length > 0 && (
                                                <ListGroup.Item>
                                                    <p>برندهای انتخاب شده</p>
                                                    {brandFilter.map(filter => (
                                                        <div className='filter-items d-inline-block px-1'
                                                            style={{ fontSize: '.8rem' }}>
                                                            {filter}
                                                        </div>
                                                    ))}
                                                </ListGroup.Item>
                                            )}


                                            {keyword.includes('min') && (
                                                <ListGroup.Item>
                                                    <p>محدوده قیمت</p>
                                                    <div className='filter-items d-inline-block px-1'
                                                        style={{ fontSize: '.8rem' }}>
                                                        از {Intl.NumberFormat('fa-IR').format(value[0])} تا {Intl.NumberFormat('fa-IR').format(value[1])} تومان
                                                    </div>
                                                </ListGroup.Item>
                                            )}

                                            {colorFilter.length > 0 && (

                                                <ListGroup.Item>
                                                    <p>رنگ های انتخاب شده</p>
                                                    {colorFilter.map(filter => (
                                                        <div className='filter-items d-inline-block px-1'
                                                            style={{ fontSize: '.8rem' }}>
                                                            {filter}
                                                        </div>
                                                    ))}
                                                </ListGroup.Item>
                                            )}
                                            <ListGroup.Item>

                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        )}
                        <Accordion defaultActiveKey="1">

                            <Accordion.Item eventKey="1">
                                <Accordion.Header>برند</Accordion.Header>
                                <Accordion.Body>
                                    <Form className='' id='brandFilterCheckBox'>
                                        {brands.map((brand, index) => (
                                            <div className='d-flex' key={index}>
                                                <Form.Check
                                                    type='checkbox'
                                                    className='ps-1'
                                                    id={brand.englishName}
                                                    value={brand.englishName}
                                                    onClick={filterBrandHandler}
                                                >
                                                </Form.Check>
                                                <Form.Label className='d-flex w-100 justify-content-between'
                                                    htmlFor={brand.englishName}>
                                                    <div className=''>
                                                        {brand.persianName}
                                                    </div>
                                                    <div className='text-muted'>
                                                        {brand.englishName}
                                                    </div>
                                                </Form.Label>
                                            </div>
                                        ))}
                                    </Form>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header onClick={priceRangeHandler}>
                                    <Form.Label>محدوده قیمت</Form.Label>

                                </Accordion.Header>
                                <Accordion.Body
                                >
                                    <div className='form-range-container w-100 py-3 px-1'>
                                        <div className='price-range-of position-relative my-1'>
                                            <Form>
                                                <div className='price-filter-input d-flex gap-2 position-relative'>
                                                    <Form.Control
                                                        onChange={maxPriceRangeInoutHandleChange}
                                                        value={Intl.NumberFormat('fa-IR').format(value[1])}
                                                    />
                                                    <Form.Control
                                                        onChange={minPriceRangeInoutHandleChange}
                                                        min={50000}
                                                        value={Intl.NumberFormat('fa-IR').format(value[0])}
                                                    />
                                                </div>
                                                <div
                                                    className='position-relative price-range my-2 pt-5'>
                                                    <Box>
                                                        <Slider
                                                            onClick={handleKeyUp}

                                                            dir={'ltr'}
                                                            step={1000}
                                                            value={value}
                                                            min={minPriceProducts}
                                                            max={maxPriceProducts}
                                                            onChange={handleChange}
                                                            className='price-range-slider'
                                                        />
                                                    </Box>
                                                </div>
                                            </Form>
                                        </div>
                                    </div>


                                </Accordion.Body>

                            </Accordion.Item>
                            <Accordion.Item eventKey="3">
                                <Accordion.Header>رنگ</Accordion.Header>
                                <Accordion.Body>
                                    <Form id='colorFilterCheckBox'>
                                        {colors.map((color, index) => (
                                            <div className='d-flex' key={index}>
                                                <Form.Check
                                                    type='checkbox'
                                                    className='ps-1'
                                                    id={color.englishName}
                                                    value={color.englishName}
                                                    onClick={filterColorHandler}
                                                >
                                                </Form.Check>
                                                <Form.Label htmlFor={color.englishName}>
                                                    <div>
                                                        {color.persianName}
                                                    </div>
                                                </Form.Label>
                                            </div>
                                        ))}
                                    </Form>
                                </Accordion.Body>
                            </Accordion.Item>

                        </Accordion>


                    </div>
                    <div className='col-md-8 col-lg-9 product-list ps-0'>
                        <div className='row order-by'>
                            <div className='col'>
                                <div className='d-flex gap-2 container-box-shadow p-2'>
                                    <i className="fa-solid fa-sort"></i>
                                    <div>مرتب‌سازی‌بر‌اساس</div>
                                    <span id='' onClick={topSellingSortHandler}
                                        className={`sort-products-title ${activeSort == 'topSelling' && 'activeSort'}`}>پرفروشترین</span>
                                    <span id='' onClick={mostVisitedSortHandler}
                                        className={`sort-products-title ${activeSort == 'mostVisited' && 'activeSort'}`}>پربازدید‌ترین</span>
                                    <span id='' onClick={newestSortHandler}
                                        className={`sort-products-title ${activeSort == 'newest' && 'activeSort'}`}>جدیدترین</span>
                                    <span id='' onClick={biggestDiscountSortHandler}
                                        className={`sort-products-title ${activeSort == 'biggestDiscount' && 'activeSort'}`}>بیشترین‌تخفیف</span>
                                    <span id='' onClick={mostExpensiveSortHandler}
                                        className={`sort-products-title ${activeSort == 'mostExpensive' && 'activeSort'}`}>گران‌ترین</span>
                                    <span id='' onClick={mostCheapestSortHandler}
                                        className={`sort-products-title ${activeSort == 'mostCheapest' && 'activeSort'}`}>ارزان‌ترین</span>

                                    <div
                                        className='me-auto'>{products && `${toFarsiNumber(Number(totalProductsLen))} کالا`}</div>

                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            {loading ?
                                (num.map(i => (
                                    <div key={i}
                                        className='product-box-container col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-4'>
                                        <ProductsPlaceholder />
                                    </div>
                                )))
                                :
                                error ?
                                    <Message text={error} variant='danger' />
                                    :
                                    products.map((product) => (
                                        <div key={product._id}
                                            className='product-box-container col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-4'>
                                            <Product product={product} bg_color={bg_color} color={color} />
                                        </div>
                                    ))
                            }
                        </div>
                        <Paginate page={page} pages={pages} keyword={keyword} keywordUrl={keywordUrl} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Products

