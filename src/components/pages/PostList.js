import React, { useEffect, useState, Fragment } from 'react'
import styled from 'styled-components'
import PostSection from '../posts/PostSection'
import { useMemo } from 'react'

const SearchBox = styled.input`
    padding: 10px 0px;
    width: 50%;
    text-align: center;
    box-sizing: border-box;
    border: solid grey 1px;
    border-radius: 5px;
`

const SearchButton = styled.button`
    border-radius: 5px;
`

const SearchBar = styled.div`
    margin: 40px auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
`

const MoreButton = styled.button`
    width: 150px;
    height: 30px;
    background-color: blue;
    border-radius: 5px;
    color: white;
    font-weight: bold;
    display: block;
    margin: 0 auto;
`

function PostList() {
    const [latestPosts, setLatestPosts] = useState([])
    const [stickyPosts, setStickyPosts] = useState([])
    const [searchPosts, setSearchPosts] = useState([])

    const [offset, setOffset] = useState(0)
    const [searchOffset, setSearchOffset] = useState(0)
    const [searchTerm, setSearchTerm] = useState('')
    const [searchLoaded, setSearchLoaded] = useState(false)
    const [searchLoading, setSearchLoading] = useState(false)

    const showSearchResults = useMemo(() => searchLoading || searchLoaded, [
        searchLoading,
        searchLoaded,
    ])

    useEffect(() => {
        async function loadData() {
            console.log('Loading latest posts')
            const stickyResponse = await fetch(
                `${process.env.REACT_APP_API_URL}/posts/sticky`
            )
            const stickyPosts = await stickyResponse.json()
            setStickyPosts(stickyPosts)
            const latestResponse = await fetch(
                `${process.env.REACT_APP_API_URL}/posts`
            )
            const latestPosts = await latestResponse.json()
            setLatestPosts(latestPosts)
        }
        loadData()
        //Run only once so [] dependency
    }, [])

    const loadMoreLatestPosts = async () => {
        const currentOffset = offset + 50
        setOffset(currentOffset)
        const latestResponse = await fetch(
            `${process.env.REACT_APP_API_URL}/posts?offset=${currentOffset}`
        )
        const moreLatestPosts = await latestResponse.json()
        setLatestPosts(latestPosts.concat(moreLatestPosts))
    }

    const doSearch = async (event) => {
        setSearchLoading(true)
        setSearchLoaded(false)
        if (searchTerm === '') {
            setSearchPosts([])
        } else {
            const searchResponse = await fetch(
                `${process.env.REACT_APP_API_URL}/posts/search?term=${searchTerm}`
            )
            const searchPosts = await searchResponse.json()
            setSearchLoaded(true)
            setSearchLoading(false)
            setSearchPosts(searchPosts)
        }
    }

    const loadMoreSearchPosts = async () => {
        const currentOffset = searchOffset + 50
        setSearchOffset(currentOffset)
        const moreSearchResponse = await fetch(
            `${process.env.REACT_APP_API_URL}/posts/search?term=${searchTerm}&offset=${currentOffset}`
        )
        const moreSearchPosts = await moreSearchResponse.json()
        setSearchPosts(searchPosts.concat(moreSearchPosts))
    }

    const updateSearchTerm = (event) => {
        const newSearchTerm = event.target.value
        setSearchTerm(newSearchTerm)
        if (newSearchTerm === '') {
            setSearchLoaded(false)
        }
    }

    const getSearchSection = () => {
        if (searchLoading) {
            return <div>Loading...</div>
        } else if (searchLoaded) {
            return (
                <PostSection
                    title="Search Results"
                    posts={searchPosts}
                    hideEmpty={false}
                >
                    {searchPosts.length === 50 && (
                        <MoreButton onClick={loadMoreSearchPosts}>
                            More Results
                        </MoreButton>
                    )}
                </PostSection>
            )
        } else {
            return null
        }
    }

    const getLatestSection = () => {
        return (
            <Fragment>
                <PostSection
                    title="Sticky Posts"
                    posts={stickyPosts}
                    hideEmpty={true}
                />
                <PostSection
                    title="Latest Posts"
                    posts={latestPosts}
                    hideEmpty={false}
                >
                    <MoreButton onClick={loadMoreLatestPosts}>
                        More Posts
                    </MoreButton>
                </PostSection>
            </Fragment>
        )
    }

    return (
        <Fragment>
            <SearchBar>
                <SearchBox type="text" onChange={updateSearchTerm} />
                <SearchButton onClick={doSearch}>Search</SearchButton>
            </SearchBar>
            {showSearchResults ? getSearchSection() : getLatestSection()}
        </Fragment>
    )
}

export default PostList
