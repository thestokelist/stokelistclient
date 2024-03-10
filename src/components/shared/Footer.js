import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <div className="bg-slate w-full h-auto lg:h-32 box-border ">
            <div className="mx-auto flex flex-col lg:flex-row items-center justify-between w-full h-full max-w-screen-xl py-4 lg:py-0 px-0 lg:px-16">
                <div className="text-white lg:font-medium text-center lg:text-left">
                    <Link to="/terms">
                        <p>Terms & Privacy</p>
                    </Link>
                    <Link to="/commandments">
                        <p>Stoke List Commandments</p>
                    </Link>
                </div>
                {/*eslint-disable-next-line*/}
                <div className="text-white text-3xl lg:text-4xl lg:font-light h-12 mb-2 lg:mb-0 flex">
                    <img src="/title-white.png" className="contained max-w-full max-h-full" alt="white title"/>
                </div>
                <div className="text-white text-center lg:text-right lg:font-light">
                    <div>Copyright 2009-2024</div>
                    <div>All Rights Reserved</div>
                </div>
            </div>
        </div>
    )
}

export default Footer
