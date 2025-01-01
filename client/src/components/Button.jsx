import React from "react"

const Button = (props) => {
    return (
        <div className="buttonContainer">
            <button type={props.type} className={`button ${props.className}`} style={props.style}>{props.name}</button>
        </div>
    )
}

export default Button