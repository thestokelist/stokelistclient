import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import PostSummary from "./PostSummary"

const SearchBox = styled.input`
  padding: 10px 0px;
  width: 50%;
  text-align: center;
  box-sizing:border-box;
  border: solid grey 1px;
  border-radius: 5px;
`;

const SearchButton = styled.button`
    border-radius: 5px;
`;

const SearchBar = styled.div`
    margin: 40px auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const PostSectionHeader = styled.div`
    font-weight: bold;
    font-size:1.2em;
`;

const PostSection = styled.div`
    margin: 20px 6%;
`;

const MoreButton = styled.button`
    width: 150px;
    height: 30px;
    background-color:blue;
    border-radius: 5px;
    color: white;
    font-weight: bold;
    display: block; 
    margin: 0 auto; 
`;


function PostList() {

    const [latestPosts, setLatestPosts] = useState([])
    const [stickyPosts, setStickyPosts] = useState([])
    const [searchPosts, setSearchPosts] = useState([])

    const [offset, setOffset] = useState(0)
    const [searchOffset, setSearchOffset] = useState(0)
    const [searchTerm, setSearchTerm] = useState("")
    const [searchLoaded, setSearchLoaded] = useState(false)
    const [searchLoading, setSearchLoading] = useState(false)

    useEffect(() => {
        console.log("Loading latest posts")
        fetch(`${process.env.REACT_APP_API_URL}/posts/sticky`)
        .then((response) => {
            return response.json();
        })
        .then((posts) => {
            setStickyPosts(posts)
        });
        fetch(`${process.env.REACT_APP_API_URL}/posts`)
        .then((response) => {
            return response.json();
        })
        .then((posts) => {
            setLatestPosts(posts)
        });
     
    }, [setLatestPosts, setStickyPosts])

    const loadMoreLatestPosts = () => {
        const currentOffset = offset+50;
        setOffset(currentOffset)
        fetch(`${process.env.REACT_APP_API_URL}/posts?offset=${currentOffset}`)
        .then((response) => {
            console.log(response)
            return response.json();
        })
        .then((posts) => {
            setLatestPosts(latestPosts.concat(posts))
        });
    }

    const doSearch = event => {
        setSearchLoading(true)
        setSearchLoaded(false)
        if (searchTerm === "") {
            setSearchPosts([])
        } else {
            fetch(`${process.env.REACT_APP_API_URL}/posts/search?term=${searchTerm}`)
            .then((response) => {
                return response.json();
            })
            .then((posts) => {
                setSearchLoaded(true)
                setSearchLoading(false)
                setSearchPosts(posts)
            });   
        }
    }

    const loadMoreSearchPosts = () => {
        const currentOffset = searchOffset+50;
        setSearchOffset(currentOffset)
        fetch(`${process.env.REACT_APP_API_URL}/posts/search?term=${searchTerm}&offset=${currentOffset}`)
        .then((response) => {
            return response.json();
        })
        .then((posts) => {
            console.log(posts)
            setSearchPosts(searchPosts.concat(posts))
        });
    }

    const updateSearchTerm = event => {
        const newSearchTerm = event.target.value;
        setSearchTerm(newSearchTerm)
        if (newSearchTerm === "") {
            setSearchLoaded(false)
        }
    }

    return (<div>
                <SearchBar>
                    <SearchBox type="text" onChange={updateSearchTerm} /><SearchButton onClick={doSearch}>Search</SearchButton>
                </SearchBar>
                {(searchLoading || searchLoaded) ? 
                    <div>
                    <PostSection>
                        <PostSectionHeader>Search Results</PostSectionHeader>
                        {searchLoading ? <div>Loading...</div> : null}
                        {searchLoaded ?
                            searchPosts.length > 0 ?
                                <div>
                                    {searchPosts.map(post => <PostSummary post={post} key={post.id}/>)}
                                    {(searchPosts.length === 50) ? <MoreButton onClick={loadMoreSearchPosts}>More Results</MoreButton> : null}
                                </div>
                                :
                                <div>No Results Found</div>
                        :
                            null
                        }
                    </PostSection>
                    </div>
                :
                    <div>
                    <PostSection>
                        <PostSectionHeader>Sticky Posts</PostSectionHeader>
                        {stickyPosts.map(post => <PostSummary post={post} key={post.id}/>)}
                    </PostSection>
                    <PostSection>
                        <PostSectionHeader>Latest Posts</PostSectionHeader>
                        {latestPosts.map(post => <PostSummary post={post} key={post.id}/>)}
                        <MoreButton onClick={loadMoreLatestPosts}>More Posts</MoreButton>
                    </PostSection>
                    </div>
                }   
            </div>)
}

export default PostList