import cloudinary from "cloudinary"
// import dotenv from "dotenv"

// dotenv.config()

const cloudinaryConnect = () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDI_NAME,
        api_key: process.env.CLOUDI_API_KEY,
        api_secret: process.env.CLOUDI_API_SECRET
    });
}

export default cloudinaryConnect