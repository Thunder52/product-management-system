import jwt from 'jsonwebtoken'


export const authenticate=async(req,res,next)=>{
    const token=req.cookies.token;
    if(!token){
        return res.status(400).send('invalid token');
    }
    try {
        const decode=jwt.verify(token,process.env.JWT_SECRET);
        req.id=decode.id;
        req.role=decode.role;
        next();

    } catch (error) {
        res.send('something wents wrong');
        console.log(error);
    }
}

export const authorize=(req,res,next)=>{
    const role=req.role;
    if(role==='user'){
        return res.status(400).send('unauthorize user');
    }
    next();
}