import Joi from "joi";

const validiate=(schema)=>(payload)=>schema.validate(payload,{abortEarly:false});

const userSchema=Joi.object({
    username:Joi.string().min(3).max(100).required(),
    email:Joi.string().email().required(),
    password:Joi.string().min(6).max(100).required(),
});

export default validiate(userSchema);