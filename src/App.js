import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import MainApp from './components/MainApp'
import config from './config'
import { StateProvider } from './components/store'

function App() {
    return (
        <Router basename={config.ROUTER_BASE_NAME}>
            <StateProvider>
                <Route path="/" component={MainApp} />
            </StateProvider>
        </Router>
    )
}

export default App
