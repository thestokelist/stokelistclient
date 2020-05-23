import React from 'react'
import { Route } from 'react-router-dom'

// static pages
import Commandments from './pages/Commandments'
import About from './pages/About'
import Terms from './pages/Terms'

// pages
import PostList from './pages/PostList'
import PostView from './pages/PostView'
import PostCreate from './pages/PostCreate'
import PostEdit from './pages/PostEdit'
import GarageMap from './pages/GarageMap'
import MyPosts from './pages/MyPosts'
import PostValidate from './pages/PostValidate'
import UserLogin from './pages/UserLogin'

//landing pages
import PostSubmitLanding from './pages/landing/PostSubmitLanding'
import LoginLanding from './pages/landing/LoginLanding'
import ValidationFailedLanding from './pages/landing/ValidationFailedLanding'

// header/footer
import Header from './shared/Header'
import Footer from './shared/Footer'

import { StokeListContainer, FlexFullHeightColumn } from './shared/Layouts'

function MainApp() {
    return (
        <FlexFullHeightColumn>
            {/*Header appears at the top of all pages*/}
            <Header />
            <StokeListContainer className="App">
                {/*Routes related to posts*/}
                <Route exact path="/" component={PostList} />
                <Route exact path="/post" component={PostCreate} />
                <Route exact path="/post/:id" component={PostView} />
                <Route exact path="/edit/:id" component={PostEdit} />
                <Route exact path="/post/v/:uuid" component={PostValidate} />
                <Route exact path="/garage/" component={GarageMap} />
                <Route exact path="/myposts" component={MyPosts} />

                {/*Routes related to users*/}
                <Route exact path="/login/:uuid" component={UserLogin} />

                {/* Static Routes */}
                <Route exact path="/about" component={About} />
                <Route exact path="/terms" component={Terms} />
                <Route exact path="/commandments" component={Commandments} />

                {/* Landng Pages */}
                <Route exact path="/submitted" component={PostSubmitLanding} />
                <Route exact path="/loginemail" component={LoginLanding} />
                <Route exact path="/validationfailed" component={ValidationFailedLanding} />
            </StokeListContainer>
            <Footer />
        </FlexFullHeightColumn>
    )
}

export default MainApp
