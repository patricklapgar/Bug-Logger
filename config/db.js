const mongoose = require('mongoose')
const connectDB = async () => {
    try {
        const connection = await mongoose.connect(
            '<URI_GOES_HERE>'
            ,{
            useNewUrlParser:true,
            useUnifiedTopology: true,
            }
        )
        console.log('MongoDB Connected')

    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectDB