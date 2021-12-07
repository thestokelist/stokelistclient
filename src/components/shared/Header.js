import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import { store } from '../store'

function Header() {
    const { state } = useContext(store)
    return (
        <div className="bg-white w-full flex px-0 lg:px-20 flex-col lg:flex-row h-auto lg:h-24 pb-1 lg:pb-0 box-border items-center justify-between z-10 bottom-shadow">
            <NavLink to="/">
                <div className="text-black text-5xl font-light">
                    {'//'}the <span className="font-medium">stoke list.</span>
                </div>
            </NavLink>
            <div className="flex items-center flex-column lg:flex-row text-gray-400">
                <div className="flexed-row">
                    <NavLink
                        className="header-link"
                        activeClassName="header-link-active"
                        exact
                        to="/"
                    >
                        Home
                    </NavLink>
                    <NavLink
                        className="header-link hidden"
                        activeClassName="header-link-active"
                        exact
                        to="/garage"
                    >
                        Garage Map
                    </NavLink>
                    <div className="w-0.5 h-8 bg-gray-400 hidden md:block" />
                </div>
                <div className="flexed-row">
                    {state.loggedIn && state.isAdmin && (
                        <NavLink
                            className="header-link"
                            activeClassName="header-link-active"
                            exact
                            to="/moderate"
                        >
                            Moderate
                        </NavLink>
                    )}
                    {state.loggedIn ? (
                        <NavLink
                            className="header-link"
                            activeClassName="header-link-active"
                            exact
                            to="/myposts"
                        >
                            Your Posts
                        </NavLink>
                    ) : (
                        <NavLink
                            className="header-link"
                            activeClassName="header-link-active"
                            exact
                            to="/login"
                        >
                            Login
                        </NavLink>
                    )}
                    <NavLink to="/post">
                        <button className="btn-blue">Create Post</button>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default Header
