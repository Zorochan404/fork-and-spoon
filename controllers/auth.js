import user from "../models/userSchema.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"



export const signup = async(req,res) => {

    try {
        if (!req.body.password) {
            return res.status(400).json({ error: "Password is required" });
        }
        const password = req.body.password.toString()
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt);
        const newuser = new user({...req.body, password: hash})

        await newuser.save()
        res.status(200).send("User created")
    } catch (error) {
        console.log (error)
        res.status(500).send(error)
    }
}



export const login = async (req, res) => {
    try {
        const users = await user.findOne({ email: req.body.email });
        if (!users) {
            console.log('Incorrect email');
            return res.status(404).json({ error: "Incorrect email" });
        }


        if (!users.password) {
            console.log('Password field missing in user object');
            return res.status(500).json({ error: "Internal Server Error" });
        }

        const isCorrect = await bcrypt.compare(req.body.password.toString(), users.password);
        if (!isCorrect) {
            console.log('Incorrect password');
            return res.status(401).json({ error: "Incorrect password" });
        }

        const { password, ...others } = users._doc;
        const token = jwt.sign({ id: users._id }, process.env.JWT);
        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json({others,token});
        console.log('Logged in');
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred");
    }
};








export const logout = async (req, res) => {
    try {
        res.cookie('access_token', null, {
            httpOnly: true,
            expires: new Date(0) 
        }).status(200).json('Logged Out');
    } catch (error) {
        console.log(error);
    }
};
