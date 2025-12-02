import mongoose from 'mongoose';

// 

const mongoDB = ()=>{
    // console.log('connecting mongodb...',)
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log('Mongodb connected')
    })
    .catch((err)=>{
        console.log('mongodb not connected',err)
    })
}
 
export default mongoDB
    
    