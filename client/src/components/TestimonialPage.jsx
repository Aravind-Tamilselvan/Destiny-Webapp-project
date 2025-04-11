import { FaHeart, FaStar } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import { ImCross } from "react-icons/im";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

import useReviews from '../hooks/useReviews';

const TestimonialPage = () => {
    const { id, reviewId } = useParams()


    const {homePageReviews} = useReviews()

    const findReview = homePageReviews.find((review) => review._id === id)

    const helpfulCount = findReview?.helpfulCount.length

    let helpfulCountText;
    if (helpfulCount <= 1) {
        helpfulCountText = `${helpfulCount} person found this helpful`
    } else {
        helpfulCountText = `${helpfulCount} people found this helpful`
    }

    const ifImage = findReview.image.length ? true : false

    const navigate = useNavigate()
    const handleGoBack = () => {
        navigate(-1)
    }

    return (
        <div className='testimonialPage'>
            <button onClick={handleGoBack}><ImCross /> </button>
            <div className='testimonialPage-container'>
                <div className='testimonialPage-Slider'>
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={30}
                        loop={true}
                        pagination={{
                            clickable: true,
                        }}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                        className="testimonialPage-mySwiper"
                    >
                        {ifImage ? (findReview.image.map((img) => (
                            <SwiperSlide className='testimonialPage-slide-image'>
                                <img src={`${img}`} alt='slider-image' />
                            </SwiperSlide>
                        ))) : (
                            <SwiperSlide style={{display:"flex",justifyContent:"center",alignItems:"center"}} >
                                <img src='/assets/GoTo.png' alt='slider-image'/>
                            </SwiperSlide>
                        )}
                    </Swiper>
                </div>
                <div className='testimonialPage-review'>
                    <div>
                        <h1>{`${findReview.user.name}`}</h1>
                        <p style={{ color: "black" }}>{`${findReview.reviewDescription}`}</p>
                    </div>
                    <div className='testimonialPage-icons'>
                        <div>
                            <FaStar />
                            <p>{`${findReview.rating}`}</p>
                        </div>
                        <div>
                            <FaHeart style={{ color: "red" }} />
                            <p>{`${helpfulCountText}`}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default TestimonialPage