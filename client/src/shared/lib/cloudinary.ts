export const getOptimizedAvatar = (url: string, width = 200, height = 200) => {
    if (!url) return ''
    const parts = url.split('/upload')
    if (parts.length < 2) return url
    return `${parts[0]}/upload/c_fill,w_${width},h_${height}/${parts[1]}`
}