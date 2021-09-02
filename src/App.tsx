import React from 'react'
import 'antd/dist/antd.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import InfoBar from './components/InfoBar'
import HomePage from './components/HomePage/HomePage'
import DetailsPage from './components/DetailsPage/DetailsPage'

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <InfoBar />
        <Switch>
          <Route exact path={'/details/:symbol'}>
            <DetailsPage />
          </Route>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route>
            <div>Page not found</div>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
