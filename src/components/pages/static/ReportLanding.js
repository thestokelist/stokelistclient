import React from 'react'
import { Link } from 'react-router-dom'

function ReportLanding() {
    return (
        <div>
            <div className="form-label">
                Thank you! Our admins will review your report.
            </div>
            <div className="mt-2 text-blue underline text-lg">
                <Link to="/">Click here to get back to the list</Link>
            </div>
        </div>
    )
}

export default ReportLanding
