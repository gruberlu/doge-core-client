
const Transaction = ({tx}) => {
    const date = new Date(tx.time * 1000)
    return (
        <div className={tx.abandoned || tx.confirmations === 0 ? "Transaction abandoned" : "Transaction"}>
            <div className="row"><div className="amount">{(tx.amount + (tx.fee ? tx.fee : 0)).toFixed(2)} DOGE</div><div>{date.toLocaleString()}</div></div>
            <div className="account">{tx.account ? tx.account : tx.address}</div>
            <div className="seperator"></div>
        </div>
    )
}

export default Transaction
