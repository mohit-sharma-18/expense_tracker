const TextBox = (props) => {
    const { type, value, name, className, onChange, placeholder, label, id } = props
    const handlePass = () => {
        document.getElementById("passwordInput").type == "password"
            ? document.getElementById("passwordInput").type = "text"
            : document.getElementById("passwordInput").type = "password"
    }
    return (
        <>
            <div className="textBox">
                <div className="container">
                    <input id={id} type={type} name={name} value={value} placeholder={placeholder} className={className} onChange={onChange} />
                    {type === "password" && <i className="fa fa-eye" id="togglePassword" onClick={handlePass}></i>}
                    {label && <label htmlFor={id}>{label}</label>}
                </div>

            </div>
        </>
    )
}

export default TextBox