const GeneralServices = require("../services/GeneralServices")

class GeneralControllers {
    async get(req, res, next) {
        try {
            const general = await GeneralServices.getGenerals()

            res.status(200).json({ general })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }
}

module.exports = new GeneralControllers()