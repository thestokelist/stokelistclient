import { useState, useEffect } from 'react'

export const usePosts = (url) => {
    const [posts, setPosts] = useState([])
    const [offset, setOffset] = useState(null)

    const loadMorePosts = async () => {
        const currentOffset = offset === null ? 0 : offset + 50
        setOffset(currentOffset)
        const response = await fetch(`${url}?offset=${currentOffset}`)
        const morePosts = await response.json()
        setPosts(posts.concat(morePosts))
    }
    return [posts, loadMorePosts]
}

export const useMountEffect = (fun) => useEffect(fun, [])
