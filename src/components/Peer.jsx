import { useState } from 'react'
import * as Icons from '@material-ui/icons'

const Peer = ({ peer, seperator }) => {
    const [showInfo, setShowInfo] = useState(false)

    return (
        <div className="Peer">
            <div className="row">
                <div className="col">{peer.addr}</div>
                <div className="col">{peer.subver}</div>
                <button onClick={() => { setShowInfo(!showInfo) }}><Icons.InfoOutlined /></button>
            </div>
            {showInfo ? (
                <>
                    <div className="details">
                        <div className="key">Bytes sent:</div>
                        <div>{peer.bytessent} B</div>
                    </div>
                    <div className="details">
                        <div className="key">Bytes received:</div>
                        <div>{peer.bytesrecv} B</div>
                    </div>
                    <div className="details">
                        <div className="key">Connectiontime:</div>
                        <div>{peer.conntime}</div>
                    </div>
                    <div className="details">
                        <div className="key">Inbound:</div>
                        <div>{peer.inbound ? "Yes" : "No"}</div>
                    </div>
                    <div className="details">
                        <div className="key">Addnode:</div>
                        <div>{peer.addnode ? "Yes" : "No"}</div>
                    </div>
                </>
            ) : <></>}
            {seperator ? <div className="seperator"></div> : <></>}
        </div>
    )
}

export default Peer
