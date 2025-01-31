import { useState } from "react"
const TextBox = (props) => {
    const [eyeIcon, setEyeIcon] = useState("fa-eye")
    const { type, value, name, className, onChange, placeholder, label, id } = props
    const handlePass = () => {
        if (document.getElementById("passwordInput").type == "password") {
            document.getElementById("passwordInput").type = "text"
            setEyeIcon("fa-eye-slash")
        }
        else {
            document.getElementById("passwordInput").type = "password"
            setEyeIcon("fa-eye")
        }
    }
    return (
        <>
            <div className="textBox">
                <div className="container">
                    <input id={id} type={type} name={name} value={value} placeholder={placeholder} className={className} onChange={onChange} />
                    {type === "password" && <i className={`fa ${eyeIcon}`} id="togglePassword" onClick={handlePass}></i>}
                    {label && <label htmlFor={id}>{label}</label>}
                </div>

            </div>
        </>
    )
}

export default TextBox