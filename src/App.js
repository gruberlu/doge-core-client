import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Home from './components/Home'
import Send from './components/Send'
import Receive from './components/Receive'
import Transactions from './components/Transactions'
import Settings from './components/Settings'
import {ReactComponent as DogeSVG} from './assets/doge.svg'

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
                <DogeSVG className='doge-svg'/>
            </div>
        </Router>
    );
}

export default App;
