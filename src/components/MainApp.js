import React, { useCallback, useContext } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import { store } from './store'

// static pages
import Commandments from './pages/static/Commandments'
import About from './pages/static/About'
import Terms from './pages/static/Terms'

// pages
import PostList from './pages/PostList'
import PostView from './pages/PostView'
import PostCreate from './pages/PostCreate'
import PostEdit from './pages/PostEdit'
import PostReport from './pages/PostReport'
import GarageMap from './pages/GarageMap'
import MyPosts from './pages/MyPosts'
import PostValidate from './pages/PostValidate'
import UserLogin from './pages/UserLogin'
import Moderate from './pages/Moderate'
import Judge from './pages/Judge'
import Login from './pages/Login'

//landing pages
import PostSubmitLanding from './pages/static/PostSubmitLanding'
import LoginLanding from './pages/static/LoginLanding'
import ValidationFailedLanding from './pages/static/ValidationFailedLanding'
import ErrorLanding from './pages/static/ErrorLanding'
import ReportLanding from './pages/static/ReportLanding'

// header/footer
import Header from './shared/Header'
import Footer from './shared/Footer'

function MainApp() {
    const { state } = useContext(store)

    //Route which checks user is logged in
    const LoggedInRoute = useCallback(
        ({ component: Component, restricted, ...rest }) => {
            return (
                <Route
                    {...rest}
                    render={(props) =>
                        state.loggedIn ? (
                            <Component {...props} />
                        ) : (
                            <Redirect to="/login" />
                        )
                    }
                />
            )
        },
        [state.loggedIn]
    )

    //Route which checks user is logged in and is an admin
    const AdminRoute = useCallback(
        ({ component: Component, restricted, ...rest }) => {
            return (
                <Route
                    {...rest}
                    render={(props) =>
                        state.loggedIn && state.isAdmin ? (
                            <Component {...props} />
                        ) : (
                            <Redirect to="/" />
                        )
                    }
                />
            )
        },
        [state]
    )

    return (
        <div className="flex flex-col items-center m-auto max-w-screen-xl ">
            {/*Header appears at the top of all pages*/}
            <Header />
            <div className="App w-full box-border flex-grow bg-cream px-20 py-8">
                <Switch>
                    {/*Routes related to posts*/}
                    <Route exact path="/" component={PostList} />
                    <Route exact path="/post" component={PostCreate} />
                    {/* (\d+) is regex that restricts these routers to a series of integers */}
                    <Route exact path="/post/:id(\d+)" component={PostView} />
                    <Route exact path="/edit/:id(\d+)" component={PostEdit} />
                    <Route
                        exact
                        path="/report/:id(\d+)"
                        component={PostReport}
                    />
                    <Route
                        exact
                        path="/post/v/:uuid"
                        component={PostValidate}
                    />
                    <Route exact path="/garage/" component={GarageMap} />

                    {/*Routes that require permissions*/}
                    <LoggedInRoute exact path="/myposts" component={MyPosts} />
                    <AdminRoute exact path="/moderate" component={Moderate} />
                    <AdminRoute exact path="/judge/:id" component={Judge} />

                    {/*Routes related to users*/}
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/login/:uuid" component={UserLogin} />

                    {/* Static Routes */}
                    <Route exact path="/about" component={About} />
                    <Route exact path="/terms" component={Terms} />
                    <Route
                        exact
                        path="/commandments"
                        component={Commandments}
                    />

                    {/* Landng Pages */}
                    <Route
                        exact
                        path="/submitted"
                        component={PostSubmitLanding}
                    />
                    <Route exact path="/loginemail" component={LoginLanding} />
                    <Route
                        exact
                        path="/validationfailed"
                        component={ValidationFailedLanding}
                    />
                    <Route
                        exact
                        path="/reported"
                        component={ReportLanding}
                    />
                    <Route component={ErrorLanding} />
                </Switch>
            </div>
            <Footer />
        </div>
    )
}

export default MainApp
