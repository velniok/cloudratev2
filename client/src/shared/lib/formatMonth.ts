const months = [
    'Январь', 'Февраль', 'Март',
    'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь',
    'Октябрь', 'Ноябрь', 'Декабрь'
]

export const getMonth = (dateStr: string) => {
    const month = new Date(dateStr).getUTCMonth()
    return months[month]
}