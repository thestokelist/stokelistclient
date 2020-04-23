import React from 'react'
import { Route } from 'react-router-dom'
import { ModalProvider } from 'react-modal-hook'



// pages
import PostList from './pages/PostList'
import PostView from './pages/PostView'
import PostCreate from './pages/PostCreate'
import GarageMap from './pages/GarageMap'
import MyPosts from './pages/MyPosts'
import PostValidate from './pages/PostValidate'
import UserLogin from './pages/UserLogin'
import Header from './shared/Header'
import { StokeListContainer } from './shared/Layouts'

function MainApp() {
    return (
<ModalProvider>
        <StokeListContainer className="App">
            {/*Header appears at the top of all pages*/}
            <Route path="/" component={Header} />

            {/*Routes related to posts*/}
            <Route exact path="/" component={PostList} />
            <Route exact path="/post" component={PostCreate} />
            <Route exact path="/post/:id" component={PostView} />
            <Route exact path="/post/v/:uuid" component={PostValidate} />
            <Route exact path="/garage/" component={GarageMap} />
            <Route exact path="/myposts" component={MyPosts} />

            {/*Routes related to users*/}
            <Route exact path="/login/:uuid" component={UserLogin} />
        </StokeListContainer>
        </ModalProvider>
    )
}

export default MainApp
