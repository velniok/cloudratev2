const ArtistServices = require("../services/ArtistServices")

class ArtistControllers {
    async create(req, res, next) {
        try {
            const { name, soundcloudUrl, avatarUrl } = req.body
            const artist = await ArtistServices.createArtist([name, soundcloudUrl, avatarUrl])

            res.status(201).json({ artist })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    async get(req, res, next) {
        try {
            const artists = await ArtistServices.getAllArtists()

            res.status(200).json({ artists })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    async getOne(req, res, next) {
        try {
            const artistId = req.params.id
            const artist = await ArtistServices.getArtistById(artistId)

            res.status(200).json({ artist })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    async update(req, res, next) {
        try {
            const artistId = req.params.id
            const { name, avatarUrl, soundcloudUrl } = req.body
            const artist = await ArtistServices.updateArtistById(artistId, [name, avatarUrl, soundcloudUrl])

            res.status(200).json({ artist })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    async search(req, res, next) {
        try {
            const { search } = req.query
            const artists = await ArtistServices.searchArtistsByName(search)

            res.status(200).json({ artists })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    async delete(req, res, next) {
        try {
            const artistId = req.params.id
            await ArtistServices.deleteArtistById(artistId)

            res.status(200).json({ message: 'Артист удален' })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }
}

module.exports = new ArtistControllers()