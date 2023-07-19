import Joi from "joi";

export const sizeSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Không được bỏ trống tên",
    "any.required": "Trường 'tên' là bắt buộc",
  })
});