const NotificationServices = require("../services/NotificationServices")

class NotificationControllers {

    async read(req, res, next) {
        try {
            const notificationId = req.params.id
            await NotificationServices.read(notificationId)

            res.status(200).json({ success: true })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }
}

module.exports = new NotificationControllers()