import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { Sidebar, Home, Send, Receive, Transactions, Settings, InfoCard, Dashboard } from './components'
import { ReactComponent as DogeSVG } from './assets/doge.svg'
import { ReactComponent as CoolDogeSVG } from './assets/cooldoge.svg'
import { CredsProvider } from './context/CredsContext'

function App() {
    return (
        <Router>
            <CredsProvider >
                <div className="App">
                    <Sidebar />
                    <Switch>
                        <Route path='/' exact component={Home} />
                        <Route path='/dashboard' component={Dashboard} />
                        <Route path='/send' component={Send} />
                        <Route path='/receive' component={Receive} />
                        <Route path='/transactions' component={Transactions} />
                        <Route path='/settings' component={Settings} />
                    </Switch>
                    <DogeSVG className='doge-svg' />
                    <CoolDogeSVG className='doge-svg-dark' />
                    <InfoCard />
                </div>
            </CredsProvider>
        </Router>
    )
}

export default App
