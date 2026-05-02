import Joi from "joi";

export const memberSchema = Joi.object({
  name: Joi.string().min(3).required(),
  memberId: Joi.string().required(),
  mobile: Joi.string().length(10).required(),
});