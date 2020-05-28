import moment from 'moment'

//Returns a function which checks if the date is the same as the input date
export const sameDate = (date1) => {
    const firstDate = moment(date1, moment.ISO_8601)
    return (date2) => {
        const secondDate = moment(date2, moment.ISO_8601)
        return firstDate.isSame(secondDate, 'day')
    }
}

export const getDateRangeString = (start, end) => {
    let retString = ''
    const startTime = moment(start, moment.ISO_8601)
    const endTime = moment(end, moment.ISO_8601)
    const sameDay = startTime.isSame(endTime, 'day')
    if (sameDay) {
        retString = `${startTime.format('L')} · ${startTime.format(
            'LT'
        )} - ${endTime.format('LT')}`
    } else {
        retString = `${startTime.format('lll')} - ${endTime.format('lll')}`
    }
    return retString
}

export const getPrettyDateString = (date) => {
    const dateTime = moment(date, moment.ISO_8601)
    return dateTime.format('LLL')
}

export const getDatePortionForInput = dateString => {
    const date = moment(dateString, moment.ISO_8601)
    return date.format('YYYY-MM-DD')
}

export const getTimePortionForInput = dateString => {
    const date = moment(dateString, moment.ISO_8601)
    return date.format('HH:mm')

}
