const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected");
    } catch(error) {
        console.error(error.message);
        //Exit process with failure
        process.exit(1);
    }
}

// var db = mongoose.connection;
// //Bind connection to error event (to get notification of connection errors)
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = connectDB;

            // useCreateIndex: true,
            // useFindAndModify: false