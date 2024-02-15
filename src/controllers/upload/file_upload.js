const uploadFile = require("../../middleware/upload");

const upload = async (req, res) => {
    try {
        await uploadFile(req, res);

        if (req.file == undefined) {
            return res.status(400).send({ message: "Please upload a file!" });
        }

        res.status(200).json({
            status: '1',
            message: "Uploaded the file successfully",
            fileName: req.file.originalname,
        });
    } catch (err) {
        res.status(500).send({
            status: '0',
            message: `Could not upload the file. ${err}`,
        });
    }
};

module.exports = {
    upload: upload
}

