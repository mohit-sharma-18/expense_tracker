const SelectList = ({ options, onChange, placeholder, value }) => {
    return (
        <div className="custom-select-wrapper">
            <select
                className="custom-select stylish-select"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                {placeholder && <option value="">{placeholder}</option>}
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectList;