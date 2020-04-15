import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {GreyWhiteButton} from "../shared/Buttons"
import { Title } from "../shared/Text"

const PostReply = styled.div`
    float:right;
`;

const PostPrice = styled.div`
    font-weight: normal;
    font-size:1em;
    margin: 5px 0px;
`;

const CopyLink =  styled.div`
    font-weight: normal;
    font-size:0.9em;
    text-decoration:underline;
    color: grey;
    margin: 10px auto;
`;
const PostLocation = styled.div`
    font-weight: normal;
    font-size:0.9em;
    margin: 5px 0px;
`;

const PostText = styled.div`
    font-size:0.8em
    margin: 5px 0px;
`;

const PostDateTime = styled.div`
    font-size:0.7em;
    font-weight:bold;
    margin: 5px 0px;
`;

const PostImg = styled.img`
    max-height:400px;
    margin: 5px 0px;
`;

function PostDetail({ match }) {

    const postID = match.params.id;
    //eslint-disable-next-line
    const [postDetails, setPostDetails] = useState(null)

    useEffect(() => {
        console.log("Loading post details")
        fetch(`${process.env.REACT_APP_API_URL}/posts/${postID}`)
        .then((response) => {
            return response.json();
        })
        .then((post) => {
            setPostDetails(post) 
        });
    }, [setPostDetails, postID])

    const imgURL = "http://list.thestoke.ca/photos/"+postID+"/original.jpg";
    
    const createMarkup = sanitizedHTML => { return {__html: sanitizedHTML} }

    const replyToPost = () => {window.location.href = `mailto:list-${postID}@thestoke.ca`;}

    const getPostLocation = postDetails => {
        const text = <PostLocation>{postDetails.location}</PostLocation>
        if (postDetails.exactLocation && postDetails.exactLocation.coordinates) {
            const href = `https://www.google.com/maps/search/?api=1&query=${postDetails.exactLocation.coordinates[1]},${postDetails.exactLocation.coordinates[0]}`
            return <a rel="noopener noreferrer" target="_blank" href={href}>{text}</a>
        } else {
            return text
        }          
    }

    return (<div>
            {postDetails === null ? 
                <div>Loading...</div>
            :
                <div>
                    <PostReply>
                        <GreyWhiteButton onClick={replyToPost}>Reply to Post</GreyWhiteButton>
                        <CopyToClipboard text={`list-${postID}@thestoke.ca`}>
                            <CopyLink>Copy Email Address</CopyLink>
                        </CopyToClipboard>
                    </PostReply>
                    <Title>{postDetails.title}</Title>
                    <PostPrice>{postDetails.price}</PostPrice>
                    {getPostLocation(postDetails)}
                    {postDetails.photoFileSize !== null ? <PostImg src={imgURL} alt="Post"/> : null}
                    <PostText dangerouslySetInnerHTML={createMarkup(postDetails.description)} />
                    <PostDateTime>{postDetails.created_at}</PostDateTime>
                </div>
            }
    </div>)
}

export default PostDetail