import React from "react";
import { Route } from "react-router-dom";

// pages
import PostList from "./posts/PostList";
import PostDetail from "./posts/PostDetail"

function MainApp() {
    return <div className="App">
        <Route exact path="/" component={PostList} />
        <Route path="/post/:id" component={PostDetail} />
    </div>
}

export default MainApp
