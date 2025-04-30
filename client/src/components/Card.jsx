import React from 'react'
import { Link } from 'react-router-dom';
import { FaPeopleGroup,FaLocationDot,FaLanguage  } from "react-icons/fa6";
import { GrPlan } from "react-icons/gr";


const Card = ({id,name,image,totalSlots,totalDays,totalCost,language,location,packageType}) => {
    const date = new Date()
    const year = date.getFullYear()
    return (
        <div className="card" tabIndex={`${id}`}>
            <img src={`${image[0]}` || "/assets/Destiny.jpg"} className="card-image" alt={`${name}-image`}/>
            <div className="card-content">
                <div className="card-heading">
                    <h3>{`${name}`}</h3>
                    <h3>{`${year}`}</h3>
                </div>
                <div className="card-info">
                    <div className="card-info-content">
                        <FaPeopleGroup />
                        <p>{`${totalSlots}`}people</p>
                    </div>
                    <div className="card-info-content">
                        <FaLocationDot />
                        <p>{`${location}`}</p>
                    </div>
                    <div className="card-info-content">
                        <GrPlan />
                        <p>{`${totalDays} days`}</p>
                    </div>
                    <div className="card-info-content">
                        <FaLanguage />
                        <p>{`${language}`}</p>
                    </div>
                </div>
                <div className="card-price">
                    <div className="card-price-details">
                        <p>{`${totalCost}`}</p>
                        <span>/{`${totalDays}`}days</span>
                    </div>
                    <div className="card-price-button">
                        {/* <Link to={`/packages/${id}/${user?._id}/booking`}><button>Book now</button></Link> */}
                        <Link to={`/packages/${id}`}><button>View More</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
