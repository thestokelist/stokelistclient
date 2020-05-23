import React, { useState, Fragment, useReducer, useMemo } from 'react'
import styled from 'styled-components'
import { FaSearch } from 'react-icons/fa'

import PostSection from '../posts/PostSection'
import { usePosts, useMountEffect } from '../../hooks'
import { searchLoadReducer } from '../../reducers'
import { WhiteBlueButton } from '../shared/Buttons'
import { endpoints } from '../../constants/endpoints'
import { apiGet } from '../../util/network'

const SearchBox = styled.input`
    flex-grow: 1;
    ::placeholder {
        color: #175e88;
    }
    padding-left: 10px;
    color: #175e88;
    font-size: 1em;
    border: none;
`

const SearchButton = styled.button`
    width: 50px;
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 1px 1px 5px #0000001a;
    border: 1px solid #dce2e8;
    border-radius: 0px 5px 5px 0px;
    opacity: 1;
`

const SearchBar = styled.div`
    height: 50px;
    width: 100%;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    box-shadow: 1px 1px 5px #0000001a;
    border: 1px solid #dce2e8;
    border-radius: 5px;
`
const Strapline = styled.div`
    color: #434653;
    text-align: center;
    margin-bottom:1em;
`

function PostList() {
    const [searchOffset, setSearchOffset] = useState(0)
    const [searchPosts, setSearchPosts] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    const [latestPosts, loadLatestPosts] = usePosts(endpoints.POSTS)
    const [stickyPosts, loadStickyPosts] = usePosts(endpoints.STICKY)

    useMountEffect(() => {
        loadLatestPosts()
        loadStickyPosts()
    })

    const initialState = [{ searchLoaded: false }, { searchLoading: false }]
    const [state, dispatch] = useReducer(searchLoadReducer, initialState)

    const showSearchResults = useMemo(
        () => state.searchLoading || state.searchLoaded,
        [state]
    )

    const doSearch = async (event) => {
        setSearchOffset(0)
        dispatch({ type: 'loadStart' })
        if (searchTerm === '') {
            setSearchPosts([])
            dispatch({ type: 'loadReset' })
        } else {
            const searchResponse = await apiGet(endpoints.SEARCH, {
                term: searchTerm,
            })
            if (searchResponse) {
                const searchPosts = await searchResponse.json()
                setSearchPosts(searchPosts)
                dispatch({ type: 'loadSuccess' })
            } else {
                dispatch({ type: 'loadReset' })
            }
        }
    }

    const loadMoreSearchPosts = async () => {
        const currentOffset = searchOffset + 50
        setSearchOffset(currentOffset)
        const moreSearchResponse = await apiGet(endpoints.SEARCH, {
            term: searchTerm,
            offset: currentOffset,
        })
        if (moreSearchResponse) {
            const moreSearchPosts = await moreSearchResponse.json()
            setSearchPosts(searchPosts.concat(moreSearchPosts))
        }
    }

    const updateSearchTerm = (event) => {
        const newSearchTerm = event.target.value
        setSearchTerm(newSearchTerm)
        if (newSearchTerm === '') {
            dispatch({ type: 'loadReset' })
        }
    }

    const getSearchSection = () => {
        if (state.searchLoading) {
            return <div>Loading...</div>
        } else if (state.searchLoaded) {
            const searchTitle = `Search Results: ${searchTerm}`
            return (
                <PostSection
                    title={searchTitle}
                    posts={searchPosts}
                    hideEmpty={false}
                >
                    {searchPosts.length % 50 === 0 && (
                        <WhiteBlueButton onClick={loadMoreSearchPosts}>
                            More Results
                        </WhiteBlueButton>
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
                    hideDates={true}
                />
                <PostSection
                    title="Latest Posts"
                    posts={latestPosts}
                    hideEmpty={false}
                >
                    <WhiteBlueButton onClick={loadLatestPosts}>
                        Show More
                    </WhiteBlueButton>
                </PostSection>
            </Fragment>
        )
    }

    return (
        <Fragment>
            <Strapline>
                Buy, sell, love, yell – Revelstoke’s online classifieds.
            </Strapline>
            <SearchBar>
                <SearchBox
                    type="text"
                    onChange={updateSearchTerm}
                    placeholder="Search Posts"
                />
                <SearchButton onClick={doSearch}>
                    <FaSearch size={25} color={'#175E88'} />
                </SearchButton>
            </SearchBar>
            {showSearchResults ? getSearchSection() : getLatestSection()}
        </Fragment>
    )
}

export default PostList
