//this reducer doesn't rely on previous state
export const searchLoadReducer = (previousState, action) => {
    if (action.type === 'loadStart') {
        return { searchLoading: true, searchLoaded: false }
    }
    if (action.type === 'loadReset') {
        return { searchLoading: false, searchLoaded: false }
    }
    if (action.type === 'loadSuccess') {
        return { searchLoading: false, searchLoaded: true }
    }
}
