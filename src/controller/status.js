import Status from '../models/status.js';

export const getAll = async (req, res) => {
    try {
        const data = await Status.find()
        if (data.length == 0) {
            return res.status(203).json({
                message: "Không có trạng thái",
            });
        }
        return res.status(200).json(data);
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
}

export const get = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Status.findById(id)
        if (!data) {
            return res.status(200).json({
                message: "Không có trạng thái"
            });
        }
        return res.status(200).json(data);
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
}