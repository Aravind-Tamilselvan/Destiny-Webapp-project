import { React, useEffect, useState } from 'react'
import '../page.css'

// Swiper 
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import { GiSurferVan } from "react-icons/gi";
import { GrPlan } from "react-icons/gr";
import { FaMoneyCheck } from "react-icons/fa";

import { Link } from 'react-router-dom';
import useReviews from '../../hooks/useReviews';

import Slider from '../../components/Slider';



const HomePage = () => {
    //const { homePageReviews, allReviews } = usePackage()
    const{homePageReviews,isLoading,error} = useReviews()
    const [active,setActive] = useState(null)

    useEffect(() => {
        window.scrollTo(0, 0) // Scroll to top on component mount
    }, []);

    return (
        <div className='Homepage'>
            {/* Main slider */}
            <div className='slider-section'>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    loop={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Autoplay, Pagination]}
                    className="mySwiper"
                >
                    <SwiperSlide className='slide-image'>
                        <h1>Enjoy your moments together</h1>
                        <img src='/assets/hompage/slider-3.jpg' alt='slider-image-1' />
                    </SwiperSlide>
                    <SwiperSlide className='slide-image'>
                        <h1>Explore the unknown</h1>
                        <img src='/assets/hompage/slider-2.jpg' alt='slider-image-2' />
                    </SwiperSlide>
                    <SwiperSlide className='slide-image'>
                        <h1>Admire the beauty of nature</h1>
                        <img src='/assets/hompage/silder-4.jpg' alt='slider-image-3' />
                    </SwiperSlide>
                    <SwiperSlide className='slide-image'>
                        <h1>Seek and overcome challenges</h1>
                        <img src='/assets/hompage/slider-1.jpg' alt='slider-image-4' />
                    </SwiperSlide>
                </Swiper>
            </div>

            {/* Display packages */}
            <h1 id='package-heading'>Packages</h1>
            <section className='popular-packages-section'>
                <div className='adventures'>
                    <h2>Adventure</h2>
                    <Link to='/adventure-packages' onClick={()=>setActive("/adventure-packages")} className={active === "/adventure-packages" ? "active" : ""}>
                        <img src='/assets/hompage/adventure.jpg' alt='adventure-picture' />
                    </Link>
                    <div className='overlay'></div>
                </div>

                <div className='luxury'>
                    <h2>Luxury</h2>
                    <Link to='/luxury-packages' onClick={()=>setActive("/luxury-packages")} className={active === "/luxury-packages" ? "active" : ""}>
                        <img src='/assets/hompage/luxury.jpg' alt='luxury-picture' />
                    </Link>
                    <div className='overlay'></div>
                </div>

                <div className='family'>
                    <h2>Family</h2>
                    <Link to='/family-packages' onClick={() => setActive("/family-packages")} className={active === "/family-packages" ? "active" : ""}>
                        <img src='/assets/hompage/family.jpg' alt='family-picture' />
                    </Link>
                    <div className='overlay'></div>
                </div>


                <div className='solo'>
                    <h2>Solo travel</h2>
                    <Link to='/solo-packages' onClick={() => setActive("/solo-packages")} className={active === "/solo-packages" ? "active" : ""}>
                        <img src='/assets/hompage/solo.jpg' alt='solo-picture' />
                    </Link>
                    <div className='overlay'></div>
                </div>
            </section>

            {/* Reason */}
            <section className="reason">
                <h1>Why Choose us?</h1>
                <div className="cards">
                    <div className="reason-card">
                        <div><FaMoneyCheck /></div>
                        <h2>Pay as you travel</h2>
                        <p>Just spend money for the days you travel</p>
                    </div>
                    <div className="reason-card">
                        <div><GiSurferVan /></div>
                        <h2>Doorstep pickup</h2>
                        <p>We pick you upfront in your home.</p>
                    </div>
                    <div className="reason-card">
                        <div><GrPlan /></div>
                        <h2>Customizable package</h2>
                        <p>We offer your trip plan in your hands</p>
                    </div>
                </div>
            </section>

            {/* About Us */}
            <section className='about-section'>
                <h1>About us</h1>
                <p><span>Go</span><span>To</span> is a next-generation travel booking app startup designed to provide a seamless and personalized travel experience. Unlike traditional travel platforms, we introduce three standout features:

                    Pay as You Travel – Users only pay for the days they actually travel and stay within the package, with flexibility to extend or shorten their trip.
                    Doorstep Pickup and Drop – Ensuring hassle-free transportation, this feature offers personalized pickup from the user’s location to the trip’s starting point and back.
                    Customizable package – We at GoTo prioritizes customer more than us so If you want to plan your own trip we offer your trip plan in your hands.

                    The project is headed by me Aravind, who leads the MERN stack development, ensuring a robust and efficient platform. I am supported by a talented team, including Jaya Srinivasan, Abimanyu, and Anand, each contributing different aspects of this project. Together, we aim to redefine the travel experience by integrating smart technology with user-friendly services, making trip planning more flexible, convenient, and cost-effective. GoTo is set to revolutionize how people book and experience travel, providing a tailored approach that prioritizes customer convenience.</p>
            </section>

            {/* Testimonial */}
            <section className='testimonial-section'>
                <h1>Testimonials</h1>
                {!error ? (isLoading ? <p style={{color:"black"}}>Loading...</p> : <Slider homePageReviews={homePageReviews} />) : (<p style={{color:"black"}}>Error in loading reviews</p>) }
            </section>

        </div>
    )
}

export default HomePage