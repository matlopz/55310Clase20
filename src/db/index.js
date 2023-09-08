const mongoose = require('mongoose')

const connectMongo = async () => {
try{
await mongoose.connect('mongodb+srv://matlopz:Dolo2018@product.n2gwuwa.mongodb.net/?retryWrites=true&w=majority')
console.log('db conected')
} catch (err){
console.log(err)
}
}

module.exports = connectMongo