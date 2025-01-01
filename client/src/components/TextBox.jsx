const TextBox = (props) => {
    const { type, value, name, className, onChange, placeholder, label } = props
    return (
        <>
            <div className="textBox">
                <div className="container">
                    <input id="inputBox" type={type} name={name} value={value} placeholder={placeholder} className={className} onChange={onChange} />
                    <label htmlFor="inputBox">{label}</label>
                </div>

            </div>
        </>
    )
}

export default TextBox