import { useState } from "react"
import Header from "../../components/Header"
import TextBox from "../../components/TextBox"
import SelectList from "../../components/SelectList"

const AddExpense = () => {
    const [defaults, setDefaults] = useState({
        amount: '',
        description: ''
    })
    const { amount, description } = defaults
    const [selectedValue, setSelectedValue] = useState("");
    const handlerChange = (e) => {
        const { name, value } = e.target
        setDefaults((prev) => ({
            ...prev, [name]: value
        }))
    }


    const options = [
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2" },
        { value: "3", label: "Option 3" },
    ];

    const handlerSelectList = (value) => {
        console.log("Selected value:", value);
        setSelectedValue(value);
    };

    return <>
        <div className="addExpense_comp">
            <div className="addExpenseContainer">
                <div className="clearfix"></div>
                < Header backBtn={true} name="Add Expense" />
                <TextBox type="number"  label="Amount" name="amount" value={amount} placeHolder="Enter Amount" className="inputAmount" onChange={handlerChange} />
                <div>
                    <p>Expenses made for</p>
                    <SelectList
                        options={options}
                        onChange={handlerSelectList}
                        placeholder="Select an option"
                        value={selectedValue}
                    />
                </div>
                <div>
                    <TextBox type="text" name="description" label="Description" value={description} className="description" onChange={handlerChange} />
                </div>
            </div>
        </div>
    </>
}
export default AddExpense