import React from "react";
import { Route } from "react-router-dom";

// pages
import PostList from "./posts/PostList";
import PostDetail from "./posts/PostDetail"
import PostCreate from "./posts/PostCreate"
import GarageMap from "./posts/GarageMap"
import Header from "./shared/Header";
import { StokeListContainer } from "./shared/Layouts"

function MainApp() {
    return <StokeListContainer className="App">
        <Route path="/" component={Header} />
        <Route exact path="/" component={PostList} />
        <Route exact path="/post" component={PostCreate} />
        <Route exact path="/post/:id" component={PostDetail} />
        <Route exact path="/garage/" component={GarageMap} />

    </StokeListContainer>
}

export default MainApp
