const SelectList = ({ options, onChange, placeholder, value }) => {
    return (
        <div className="custom-select-wrapper">
            <select
                className="custom-select stylish-select"
                value={value}
                onChange={(e) => onChange(e)}
            >
                {placeholder && <option value="">{placeholder}</option>}
                {options.map((option, index) => (
                    <option key={index} value={option.value} data-icon={option.icon}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectList;