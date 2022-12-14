import mongoose from "mongoose";

const dbConnect = () => {
  mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};


export default dbConnect