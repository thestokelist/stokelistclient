import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <div className="bg-slate w-full h-auto lg:h-32 px-0 lg:px-16 box-border flex flex-col lg:flex-row items-center justify-between">
            <div className="text-white font-medium text-center lg:text-left">
                <Link to="/about">
                    <p>About</p>
                </Link>
                <Link to="/terms">
                    <p>Terms & Privacy</p>
                </Link>
                <Link to="/commandments">
                    <p>Stoke List Commandments</p>
                </Link>
            </div>
            {/*eslint-disable-next-line*/}
            <div className="text-white text-4xl font-light">
                //the <span className="font-medium">stoke list.</span>
            </div>
            <div className="text-white text-center lg:text-right font-light">
                <div>Copyright 2009-2021</div>
                <div>All Rights Reserved</div>
            </div>
        </div>
    )
}

export default Footer
