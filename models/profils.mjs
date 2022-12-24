import mongoose from "mongoose";

const userProfil = new mongoose.Schema({
    username : {
        type : mongoose.Types.ObjectId,
        ref : user,
        required : true,
    },
    // relative to image's link from cloudinary
    url : {                           
        type : String, 
        required : true, 
    },
    public_id : {
        type : String, 
        required : true
    },
    description : {
        type : String, 
    },
    tag : [string]

    
})

const Profil = mongoose.model("profil", userProfil)