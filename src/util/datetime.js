import moment from 'moment';

export const getDateRangeString = (start,end) => {
    let retString = ''
    const startTime = moment(start, moment.ISO_8601)
    const endTime = moment(end, moment.ISO_8601)
    const sameDay = startTime.isSame(endTime, 'day');
    if (sameDay) {
        retString = `${startTime.format('L')} · ${startTime.format('LT')} - ${endTime.format('LT')}`
    } else {
        retString = `${startTime.format('lll')} - ${endTime.format('lll')}`
    }
    return retString
}