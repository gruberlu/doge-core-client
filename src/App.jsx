import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Sidebar, Home, Send, Receive, Transactions, Settings, InfoCard } from './components'
import { ReactComponent as DogeSVG } from './assets/doge.svg'
import { ReactComponent as CoolDogeSVG } from './assets/cooldoge.svg'

function App() {
    return (
        <Router>
            <div className="App">
                <Sidebar />
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/send' component={Send} />
                    <Route path='/receive' component={Receive} />
                    <Route path='/transactions' component={Transactions} />
                    <Route path='/settings' component={Settings} />
                </Switch>
                <DogeSVG className='doge-svg' />
                <CoolDogeSVG className='doge-svg-dark' />
                <InfoCard />
            </div>
        </Router>
    )
}

export default App
