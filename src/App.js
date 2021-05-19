import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Menu from './components/Menu'
import Home from './components/Home'
import Send from './components/Send'
import Receive from './components/Receive'
import Transactions from './components/Transactions'

function App() {
    return (
        <Router>
            <div className="App">
                <Menu />
                <Switch>
                    <Route path='/send' component={Send} />
                    <Route path='/receive' component={Receive} />
                    <Route path='/transactions' component={Transactions} />
                    <Route path='/' component={Home} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
