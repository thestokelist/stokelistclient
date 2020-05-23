import { useState, useEffect, useReducer } from 'react'
import { apiGet } from '../util/network'
import { searchLoadReducer } from '../reducers'

export const usePosts = (endpoint) => {
    const [posts, setPosts] = useState([])
    const [offset, setOffset] = useState(null)

    const loadMorePosts = async () => {
        const currentOffset = offset === null ? 0 : offset + 50
        setOffset(currentOffset)
        const response = await apiGet(endpoint, {offset: currentOffset})
        if (response) {
            const morePosts = await response.json()
            setPosts(posts.concat(morePosts))
        }
    }
    return [posts, loadMorePosts]
}

export const useMountEffect = (fun) => useEffect(fun, [])

export const useSearchReducer = () => {
    const initialState = [{ searchLoaded: false }, { searchLoading: false }]
    const [state, dispatch] = useReducer(searchLoadReducer, initialState)

    return [state, dispatch]
}


