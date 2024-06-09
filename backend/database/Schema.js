
import mongoose from "mongoose"

const UserSchema =new mongoose.Schema({
    email : String,
    username : String,
    password : String,
})

const UserProfileSchema = new mongoose.Schema({
    username: {type: String, ref:'User'},
    profilePic : String,
    followers : Number,
    followings : Number,
    posts : Number
})

const FollowSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: 'UserProfile' },
    followers: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    followings:[ { type: mongoose.Types.ObjectId, ref: 'User' }],
});

const User = mongoose.model('User', UserSchema)
const UserProfile = mongoose.model('UserProfile', UserProfileSchema)
const Follow = mongoose.model('Follow', FollowSchema);

export {User, UserProfile,Follow}