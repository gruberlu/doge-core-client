
const Transaction = ({tx}) => {
    const date = new Date(tx.time * 1000)
    return (
        <div className="Transaction">
            <div >Account: {tx.account}</div>
            <div >Address: {tx.address}</div>
            <div >Amount: {tx.amount}</div>
            <div >Date: {date.toLocaleString()}</div>
        </div>
    )
}

export default Transaction
