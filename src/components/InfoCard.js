import {Card} from '@material-ui/core'
import * as Icons from '@material-ui/icons'

const InfoCard = () => {

    const closeInfo = (e) => {
        e.preventDefault()
        const infoCard = document.querySelector(".InfoCard")
        infoCard.classList.toggle("hidden")
    }

    return (
        <div className="InfoCard hidden">
            <Card className="Card">
                <button onClick={(e) => closeInfo(e)}><Icons.Close /></button>
                <h1>Wallet Info</h1>
            </Card>
        </div>
    )
}

export default InfoCard
