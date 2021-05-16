
const Content = () => {
    const setData = (result) => {
        console.log(result)
        const data = document.querySelector('.data')
        data.innerHTML = JSON.stringify(result)
    }

    setInterval(() => {
        window.electron.request('getinfo', []).then(res => setData(res.result))
    }, 10000)
    
    window.electron.request('getinfo', []).then(res => setData(res.result))
    return (
        <div className="data">
            Loading...
        </div>
    )
}

export default Content
