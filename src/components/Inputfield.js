
const Inputfield = ({label, onChange, required}) => {
    return (
        <>
            <div className="Inputfield">
                <input required onChange={(event) => {onChange(event.target.value)}}></input>
                <label>
                    <span className="labelcontent">{label}</span>
                </label>
            </div>
            {required ? <div className="inputinfo">required</div> : <></>}
        </>
    )
}

export default Inputfield
