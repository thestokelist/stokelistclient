import React from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom";

const PostDetail = styled.div`
    font-weight: bold;
    display: flex;
    margin-bottom:10px;
`;

const PostDetailRight = styled(PostDetail)`
    float:right;
`;

const PostImageContainer = styled.div`
    min-width: 160px;
    min-height: 120px;
    box-sizing:border-box;
    margin-right:20px;
    background-color: lightgrey;
`;

const PostImage = styled.img`
`

const PostDetailsContainer = styled.div`
    flex-grow: 1;
    box-sizing:border-box;
`;

const PostTextSummary = styled.div`
    margin-top: 15px;
    max-height:40px;
    text-overflow:ellipsis;
    overflow: hidden;
    font-size:0.7em;
`;

const PostSummaryContainer = styled.div`
    display: flex;
    margin: 10px 0;
`;

function PostSummary({post}) {

    let imgURL = post.photoFileSize ? "https://list.thestoke.ca/photos/"+post.id+"/thumb.jpg" : "https://list.thestoke.ca/images/placeholder.png";
    
    const createMarkup = sanitizedHTML => { return {__html: sanitizedHTML} }

    return (<PostSummaryContainer>
                <PostImageContainer>
                <Link to={`/post/${post.id}`}><PostImage src={imgURL} alt={"thumbnail"} /></Link>    
                </PostImageContainer>
                <PostDetailsContainer>
                    <PostDetailRight>{post.location}</PostDetailRight>
                    <PostDetail><Link to={`/post/${post.id}`}>{post.title}</Link></PostDetail>
                    <PostDetail>{post.price}</PostDetail>
                    <PostTextSummary dangerouslySetInnerHTML={createMarkup(post.description)} />
                </PostDetailsContainer>
            </PostSummaryContainer>)
}

export default PostSummary