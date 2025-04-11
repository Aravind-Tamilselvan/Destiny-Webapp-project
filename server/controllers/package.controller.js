import Review from "../models/review.model.js";
import Package from "../models/package.model.js";
import cloudinary from "../lib/cloudinary.js";
import pLimit from "p-limit";

export const getAllPackages = async (req, res) => {
    try {
        const packages = await Package.find({})
        if (!packages) {
            return res.status(500).json({ message: "No packages found" })
        }
        res.status(200).json({ packages })
    } catch (error) {
        console.log(`Error in getAllPackages controller:${error}`)
        res.status(500).json({ error: "Internal Server error" })
    }
}

export const allReviews = async (req, res) => {
    try {
        const reviews = await Review.find()
            .populate('user', 'img name') 
            .populate('packageReview', 'name') 
            .limit(5); 

        if (!reviews) {
            return res.status(500).json({ message: "Reviews not found" })
        }
        res.status(200).json({ reviews })
    } catch (error) {
        console.error(`Error in allReviews controller: ${error}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getPackageType = async (req, res) => {
    try {
        const packageType = req.params.packageType
        const packages = await Package.find({ packageType })
        if (packages.length === 0) {
            return res.status(500).json({ message: "No packages found" })
        }
        res.status(200).json({ packages })
    } catch (error) {
        console.log(`Error in getPackageType controller: ${error}`)
        res.status(500).json({ error: "Internal Server error" })
    }
}

export const getCustmoizablePackage = async (req, res) => {
    try {
        const packages = await Package.find({ customizablePackage: true })
        if (packages.length === 0) {
            return res.status(500).json({ message: "No customizable package available right now" })
        }
        res.status(200).json({ packages })
    } catch (error) {
        console.log(`Error in getCustimizablePackage controller: ${error}`)
        res.status(500).json({ error: "Internal Server error" })
    }
}

export const postPackage = async (req, res) => {
    try {
        const { name, description, image, packageDetails, packageType, availability, language, location, customizablePackage } = req.body
        const newPackage = new Package({
            name,
            description,
            image: image,
            packageDetails,
            packageType,
            availability,
            language,
            location,
            customizablePackage
        })
        await newPackage.save()
        res.status(201).json({ message: "Package created successfully", newPackage })
    } catch (error) {
        console.log(`Error in postPackage controller: ${error}`)
        res.status(500).json({ error: "Internal Server error" })
    }
}

export const getAllReviews = async (req, res) => {
    try {
        const packageId = req.params.id
        const findPackage = await Package.findById(packageId)
        if (!findPackage) {
            return res.status(400).json({ message: "Package not found" })
        }
        const reviews = await Review.find({ packageReview: packageId }).populate("user")
        if (!reviews) {
            return res.status(400).json({ message: "No reviews found" })
        }
        res.status(200).json({ reviews })
    } catch (error) {
        console.log(`Error in getAllReviews controller: ${error}`)
        res.status(500).json({ error: "Internal Server error" })
    }
}

export const reviewPost = async (req, res) => {
    const limit = pLimit(5);
    try {
        const { rating, reviewDescription, images } = req.body;
        const userId = req.user._id;
        const packageId = req.params.id;

        const packageExists = await Package.findById(packageId);
        if (!packageExists) {
            return res.status(400).json({ message: "Package does not exist" });
        }

        if (!userId) {
            return res.status(400).json({ message: "User does not exist" });
        }

        if (!rating || !reviewDescription) {
            return res.status(400).json({ error: "Review must contain a rating and description" });
        }

        let uploads = [];

        if (Array.isArray(images) && images.length > 0) {
            const imagesToUpload = images.map((img) => {
                return limit(async () => {
                    try {
                        const result = await cloudinary.uploader.upload(img);
                        return result.secure_url; // Only storing the URL
                    } catch (err) {
                        console.error("Cloudinary Upload Error:", err);
                        return null;
                    }
                });
            });

            uploads = await Promise.all(imagesToUpload);
            uploads = uploads.filter(img => img !== null); // Remove failed uploads
        }

        console.log(uploads)

        const newReview = new Review({
            user: userId,
            packageReview: packageId,
            rating,
            image: uploads,
            reviewDescription,
        });

        packageExists.reviews.push(newReview)
        await newReview.save();
        await packageExists.save()
        res.status(201).json({ message: "Review uploaded successfully", review: newReview });

    } catch (error) {
        console.error(`Error in reviewPost controller: ${error}`);
        res.status(500).json({ error: `Internal Server Error: ${error}` });
    }
};

export const updateHelpfulCount = async (req, res) => {
    try {
        const reviewId = req.params.id;
        const userId = req.user._id;

        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        const alreadyHelpful = review.helpfulCount.includes(userId);

        if (alreadyHelpful) {
            // If user already upvoted, remove their like
            review.helpfulCount = review.helpfulCount.filter(id => id.toString() !== userId.toString());
        } else {
            // Otherwise, add their like
            review.helpfulCount.push(userId);
        }

        await review.save();

        res.status(200).json({
            message: alreadyHelpful ? "Unliked" : "Liked",
            helpfulCount: review.helpfulCount.length
        });

    } catch (error) {
        console.error(`Error in updateHelpfulCount controller: ${error}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

