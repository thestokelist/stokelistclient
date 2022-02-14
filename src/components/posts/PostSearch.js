import React, { useState, Fragment, useMemo, createRef } from 'react'
import { FaSearch, FaRegTimesCircle } from 'react-icons/fa'

import PostSection from '../posts/PostSection'
import Loading from '../shared/Loading'
import { useSearchReducer } from '../../hooks'

import { endpoints } from '../../constants/endpoints'
import { useNetworkRequest } from '../../hooks'

function PostSearch({ children }) {
    const [searchOffset, setSearchOffset] = useState(0)
    const [searchPosts, setSearchPosts] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [searchedTerm, setSearchedTerm] = useState('')
    const searchInputRef = createRef()

    const [state, dispatch] = useSearchReducer()

    const showSearchResults = useMemo(
        () => state.searchLoading || state.searchLoaded,
        [state]
    )

    const { apiGet } = useNetworkRequest()

    const doSearch = async (event) => {
        setSearchOffset(0)
        dispatch({ type: 'loadStart' })
        setSearchedTerm(searchTerm)
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

    const clearSearch = () => {
        setSearchTerm('')
        setSearchedTerm('')
        setSearchPosts([])
        dispatch({ type: 'loadReset' })
        searchInputRef.current.value = ''
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
            return <Loading />
        } else if (state.searchLoaded) {
            const searchTitle = `Search Results: ${searchedTerm}`
            const showMoreButton =
                searchPosts.length > 0 && searchPosts.length % 50 === 0

            const searchClearButton = (
                <FaRegTimesCircle className="mb-2 ml-4 mr-auto" size={40} color={'#175E88'} onClick={clearSearch} />
            )
            return (
                <PostSection
                    title={searchTitle}
                    titleButton={searchClearButton}
                    posts={searchPosts}
                    hideEmpty={false}
                    includeAds={true}
                >
                    {showMoreButton && (
                        <button
                            className="btn-white mx-auto my-0"
                            onClick={loadMoreSearchPosts}
                        >
                            More Results
                        </button>
                    )}
                </PostSection>
            )
        } else {
            return null
        }
    }

    return (
        <Fragment>
            <div className="mb-4 text-lg text-center text-slate font-light">
                Buy, sell, love, yell
                <span className="hidden lg:inline"> – </span>
                <span className="block lg:inline">
                    Revelstoke’s online classifieds.
                </span>
            </div>
            <div className="mb-4 lg:mb-8 rounded-lg gray-border shadow box-border flex flex-row w-full h-12 lg:h-16">
                <input
                    className="flex-grow lg:font-light rounded-lg pl-4 -mr-12 lg:pl-8 text-xl text-blue border-0 placeholder-blue"
                    ref={searchInputRef}
                    type="text"
                    onChange={updateSearchTerm}
                    placeholder="Search Posts"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            doSearch()
                        }
                    }}
                />
                <button
                    className="w-12 bg-white shadow rounded-r-lg border-l border-l-solid border-l-gray-300 bg-opacity-100"
                    onClick={doSearch}
                >
                    <FaSearch size={25} color={'#175E88'} />
                </button>
            </div>
            {showSearchResults ? getSearchSection() : children}
        </Fragment>
    )
}

export default PostSearch
