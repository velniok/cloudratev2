const getPublicId = (url) => {
    const parts = url.split('/upload/')
    const withoutExt = parts[1].replace(/\.[^/.]+$/, '')
    return withoutExt.replace(/^v\d+\//, '')
}

module.exports = getPublicId