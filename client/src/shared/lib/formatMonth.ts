const months = [
    'Январь', 'Февраль', 'Март',
    'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь',
    'Октябрь', 'Ноябрь', 'Декабрь'
]

const pluralizeMonths = [
    'Января', 'Февраля', 'Марта',
    'Апреля', 'Мая', 'Июня',
    'Июля', 'Августа', 'Сентября',
    'Октября', 'Ноября', 'Декабря'
]

export const getMonth = (dateStr: string, type = 'months') => {
    const month = new Date(dateStr).getUTCMonth()
    if (type === 'months') return months[month]
    if (type === 'pluralize') return pluralizeMonths[month]
}