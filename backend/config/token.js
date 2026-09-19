import jwt from 'jsonwebtoken'

const genToken =(userId) =>{
    try{
        const token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"7d"})
        return token;
    }catch(err){
        console.log("token error")
    }
}
export default genToken;
