import React, { useEffect, useState, Fragment } from 'react'
import styled from 'styled-components'
import PostSummary from '../posts/PostSummary'
import { Title } from '../shared/Text'

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

const PostSection = styled.div`
    margin: 20px 0;
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

    return (
        <Fragment>
            <SearchBar>
                <SearchBox type="text" onChange={updateSearchTerm} />
                <SearchButton onClick={doSearch}>Search</SearchButton>
            </SearchBar>
            {searchLoading || searchLoaded ? (
                <PostSection>
                    <Title>Search Results</Title>
                    {searchLoading ? <div>Loading...</div> : null}
                    {searchLoaded ? (
                        searchPosts.length > 0 ? (
                            <div>
                                {searchPosts.map((post) => (
                                    <PostSummary post={post} key={post.id} />
                                ))}
                                {searchPosts.length === 50 ? (
                                    <MoreButton onClick={loadMoreSearchPosts}>
                                        More Results
                                    </MoreButton>
                                ) : null}
                            </div>
                        ) : (
                            <div>No Results Found</div>
                        )
                    ) : null}
                </PostSection>
            ) : (
                <Fragment>
                    <PostSection>
                        <Title>Sticky Posts</Title>
                        {stickyPosts.map((post) => (
                            <PostSummary post={post} key={post.id} />
                        ))}
                    </PostSection>
                    <PostSection>
                        <Title>Latest Posts</Title>
                        {latestPosts.map((post) => (
                            <PostSummary post={post} key={post.id} />
                        ))}
                        <MoreButton onClick={loadMoreLatestPosts}>
                            More Posts
                        </MoreButton>
                    </PostSection>
                </Fragment>
            )}
        </Fragment>
    )
}

export default PostList
