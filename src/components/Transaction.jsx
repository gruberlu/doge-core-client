import { useState } from 'react'
import { Tooltip, ClickAwayListener } from '@material-ui/core'
import * as Icons from '@material-ui/icons'
import { ReactComponent as Coin } from '../assets/icon.svg'

const Transaction = ({ tx, seperator }) => {
    const [tooltip, setTooltip] = useState(false)

    const handleTooltipOpen = () => {
        setTooltip(true)
    }

    const handleTooltipClose = () => {
        setTooltip(false)
    }

    const getAccount = () => {
        if (tx.category === 'send') {
            return tx.to ? tx.to : tx.address
        }
        else {
            return tx.account ? tx.account : tx.address
        }
    }

    const date = new Date(tx.time * 1000)
    const tooltipData = `Date: ${date.toLocaleString()}\nSent to: ${tx.address}\nConfirmations: ${tx.confirmations}\nTXID: ${tx.txid}\n`
    return (
        <>
            <div className={tx.abandoned || tx.confirmations === 0 ? "Transaction abandoned" : "Transaction"}>
                {tx.category === 'send' ? <Icons.CallMade className="category" /> : <Icons.CallReceived className="category" />}
                {console.log(tx.category)}
                <div className="tx-wrapper" >
                    <div className="row">
                        <div className={tx.category === 'send' ? "amount send" : "amount"}>{(tx.amount + (tx.fee ? tx.fee : 0)).toFixed(2)} <Coin className="Coin" /></div>
                        <div>{date.toLocaleString()}</div>
                    </div>
                    <div className="row">
                        <div className="account">{getAccount()}</div>
                        <ClickAwayListener onClickAway={handleTooltipClose}>
                            <div>
                                <Tooltip
                                    PopperProps={{
                                        disablePortal: true,
                                    }}
                                    onClose={handleTooltipClose}
                                    open={tooltip}
                                    disableFocusListener
                                    disableHoverListener
                                    disableTouchListener
                                    title={tooltipData}
                                    placement="left-start"
                                    arrow
                                    interactive
                                >
                                    <button onClick={handleTooltipOpen}>
                                        <Icons.InfoOutlined fontSize="small" />
                                    </button>
                                </Tooltip>
                            </div>
                        </ClickAwayListener>
                    </div>
                </div>
            </div>
            {seperator ? <div className="seperator"></div> : <></>}
        </>
    )
}

export default Transaction
