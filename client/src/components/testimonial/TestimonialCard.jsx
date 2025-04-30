import React from 'react'
import { FaRegHeart, FaRegStar, FaStar, FaHeart } from "react-icons/fa";
import { Link } from 'react-router-dom'

import useLike from '../../hooks/useLike';
import useUser from '../../hooks/useUser';

const TestimonialCard = ({review,id}) => {
    const {user} = useUser()
    const {updateLike,loading} = useLike()

    const isLiked = review.helpfulCount.includes(user?._id)

    const ifReviewImage = review?.image.length ? review.image[0] : "/assets/Destiny.jpg"

    const handleLike = (reviewId)=>{
        if(loading) return
        updateLike(reviewId)
    }

    return (
        <div className="testimonial">
            <div className='testimonial-image-container'>
                <div className='testimonial-image'>
                    <img src={`${review.user.img}` || "assests/images/testimonial-1.jpg"} alt='testimonial-1' />
                </div>

                <div>
                    <h2>{`${review.user.name}`}</h2>
                </div>
            </div>


            <div className='testimonial-review-image'>
                <Link to={`/Testimonial-page/${id}/${review._id}`}>
                    <img src={`${ifReviewImage}`} alt='review-img' />
                    <span>{`${review.image.length}`}</span>
                </Link>
            </div>

            <div className="testimonial-like">
                <div onClick={()=>handleLike(review?._id)} >
                    {isLiked ? (<div className='like-button'><FaHeart className='like-button' style={{ color: "red" }} /> <p>{review.helpfulCount.length}</p></div>) : (<div className='like-button'><FaRegHeart className='like-button' style={{ color: "red" }} /> <p>{review.helpfulCount.length}</p></div>)}
                </div>
                <div className="review-star">
                    {[...Array(5)].map((_, index) => (
                        index < review.rating ? <FaStar key={index} /> : <FaRegStar key={index} />
                    ))}
                    <p>{review.rating}</p>
                </div>
            </div>

            <div className='testimonial-review'>
                <p>{`${review.reviewDescription}`}</p>
            </div>
        </div>
    )
}

export default TestimonialCard
