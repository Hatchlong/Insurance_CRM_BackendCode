const userLogsModel = require('../../../models/authr/user_log/user_log');


const createUserLogs = async (req, res, next) => {
    try {

        var currentDate = new Date();
        var year = currentDate.getFullYear();
        var month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
        var day = currentDate.getDate();
        var hours = currentDate.getHours();
        var minutes = currentDate.getMinutes();
        var seconds = currentDate.getSeconds();

        // Format the date and time
        var fullDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        const findDetails = await userLogsModel.findOne({ userName: req.body.userName }).lean();
        if (findDetails) {
            const reqBody = {
                userName: req.body.userName,
                logoutTime: '',
                loginTime: fullDate
            }
            await userLogsModel.findOneAndUpdate({ userName: reqBody.userName }, reqBody, { new: true }).exec();
        } else {
            const reqBody = {
                userName: req.body.userName,
                loginTime: fullDate,
                logoutTime: ""
            }
            const userLogsCreated = await new userLogsModel(reqBody);
            const result = userLogsCreated.save();
        }

    } catch (error) {
        console.error(error);
    }
}


const updatedUserLogs = async (req, res, next) => {
    try {

        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
        const day = currentDate.getDate();
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const seconds = currentDate.getSeconds();

        // Format the date and time
        const fullDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        const findDetails = await userLogsModel.findOne({ userName: req.body.userName }).lean();
        if (findDetails) {
            const reqBody = {
                userName: req.body.userName,
                logoutTime: fullDate,
                loginTime: findDetails.findDetails
            }
            await userLogsModel.findOneAndUpdate({ userName: reqBody.userName }, reqBody, { new: true }).exec();
        }

    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    createUserLogs: createUserLogs,
    updatedUserLogs: updatedUserLogs
}