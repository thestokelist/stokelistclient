import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import MainApp from './components/MainApp'
import config from './config'
import { StateProvider } from './components/store'
import {
    GoogleReCaptchaProvider,
} from 'react-google-recaptcha-v3'

function App() {
    const reCaptchaKey = process.env.REACT_APP_CAPTCHA_KEY
    return (
        <Router basename={config.ROUTER_BASE_NAME}>
            <StateProvider>
                <GoogleReCaptchaProvider
                    reCaptchaKey={reCaptchaKey}
                >
                    <Route path="/" component={MainApp} />
                </GoogleReCaptchaProvider>
            </StateProvider>
        </Router>
    )
}

export default App
