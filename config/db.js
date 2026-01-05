const { default: mongoose } = require('mongoose')
exports. conndb = async (req, res) => {
    try {
        const url = process.env.MONGODB_URL
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('db is connected');
        
    } catch (error) {
        console.log(error);

    }
}