import Joi from "joi";

export const commentSchema = Joi.object({
  idUser: Joi.string().required().messages({
    "string.empty": "Không được bỏ trống khach hang",
    "any.required": "Trường 'khach hang' là bắt buộc",
  }),
  description: Joi.string(),
  productId: Joi.string().required().messages({
    "string.empty": "ID sản phẩm bắt buộc nhập",
    "any.required": "Trường ID sản phẩm bắt buộc nhập",
    "string.base": "ID sản phẩm phải là string"
}),
  createdAt: Joi.date().default(() => new Date()),
  updatedAt: Joi.date().default(() => new Date()),
});
