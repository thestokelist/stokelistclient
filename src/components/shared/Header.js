import React, { useContext, useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'

import { store } from '../store'

function Header() {
    const { state } = useContext(store)

    const amIASmallScreen = () => {
        return window.matchMedia('(max-width: 1024px)').matches
    }
    const [menuOpen, setMenuOpen] = useState(false)
    const [isSmallScreen, setIsSmallScreen] = useState(amIASmallScreen())

    useEffect(() => {
        function handleResize() {
            setIsSmallScreen(amIASmallScreen())
        }

        window.addEventListener('resize', handleResize)
        return (_) => {
            window.removeEventListener('resize', handleResize)
        }
    })

    const toggleMenuOpen = () => {
        setMenuOpen(!menuOpen)
    }

    const showFullMenu = () => {
        return !isSmallScreen || menuOpen
    }

    return (
        <div className="bg-white w-full flex px-4 lg:px-20 flex-col lg:flex-row h-auto lg:h-24 py-4 lg:py-0 box-border items-left lg:items-center justify-between z-10 bottom-shadow">
            <div className="flexed-row justify-between">
                <NavLink to="/">
                    <div className="text-black text-4xl lg:text-5xl font-light">
                        {'//'}the{' '}
                        <span className="font-medium">stoke list.</span>
                    </div>
                </NavLink>
                {isSmallScreen && (
                    <div onClick={toggleMenuOpen}>
                        {menuOpen ? (
                            <FaTimes color={'#175e88'} size={24} />
                        ) : (
                            <FaBars className="border-blue border-solid border-2 rounded p-1 shadow" color={'#175e88'} size={30}/>
                        )}
                    </div>
                )}
            </div>
            <div className="flex justify-center items-center flex-col mt-2 lg:mt-0 lg:flex-row text-gray-400">
                {showFullMenu() && (
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
                        <div className="w-0.5 h-8 bg-gray-400 hidden lg:block" />
                    </div>
                )}
                <div className="flex flex-col lg:flex-row items-center">
                    {showFullMenu() && state.loggedIn && state.isAdmin && (
                        <NavLink
                            className="header-link"
                            activeClassName="header-link-active"
                            exact
                            to="/moderate"
                        >
                            Moderate
                        </NavLink>
                    )}
                    {state.loggedIn
                        ? showFullMenu() && (
                              <NavLink
                                  className="header-link"
                                  activeClassName="header-link-active"
                                  exact
                                  to="/myposts"
                              >
                                  Your Posts
                              </NavLink>
                          )
                        : showFullMenu() && (
                              <NavLink
                                  className="header-link"
                                  activeClassName="header-link-active"
                                  exact
                                  to="/login"
                              >
                                  Login
                              </NavLink>
                          )}

                    <NavLink className="mt-2 lg:mt-0" to="/post">
                        <button className="btn-blue pb-2 lg:pb-0">Create Post</button>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default Header
