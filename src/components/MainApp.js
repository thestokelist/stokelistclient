import React from "react";
import { Route } from "react-router-dom";

// pages
import PostList from "./posts/PostList";
import PostDetail from "./posts/PostDetail"
import PostCreate from "./posts/PostCreate"
import Header from "./shared/Header";

function MainApp() {
    return <div className="App">
        <Route path="/" component={Header} />
        <Route exact path="/" component={PostList} />
        <Route exact path="/post" component={PostCreate} />
        <Route exact path="/post/:id" component={PostDetail} />

    </div>
}

export default MainApp
