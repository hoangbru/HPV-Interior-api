import Joi from "joi";

export const colorSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Không được bỏ trống tên",
    "any.required": "Trường 'tên' là bắt buộc",
  }),
  hex: Joi.string().required().messages({
    "string.empty": "Không được bỏ trống màu",
    "any.required": "Trường 'màu' là bắt buộc",
  })
});