import { useEffect, useRef } from "react"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"

const Slider = ({ homePageReviews }) => {
    const sliderRef = useRef(null)


    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.style.setProperty("--quantity", homePageReviews.length)
        }
        const sliderItems = document.querySelectorAll(".homepage-review-item")
        Array.from(sliderItems).forEach((itm, index) => itm.style.setProperty("--position", index + 1))
    }, [])


    return (
        <div className="homepage-review-container">
            <div className="slider" ref={sliderRef}>
                <div className="homepage-review-list">
                    {homePageReviews.length > 0 ? (
                        homePageReviews.map((review) => (
                            <Link to={`/Testimonial-page/${review.packageReview._id}/${review._id}`}>
                                <div className="homepage-review-item" key={review._id}>
                                    <div className="homepage-review-item-userLogo">
                                        <img src={review.user.img || "/assets/avatar-placeholder.png"} alt="testimonial-image" />
                                    </div>
                                    <div className="homepage-review-item-content">
                                        <h4>{`⭐ ${review.rating} / 5`}</h4>
                                        <h2 style={{color:'black'}}>{review.user.name || "Unknown Package"}</h2>
                                        <p style={{color:'black'}}>{review.packageReview.name || "No review description available."}</p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p>No reviews yet...</p>
                    )}
                </div>
            </div>
        </div>

    )
}

export default Slider