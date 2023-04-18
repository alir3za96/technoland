import React from 'react'

const InfoBar = () => {
  return (
    <div className='container-fluid justify-content-between d-none d-md-flex mt-5 info-bar'>
        <div className='m-auto d-grid d-xl-block'>
            <i class="fa-regular fa-circle-check mx-auto pb-3"></i>
            <span className='px-xl-3'>تضمین اصالت کالا</span>
        </div>
        <div className='m-auto d-grid d-xl-block'>
            <i class="fa-solid fa-truck mx-auto pb-3"></i>
            <span className='px-xl-3'>ارسال سراسر کشور</span>
        </div>
        <div className='m-auto d-grid d-xl-block'>
            <i class="fa-solid fa-headset mx-auto pb-3"></i>
            <span className='px-xl-3'>مشاوره تخصصی</span>
        </div>
        <div className='m-auto d-grid d-xl-block'>
            <i class="fa-solid fa-rotate-left mx-auto pb-3"></i> 
            <span className='px-xl-3'>هفت روز ضمانت بازگشت کالا</span>
        </div>
        <div className='m-auto d-grid d-xl-block'>
            <i class="fa-regular fa-money-bill-1 mx-auto pb-3"></i>
            <span className='px-xl-3'>امکان پرداخت درمحل</span>
        </div>
    </div>
  )
}

export default InfoBar