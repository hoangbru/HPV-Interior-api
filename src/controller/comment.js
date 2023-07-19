import Comment from "../models/comment.js"


export const create = async (req, res) => {
    try {
        const comment = await new Comment(req.body).save();
        res.json({message: "Thêm bình luận thành công",comment})
    } catch (error) {
        console.log(error);
        res.status(400).json(
            { message: "Không thêm bình luận được" }
        )
    }
}

export const getAll = async (req, res) => {
    try {
      const comments = await Comment.find().populate({
        path: 'productId',
        select: 'name thumbnail',
      }).populate({
        path: 'idUser',
        select: 'username email img',
      });
      res.status(200).json({
        message: 'Lấy tất cả bình luận thành công',
        comments,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
};

export const getbyProduct = async (req, res) => {
    const { productId } = req.params;
    try {
        const comments = await Comment.find({ productId: productId }).populate(
          {
            path: 'idUser',
            select: 'username email img',
          }
        ).populate(
          {
            path: 'productId',
            select: 'name thumbnail',
          })
        if (!comments) {
            return res.status(404).json({
                message: 'Không tìm thấy bình luận',
            });
        }
        return res.status(200).json({
            message: 'Lấy thành công comment',
            comments,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

export const getOneComment = async (req, res) => {
    const { id } = req.params;

    try {
        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({
                message: 'Không tìm thấy bình luận',
            });
        }
        return res.status(200).json({
            message: "Lấy thành công comment",
            comment,
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}

export const update = async (req, res) => {
    const condition = { _id: req.params.id }
    const update = req.body
    try {
        const comment = await Comment.findOneAndUpdate(condition, update).exec()
        res.json({
            message: "Update thành công comment",
            comment,
        })
    } catch (error) {
        res.status(400).json(
            { message: "Không cập nhật được bình luận" }
        )
    }
}

export const remove = async (req, res) => {
    try {
      const id = req.params.id;
      const comment = await Comment.findById(id);
      if (!comment) {
        return res.status(404).json({
            message: "Không tìm thấy comment",
        });
    }
      await Comment.delete({ _id: id});
      return res.status(200).json({
        message: "Xoá comment thành công",
      });
    } catch (error) {
      return res.status(400).json({
        message: error,
      });
    }
};

export const forceDelete = async (req, res) => {
    try {
      const id = req.params.id;
      const comment = await Comment.findById(id);
      if (!comment) {
        return res.status(404).json({
            message: "Không tìm thấy Comment",
        });
    }
      await Comment.deleteOne({ _id: id });
      return res.status(200).json({
        message: "Xoá Comment thành công",
      });
    } catch (error) {
      return res.status(400).json({
        message: error,
      });
    }
  };

