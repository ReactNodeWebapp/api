const mongoose = require('mongoose');
const connectionOptions = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};

mongoose
    .connect(process.env.DB_URI, connectionOptions)
    .then(console.log("DB connected!"))
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../model/user.model')
};