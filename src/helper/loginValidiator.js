import Joi from "joi";

const validiate=(schema)=>(payload)=>schema.validate(payload,{abortEarly:false});

const userSchema=Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().min(6).max(100).required(),
});

export default validiate(userSchema);