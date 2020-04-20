import React from "react";
import { Route } from "react-router-dom";

// pages
import PostList from "./posts/PostList";
import PostDetail from "./posts/PostDetail"
import PostCreate from "./posts/PostCreate"
import GarageMap from "./posts/GarageMap"
import MyPosts from "./posts/MyPosts"
import PostValidate from "./posts/PostValidate"
import Header from "./shared/Header";
import { StokeListContainer } from "./shared/Layouts"

function MainApp() {
    return <StokeListContainer className="App">
        <Route path="/" component={Header} />
        <Route exact path="/" component={PostList} />
        <Route exact path="/post" component={PostCreate} />
        <Route exact path="/post/:id" component={PostDetail} />
        <Route exact path="/post/v/:uuid" component={PostValidate} />
        <Route exact path="/garage/" component={GarageMap} />
        <Route exact path="/myposts" component={MyPosts} />


    </StokeListContainer>
}

export default MainApp
