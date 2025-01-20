import { useState } from "react";

const SelectList = ({ options, onChange, placeholder, value }) => {
    const [toggledIcon, setToggledIcon] = useState("fa-caret-down")
    return (
        <div className="custom-select-wrapper">
            <select
                className="custom-select stylish-select"
                value={value}
                onClick={() => {
                    setToggledIcon((prev) => prev === "fa-caret-down" ? "fa-caret-up" : "fa-caret-down")
                }}
                onChange={(e) => onChange(e)}
            >
                {placeholder && <option value="">{placeholder}</option>}
                {options.map((option, index) => (
                    <option key={index} value={option.value} data-icon={option.icon}>
                        {option.label}
                    </option>
                ))}
            </select>
            <i className={`fa ${toggledIcon}`}></i>
        </div>
    );
};

export default SelectList;