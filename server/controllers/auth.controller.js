import bcrypt from "bcryptjs"
import User from "../models/user.model.js"
import generateToken from "../utils/generateToken.js"
import cloudinary from "../lib/cloudinary.js"

export const register = async (req, res) => {
    try {
        const { name, email, password,phoneNo, address } = req.body;

        const user = await User.findOne({ phoneNo });
        if (user) {
            return res.status(400).json({ message: "User already exists,please Login." });
        }

        const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await new User({
            name,
            email,
            password : hashedPassword,
            phoneNo,
            address
        })
        
        if(newUser){
            generateToken(newUser._id, res)                                                                               
            await newUser.save()
            newUser.password = null
            res.status(200).json({message:"User created successfully",newUser})
        }else{
            res.status(400).json({error:"Invalid user data"})
        }

    } catch (error) {
        console.error(`Error in register controller: ${error}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const login = async(req,res) =>{
    try {
        const {email,password} = req.body
        const user = await User.findOne({email})
        const isPasswordCorrect = await bcrypt.compare(password,user?.password)

        if(!user||!isPasswordCorrect){
            return res.status(400).json({error:"Invalid email or password"})
        }

        generateToken(user._id,res);
        user.password = null
        res.status(200).json({message:`${user._id} user id login successful`,user})
    } catch (error) {
        console.log(`Error in login controller: ${error}`)
        res.status(500).json({error:"Internal Server error"})
    }
}

export const logout = async(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge : 0})
        res.status(200).json({message:"Logout successful"})
    } catch (error) {
        console.log(`Error in logout controller: ${error}`)
        res.status(500).json({error:"Internal Server error"})
    }
}

export const getProfile = async(req,res)=>{
    try {
        const user = await User.findOne({_id : req.user._id})
        res.status(200).json(user)
    } catch (error) {
        console.log(`Error in getMe controller: ${error}`)
        res.status(500).json({error:"Internal Server error"})
    }
}

export const updateUser = async(req,res)=>{
    const{img,name,email,address,phoneNo} = req.body
    const userId = req.user._id

    let profileImg;
    try {
        let user = await User.findById(userId);
		if (!user) return res.status(404).json({ message: "User not found" });

        if (img) {
			if (user.img) {
				// https://res.cloudinary.com/dyfqon1v6/image/upload/v1712997552/zmxorcxexpdbh8r0bkjb.png
				await cloudinary.uploader.destroy(user.img.split("/").pop().split(".")[0]);
			}

			const uploadedResponse = await cloudinary.uploader.upload(img,{folder:`${userId}/profile-Img/`});
			profileImg = uploadedResponse.secure_url;
		}


        user.img = profileImg || user.img
        user.name = name || user.name,
        user.email = email || user.email,
        user.address = address || user.address
        user.phoneNo = phoneNo || user.phoneNo

        user = await user.save();

		// password should be null in response
		user.password = null;

		return res.status(200).json(user);
    } catch (error) {
        console.log("Error in updateUser: ", error.message);
		res.status(500).json({ error: error.message });
    }
}


