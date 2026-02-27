const ArtistServices = require("../services/ArtistServices")

class ArtistControllers {
    async create(req, res) {
        try {
            const { name, soundcloudUrl, avatarUrl } = req.body
            const artist = await ArtistServices.createArtist([name, soundcloudUrl, avatarUrl])

            res.status(201).json({artist})
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: "Не удалось создать артиста"
            })
        }
    }

    async get(req, res) {
        try {
            const artists = await ArtistServices.getAllArtists()

            res.status(200).json({artists})
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: "Не удалость получить артистов"
            })
        }
    }

    async getOne(req, res) {
        try {
            const artistId = req.params.id
            const artist = await ArtistServices.getArtistById(artistId)

            res.status(200).json({artist})
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: "Не удалость получить артиста"
            })
        }
    }

    async update(req, res) {
        try {
            const artistId = req.params.id
            const { name, avatarUrl, soundcloudUrl } = req.body
            const artist = await ArtistServices.updateArtistById(artistId, [name, avatarUrl, soundcloudUrl])

            res.status(200).json({artist})
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: "Не удалось изменить артиста"
            })
        }
    }

    async search(req, res) {
        try {
            const { search } = req.query
            const artists = await ArtistServices.searchArtistsByName(search)

            res.status(200).json({artists})
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: "Не удалось найти артиста"
            }) 
        }
    }

    async delete(req, res) {
        try {
            const artistId = req.params.id
            await ArtistServices.deleteArtistById(artistId)

            res.status(200).json({
                message: 'Артист удален'
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: "Не удалость удалить артиста"
            })
        }
    }
}

module.exports = new ArtistControllers()