const toCamelCase = (str) => {
    return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

const mapToCamelCase = (obj) => {
    if (Array.isArray(obj)) {
        return obj.map(mapToCamelCase)
    }
    if (obj !== null && typeof obj === 'object') {
        return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [
            toCamelCase(key),
            mapToCamelCase(value)
        ])
        )
    }
    return obj
}

module.exports = mapToCamelCase