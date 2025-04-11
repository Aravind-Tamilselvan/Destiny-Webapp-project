import stripe from "../lib/stripe.js";
import fileOps from "../logs/bookingLog.js";
import Package from "../models/package.model.js";
import User from "../models/user.model.js";
import Booking from "../models/userBooking.model.js";


export const createCheckoutSession = async (req, res) => {
    try {
        const {Doorstep, pickupLocation, emergencyContactPhone, emergencyContactAddress,packageId,amount } = req.body;
        console.log(req.body)

        if (!packageId) {
            return res.status(400).json({ error: "Package ID are required" });
        }

        const travelPackage = await Package.findById(packageId);
        if (!travelPackage) {
            return res.status(404).json({ error: "Package not found" });
        }

        let totalAmount = amount * 100; // Convert to cents

        // Create checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [{
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: travelPackage.name,
                        images : travelPackage.image
                    },
                    unit_amount: totalAmount,
                },
                quantity: 1
            }],
            mode: "payment",
            success_url: `${process.env.CLIENT_URL}/booking-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/booking-cancel`,
            metadata: {
                userId: req.user._id.toString(),
                packageId: packageId.toString(),
                doorstep: Doorstep ? "Yes" : "No",
                pickupLocation: pickupLocation || "N/A",
                emergencyContactPhone: emergencyContactPhone || "N/A",
                emergencyContactAddress: emergencyContactAddress || "N/A",
                totalAmount: (totalAmount / 100).toFixed(2)
            }
        });

        res.status(200).json({ sessionId: session.id, totalAmount: totalAmount / 100 });
        const getUser = await User.findById(req.user._id)
        const formData = {
            Doorstep, pickupLocation, emergencyContactPhone, emergencyContactAddress,packageId,
            userName : getUser.name,
            userId : getUser._id,
            packageName : travelPackage.name
        }
        await fileOps(formData)
    } catch (error) {
        console.error(`Error in checkout session: ${error.message}`);
        res.status(500).json({ error: `Checkout failed: ${error.message}` });
    }
};


export const checkoutSuccess = async (req, res) => {
    try {
        const { sessionId } = req.body;

        if (!sessionId) {
            return res.status(400).json({ error: "Session ID is required" });
        }

        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status !== "paid") {
            return res.status(400).json({ error: "Payment not completed or failed" });
        }

        const newBooking = new Booking({
            userBooking: session.metadata.userId,
            packageBooking: session.metadata.packageId,
            pickupDate: new Date(session.metadata.pickupDate),
            doorstepPickup: session.metadata.doorstepPickup === "true",
            pickupLocation: session.metadata.pickupLocation || "",
            emergencyContactAddress: session.metadata.emergencyContactAddress || "",
            emergencyContactPhone: session.metadata.emergencyContactPhone || "",
            totalAmount: session.amount_total / 100, // Convert from cents to dollars
            stripeSessionId: sessionId,
        });

        await newBooking.save();

        res.status(200).json({
            success: true,
            message: "Payment successful, booking created, and coupon deactivated",
            bookingId: newBooking._id,
        });

    } catch (error) {
        console.error("Error processing successful checkout:", error);
        res.status(500).json({ message: "Error processing successful checkout", error: error.message });
    }
};

