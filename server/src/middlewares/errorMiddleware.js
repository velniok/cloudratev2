const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500
    const message = err.message || 'Внутренняя ошибка сервера'
    if (err.field) {
        const field = err.field
        return res.status(status).json({ field, message })
    }
    res.status(status).json({ message })
}

module.exports = errorMiddleware