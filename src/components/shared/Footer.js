import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <div className="bg-slate w-full h-auto lg:h-32 px-0 lg:px-16 box-border flex flex-col lg:flex-row items-center justify-between py-4 lg:py-0">
            <div className="text-white lg:font-medium text-center lg:text-left">
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
            <div className="text-white text-3xl lg:text-4xl lg:font-light mb-2 lg:mb-0">
                //the <span className="font-medium">stoke list.</span>
            </div>
            <div className="text-white text-center lg:text-right lg:font-light">
                <div>Copyright 2009-2021</div>
                <div>All Rights Reserved</div>
            </div>
        </div>
    )
}

export default Footer
