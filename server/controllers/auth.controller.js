import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import generateJwtTokenAndSetCookie from "../utils/token.js";

//Register
export const registerAuth = async (req,res)=>{
    try{
        const {username,email,password,confirmPassword,gender,street,state,city,postalCode,country} = req.body;

        if(password != confirmPassword){
            console.log("Password are not equal..!");
            res.status(401).json({error:"Password mismatch.!"});
        }

        const user = await User.findOne({username});
       
        if(user){
            console.log("User already exists..!");
            res.status(409).json({error:"User already exists..!"});
        }else{
            //hash password
            const hashedPassword = await bcrypt.hash(password,10);
            //profile pic generation
            const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
            const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

            const newUser = new User({
                username,
                email,
                password : hashedPassword,
                gender,
                profilePic : gender == "male" ? boyProfilePic : girlProfilePic,
                street,
                state,
                city,
                postalCode,
                country,
                isAdmin : false
            });

            await newUser.save();

            if(newUser){
                await generateJwtTokenAndSetCookie(newUser._id,res);
                res.status(201).json({
                    message : "User created successfully.!",
                    _id : newUser._id,
                    username : newUser.username,
                    profilePic : newUser.profilePic,
                    email : newUser.email,
                    street : newUser.street,
                    city : newUser.city,
                    postalCode : newUser.postalCode,
                    country : newUser.country,
                    isAdmin : newUser.isAdmin
                });
            }else{
                console.log("Invalid user data..!");
                res.status(400).json({error:"Invalid user data..!"});
            }
        }
    }
    catch(error){
        console.log("Internal server Error..!");
        res.status(500).json({error:`Internal server error-${error}`});
    }
    
}


//Login
export const loginAuth = async (req,res)=>{
   try {
    const {email,password} = req.body;

    const user = await User.findOne({email});
    const isPasswordCorrect = bcrypt.compare(password,user?.password || "")

    if(!user || !isPasswordCorrect){
        res.status(400).json({error:'Invalid email or password..!'});
    }
    else{
        await generateJwtTokenAndSetCookie(user._id,res);
        res.status(200).json({
            message : "Login successfull.",
            _id : user._id,
            username : user.username,
            email : user.email
        })
    }
   } catch (error) {
    console.log("Internal server Error..!");
    res.status(500).json({error:`Internal server error-${error}`});
   }
}

export const logoutAuth = (req,res) => {
    try {
        res.cookie("jwt_token", "", {
            maxAge : 0
        });
        res.status(200).json({message:"Logout successfull.!"});
    } catch (error) {
        console.log("Internal server Error..!");
        res.status(500).json({error:`Internal server error-${err.messsage}`});
    }
}
