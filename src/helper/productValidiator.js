import Joi from "joi";

const validate=(schema)=>(payload)=>schema.validate(payload,{abortEarly:false});

const productSchema=Joi.object({
    name:Joi.string().min(5).max(100).required(),
    price:Joi.number().greater(0).required(),
    quantity:Joi.number().min(1).required(),
    manufacturingDate:Joi.date().less('now').required(),
})

export default (validate(productSchema));