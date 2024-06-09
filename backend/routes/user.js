import mongoose from "mongoose";
import {Router,json} from "express";
import { User, UserProfile,Follow } from "../database/Schema.js";

import { MONGO_DB_URL, MONGO_DB_COLLECTION } from "../../.moon.config.mjs";

mongoose.connect(MONGO_DB_URL + "/" + MONGO_DB_COLLECTION)

const route = Router();

route.use(json())

route.all("*",(req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","GET,POST");
    next();
})

route.post("/register", async (req, res) => {
    const { email, username, password } = req.body;
    await User.create({ email, username, password });
    const profile = await UserProfile.create({ username, profilePic:"" ,followers: 0, followings: 0, posts: 0});
    await Follow.create({ userId: profile._id, followers: [], followings: [] });
    res.json({ message : `User creted with username : ${username} and userId:${profile._id}` });
})

route.get("/:username",async (req,res)=>{
    const {username}=req.params;
    const profile=await UserProfile.findOne({username});
    if(!profile) return res.status(404).json({message:"User not found"});
    res.json({data: profile});
})

route.get("/:username/followers",async (req,res)=>{
    const {username}=req.params;
    const userId=await UserProfile.findOne({username},{userId:1});
    const followers=await Follow.findOne({userId},{followers:1});
    res.status(200).json({data:followers});
})

route.get("/:username/followings",async (req,res)=>{
    const {username}=req.params;
    const userId=await UserProfile.findOne({username},{userId:1});
    const followings=await Follow.findOne({userId},{followings:1});
    res.status(200).json({data:followings});
})

route.post("/:user/follow/:friend", async (req, res) => {
    const {user,friend}=req.params;
    const userData = await UserProfile.findOneAndUpdate({username:user},{$inc:{followings: 1}});
    const friendData = await UserProfile.findOneAndUpdate({username:friend},{$inc:{followers: 1}});
    await Follow.updateOne({userId:userData._id},{$push:{followings:friendData._id}});
    await Follow.updateOne({userId:friendData._id},{$push:{followers:userData._id}});
    res.status(200).json({ message: `User ${user} followed ${friend}` });
})

route.post("/:user/unfollow/:friend", async (req, res) => {
    const {user,friend}=req.params;
    const userData = await UserProfile.findOneAndUpdate({username:user},{$inc:{followings: -1}});
    const friendData = await UserProfile.findOneAndUpdate({username:friend},{$inc:{followers: -1}});
    await Follow.updateOne({userId:userData._id},{$pull:{followings:friendData._id}});
    await Follow.updateOne({userId:friendData._id},{$pull:{followers:userData._id}});
    res.status(200).json({ message: `User ${user} unfollowed ${friend}` });
})

route.use((error,_,res,__) =>{
    console.log(error)
    res.status(500).json({ message: "Something went wrong in Database" })
})

export default route;