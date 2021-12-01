import React from 'react'
import styled from 'styled-components'

const ReportContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1em 0;
`

const Title = styled.div`
    width: 10em;
    font-size:0.9em;
    font-weight:bold;
    color: #434653;
`
const Content = styled.div`
    flex-grow: 1;
    font-size:0.9em;
    color: #434653;
`

//Generates a full width summary for a post, can be disabled
function PostReport({ report }) {
    return (
        <ReportContainer>
            <div className="flexed-row">
                <Title>Reason</Title>
                <Content><b>{report.reason}</b></Content>
            </div>
            <div className="flexed-row">
                <Title>Comment</Title>
                <Content>{report.comment}</Content>
            </div>
        </ReportContainer>
    )
}

export default PostReport
