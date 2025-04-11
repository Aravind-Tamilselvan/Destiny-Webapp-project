import { React, useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { FaLocationDot, FaPeopleGroup } from 'react-icons/fa6'
import { FaClock, FaLanguage } from 'react-icons/fa'
import { RiArrowDropDownLine } from "react-icons/ri";
import { GrPlan } from 'react-icons/gr'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Link } from 'react-router-dom'
import { toggleContent } from '../../utils/toggleContent';

import PostReview from '../PostReview';
import Testimonial from '../Testimonial';
import useAllPackages from '../../hooks/packages/useAllPackages';
import useUser from '../../hooks/useUser';

const Details = () => {
  const { id } = useParams(); // Get the package ID from URL
  const {user} = useUser()
  const {allPackages} = useAllPackages()

  useEffect(() => {
    window.scrollTo(0,0)
  }, []);
  const packageData = allPackages?.find(pkg => pkg._id === id);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  if (!packageData) {
    return (
      <>
        <h1>Package not found</h1>
        <h2>{`${packageData}`}</h2>
      </>
    );
  }
  return (
    <>
      <div className='Details' key={`${packageData._id}`} tabIndex={`${packageData._id}`}>
        {packageData ? (
          <>
            <div className='Detials-Heading'>
              <h1>{`${packageData.name}`}</h1>
              <p><FaLocationDot /> {`${packageData.location}`}</p>
            </div>

            <div className='Details-slider-section'>
              <Swiper
                style={{
                  '--swiper-navigation-color': '#fff',
                  '--swiper-pagination-color': '#fff',
                }}
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="Details-mySwiper"
              >
                {packageData?.image.map((img) => (
                  <SwiperSlide>
                    <img src={img} alt='slide-img' />
                  </SwiperSlide>
                ))}
              </Swiper>
              <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="Details-mySwiper-2"
              >
                {packageData?.image.map((img) => (
                  <SwiperSlide>
                    <img src={img} alt='slide-img' />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <section className='package-details'>
              <div>
                <FaClock />
                <div>
                  <p>Duration</p>
                  <p>{`${packageData.packageDetails.totalDays} days`}</p>
                </div>
              </div>
              <div>
                <GrPlan />
                <div>
                  <p>Trip plan</p>
                  <p>{`${packageData.packageType}`}</p>
                </div>
              </div>
              <div>
                <FaPeopleGroup />
                <div>
                  <p>Group Size</p>
                  <p>{`${packageData.availability.totalSlots}`} people</p>
                </div>
              </div>
              <div>
                <FaLanguage />
                <div>
                  <p>Languages</p>
                  <p>{`${packageData.language}`}</p>
                </div>
              </div>
            </section>

            <section className="package-itenery">
              <h1>Tour Itenary: {`${packageData.name}`}</h1>
              <p>{`${packageData.description}`}</p>
              <div className="package-itenery-container">
                {packageData.packageDetails.tripPlan.map((day) => (
                  <div className="iternary-container" tabIndex={`${day.key}`}>
                    <div className="iternary" onClick={(e) => toggleContent(e.currentTarget)}>
                      {`${day.day} :`}
                      <RiArrowDropDownLine className='icon' />
                    </div>
                    <div className="iternary-description">
                      {`${day.activities}`}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/*  */}
            {packageData?.customizablePackage &&
              <section className='package-customization'>
                <h1>Customizations</h1>
                <p style={{ marginTop: "20px" }}>For customizing this package please contact our representative Abimanyu 9844519549</p>
              </section>
            }

            <section className='VR-hotel'>
              <h1>Hotel VR-Experience</h1>
              <iframe title='VR View' src="https://theviewer.co/share/theConstruct/d022e887-a218-477b-be87-d8b025b84ca9?linkType=BehanceEmbedLink" allow="accelerometer; encrypted-media; gyroscope; autoplay;" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" oallowfullscreen="true" msallowfullscreen="true" className='vrview' ></iframe>
            </section>

            <section className='booking-button'>
              <Link to={`/packages/${packageData._id}/${user?._id}/booking`}><button>Book Now</button></Link>
            </section>

            <h1 style={{ marginBottom: '30px' }}>Testimonials</h1>

            <PostReview packageId={packageData._id} />

            <section className='package-review'>
              <Testimonial
                id={packageData._id}
              />
            </section>
          </>

        ):(<>
          <h1>Package data not found</h1>
        </>)}
      </div >
    </>
  )
}

export default Details