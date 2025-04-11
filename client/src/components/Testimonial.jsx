import React from 'react'

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import TestimonialCard from './testimonial/TestimonialCard';
import useGetAllReview from '../hooks/useGetAllReview';


const Testimonial = ({ id }) => {
    const{reviews}=useGetAllReview({id})
    let packageReviews = reviews || []

    const reviewData = packageReviews.filter(review => review.packageReview === id); 

    if (!reviewData.length) {
        return <p style={{ fontSize: "20px", textAlign: "center", color: "black", marginTop: "50px" }}>No reviews available.</p>;
    }

    return (
        <Swiper
            slidesPerView={3}
            spaceBetween={30}
            pagination={{
                clickable: true,
            }}
            modules={[Pagination]}
            className="package-review-Swiper"
        >
            {reviewData.map((review) => (
                <SwiperSlide key={review._id}>
                    <TestimonialCard
                        id={id}
                        review={review}
                    />
                </SwiperSlide>
            ))}

        </Swiper>
    )
}

export default Testimonial