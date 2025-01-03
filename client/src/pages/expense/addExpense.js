import { useEffect, useState } from "react"
import Header from "../../components/Header"
import TextBox from "../../components/TextBox"
import SelectList from "../../components/SelectList"
import callApi from "../../utility/callApi"
import Button from "../../components/Button"
import { Link } from "react-router"
import Toast from "../../components/Toast"

const AddExpense = () => {
    const [selectedValue, setSelectedValue] = useState("");
    const [showToast, setShowToast] = useState(false)
    const [apiData, setApiData] = useState([])
    const expenseTypeData = [
        { value: "TS", label: "Tea & Snacks" },
        { value: "GROCERY", label: "Grocery" },
        { value: "V", label: "Vehicle" },
        { value: "FOOD", label: "Food" },
        { value: "GIFT", label: "Gift" },
        { value: "OS", label: "Online Shopping" },
        { value: "S", label: "Subscription" },
        { value: "Cab", label: "Cab" },
        { value: "Shopping", label: "Shopping" },
        { value: "BILL", label: "Bill" },
        { value: "OTHERS", label: "Others" },
    ];
    const [defaults, setDefaults] = useState({
        amount: '',
        description: '',
        expenseType: 'OTHERS'
    })
    const { amount, description } = defaults
    const handlerChange = (e) => {
        const { name, value } = e.target
        setDefaults((prev) => ({
            ...prev, [name]: value
        }))
    }


    // useEffect((e) => {
    //     callApi('/addExpense', 'GET', null).then((data) => {
    //         console.log('data', data);
    //         setApiData(data)
    //         setShowToast(true)
    //     })
    // }, [])

    const handlerSelectList = (value) => {
        console.log("Selected value:", value);
        setSelectedValue(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        callApi('/addExpense', 'POST', defaults).then((data) => {
            setApiData(data)
            setShowToast(true)
        })
    }

    return <>
        <div className="addExpense_comp">
            <div className="addExpenseContainer">
                {showToast && <Toast toastHeader={apiData.toastHeader} toastMsg={apiData.toastMsg} toastColor={apiData.toastColor} toastIcon={apiData.toastIcon} />}
                <div className="clearfix"></div>
                < Header backBtn={true} name="Add Expense" />
                <form onSubmit={handleSubmit}>
                    <TextBox type="number" label="Amount" name="amount" value={amount} placeHolder="Enter Amount" className="inputAmount" onChange={handlerChange} />
                    <div className="selectListCon">
                        <p>Expenses made for</p>
                        <SelectList
                            options={expenseTypeData}
                            onChange={handlerSelectList}
                            placeholder="- Select -"
                            value={selectedValue}
                        />
                    </div>
                    <div>
                        <TextBox type="text" name="description" label="Description" value={description} className="description" onChange={handlerChange} />
                    </div>
                    <div className="clearfix"></div>
                    <div className="btn">
                        <Button type="submit" name="Save" className="primary" style={{ width: "285px" }}></Button>
                        <Link to="/home"> <Button name="Cancel" className="secondary createBtn" style={{ width: "285px" }}></Button></Link>
                    </div>
                </form>
            </div>
        </div>
    </>
}
export default AddExpense