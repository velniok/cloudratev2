const toCamelCase = (str) => {
    return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

const mapToCamelCase = (obj) => {
    return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [toCamelCase(key), value])
  )
}

module.exports = mapToCamelCase