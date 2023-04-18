import React from 'react'
import { IoLocationSharp } from "react-icons/io5";
import { BsTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
const Footer = () => {
  return (
    <footer className="footer-section mt-5">
      <div className="container">
        <div className="footer-cta pt-5 pb-5">
          <div className="row">
            <div className="col-xl-4 col-md-4 mb-30">
              <div className="single-cta">
                <i><IoLocationSharp /></i>
                <div className="cta-text">
                  <h4>آدرس</h4>
                  <span>لورم ایپسوم متن </span>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-4 mb-30">
              <div className="single-cta">
                <i><BsTelephoneFill /></i>
                <div className="cta-text">
                  <h4>تلفن تماس</h4>
                  <span>۰۹۱۲۳۴۵۶۷۸۹</span>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-4 mb-30">
              <div className="single-cta">
                <i><MdEmail /></i>
                <div className="cta-text">
                  <h4>ایمیل</h4>
                  <span>mail@info.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-content pt-5 pb-5">
          <div className="row">
            <div className="col-xl-4 col-lg-4 mb-50">
              <div className="footer-widget">
                <div className="footer-logo">
                  <img src="/static/images/Technoland.jpg" className="img-fluid" alt="technoland-logo" />
                </div>
                <div className="footer-text">
                  <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ</p>
                </div>
                <div className="footer-social-icon mt-4">
                  <span>راه های ارتباطی با ما</span>
                  <a href="#"><i className="fab fa-facebook-f facebook-bg"></i></a>
                  <a href="#"><i className="fab fa-twitter twitter-bg"></i></a>
                  <a href="#"><i className="fab fa-google-plus-g google-bg"></i></a>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
              <div className="footer-widget">
                <div className="footer-widget-heading">
                  <h4>لینک های مفید</h4>
                </div>
                <ul>
                  <li><a href="#">درباره ما</a></li>
                  <li><a href="#">خانه</a></li>
                  <li><a href="#">ارتباط با ما</a></li>
                  <li><a href="#">محصولات</a></li>
                  <li><a href="#">استخدام</a></li>
                  <li><a href="#">شگفت انگیز ها </a></li>
                  <li><a href="#">راهنمای خرید</a></li>
                  <li><a href="#">آخرین اخبار</a></li>
                </ul>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 mb-50">
              <div className="footer-widget">
                <div className="footer-widget-heading">
                  <h4>عضویت</h4>
                </div>
                <div className="footer-text mb-25">
                  <p>با وارد کردن ایمیل خود در این کارد عضو هفته نامه ما شوید.</p>
                </div>
                <div className="subscribe-form">
                  <form action="#">
                    <input type="text" style={{'paddingRight':'90px'}} placeholder="آدرس ایمیل" />
                    <button><i className="fab fa-telegram-plane"></i></button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright-area">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6 text-center text-lg-left">
              <div className="copyright-text">
                <p>Copyright &copy; 2023, All Right Reserved <a href="#">technoland</a></p>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 d-none d-lg-block text-right">
              <div className="footer-menu">
                <ul>
                  <li><a href="#">خانه</a></li>
                  <li><a href="#">راهنما</a></li>
                  <li><a href="#">قوانین</a></li>
                  <li><a href="#">ارتباط‌‌‌با‌ما</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer