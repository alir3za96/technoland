import React from 'react'

const ProductsPlaceholder = () => {
    return (
        <div className="product-box" >
            <div className="product-box-image-container">
                <div className="product-box-image  placeholder product-box-image-placeholder text-center">
                    {/* <span className="placeholder col-11 mt-2"></span> */}
                    <img src='/images/placeholder' className='placeholder w-100' />
                </div>
            </div>
            <div className="product-box-body-container">
                <div className="card-body mt-2">
                    <h5 className="card-title text-center">
                        <span className="placeholder col-12"></span>
                        <span className="placeholder col-8"></span>
                    </h5>
                    <p className="card-text text-center">
                        <span className="placeholder col-8 h-75"></span>
                    </p>
                    <p className="card-text text-center d-flex justify-content-between">
                        <span className="placeholder col-6"></span>
                        <span className="placeholder col-2"></span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ProductsPlaceholder