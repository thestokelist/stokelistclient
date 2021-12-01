import React from 'react'
import { FaSpinner } from 'react-icons/fa'

function Loading({size}) {
    return (
        <div className="flex w-full justify-center">
             <FaSpinner size={size} className="fa-spin" />
        </div>
    )
}

Loading.defaultProps = {
    size: 40 
}

export default Loading
