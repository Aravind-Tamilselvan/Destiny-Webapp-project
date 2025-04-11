import { React, useState, useRef } from 'react'
import { IoCloseSharp } from "react-icons/io5";
import { CiImageOn } from "react-icons/ci";
import { BsEmojiSmileFill } from "react-icons/bs";

import toast from 'react-hot-toast';
import usePostReview from '../hooks/usePostReview';
import useUser from '../hooks/useUser';

const PostReview = ({ packageId }) => {
    const {user} = useUser()
    const {postReview} = usePostReview()

    const [rating, setRating] = useState(null)
    const [text, setText] = useState("");
    const [images, setImages] = useState([]);
    const [error, isError] = useState(null)
    const imgRef = useRef(null);

    const data = {
        profileImg: `${user?.img}` || "/assets/avatar-placeholder.png",
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(rating, text, images)
        if (!rating || !text) {
            toast.error("please provide rating and review description")
        }
        postReview({ rating, reviewDescription : text, images, id: packageId })
        setRating(null)
        setText("")
        setImages([])
    };

    const handleImgChange = (e) => {
        const files = Array.from(e.target.files)
        const newImages = []

        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                newImages.push(reader.result);
                if (newImages.length === files.length) {
                    setImages((prev) => [...prev, ...newImages]); // Append new images
                }
            };
            reader.readAsDataURL(file);
        })
    };

    const removeImage = (index) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="review-container" >
            <>
                <div className="avatar">
                    <div className="avatar-img">
                        <img src={data.profileImg} alt='profile-img' />
                    </div>
                </div>
                <form className="form-container" onSubmit={handleSubmit}>
                    <div className="rate">
                        <input type="radio" id="star5" name="rate" value="5" checked={rating === '5'} onChange={(e) => setRating(e.target.value)} />
                        <label htmlFor="star5" title="text">5 stars</label>
                        <input type="radio" id="star4" name="rate" value="4" checked={rating === '4'} onChange={(e) => setRating(e.target.value)} />
                        <label htmlFor="star4" title="text">4 stars</label>
                        <input type="radio" id="star3" name="rate" value="3" checked={rating === '3'} onChange={(e) => setRating(e.target.value)} />
                        <label htmlFor="star3" title="text">3 stars</label>
                        <input type="radio" id="star2" name="rate" value="2" checked={rating === '2'} onChange={(e) => setRating(e.target.value)} />
                        <label htmlFor="star2" title="text">2 stars</label>
                        <input type="radio" id="star1" name="rate" value="1" checked={rating === '1'} onChange={(e) => setRating(e.target.value)} />
                        <label htmlFor="star1" title="text">1 star</label>
                    </div>
                    <textarea
                        className="textarea"
                        placeholder="Post your review..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />

                    {images.length > 0 && (
                        <div className="image-preview-container">
                            {images.map((img, index) => (
                                <div key={index} className="image-preview">
                                    <IoCloseSharp className="close-icon" onClick={() => removeImage(index)} />
                                    <img src={img} className="preview-img" alt="preview" />
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="bottom-section">
                        <div className="icon-group">
                            <CiImageOn
                                className="icon"
                                onClick={() => imgRef.current.click()}
                            />
                            <BsEmojiSmileFill className="icon" />
                        </div>
                        <input type="file" hidden ref={imgRef} onChange={handleImgChange} />
                        <button className="btn">
                            {"Post"}
                        </button>
                    </div>
                    {isError && <div className="error-message">{error}</div>}
                </form>
            </>
        </div >
    )
}

export default PostReview