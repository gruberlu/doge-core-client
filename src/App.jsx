import { HashRouter as Router, Routes, Route } from 'react-router-dom'
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
                    <Routes>
                        <Route path='/' exact element={<Home />} />
                        <Route path='/dashboard' element={<Dashboard />} />
                        <Route path='/send' element={<Send />} />
                        <Route path='/receive' element={<Receive />} />
                        <Route path='/transactions' element={<Transactions />} />
                        <Route path='/settings' element={<Settings />} />
                    </Routes>
                    <DogeSVG className='doge-svg' />
                    <CoolDogeSVG className='doge-svg-dark' />
                    <InfoCard />
                </div>
            </CredsProvider>
        </Router>
    )
}

export default App
