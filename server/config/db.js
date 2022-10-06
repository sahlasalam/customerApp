const mongoose= require('mongoose');

const connectDB = async () =>{
    mongoose.connect('mongodb://localhost:27017/customer_details', {
        useNewUrlParser: true,
        // useCreateIndex: true,
        useUnifiedTopology: true
    });
    

}


module.exports = connectDB;