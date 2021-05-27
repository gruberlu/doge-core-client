
const Inputfield = ({label, onChange}) => {
    return (
        <div className="Inputfield">
            <input required onChange={(event) => {onChange(event.target.value)}}></input>
            <label>
                <span className="labelcontent">{label}</span>
            </label>
        </div>
    )
}

export default Inputfield
