const SearchServices = require("../services/SearchServices")

class SearchControllers {
    async search(req, res, next) {
        try {
            const { search, filter } = req.query
            const userId = req.userId

            const result = {}
            result[filter] = await SearchServices.searchByNameAndFilter(search, filter, userId)

            res.status(200).json({result})
        } catch (err) {
            console.log(err)
            next(err)
        }
    }
}

module.exports = new SearchControllers()