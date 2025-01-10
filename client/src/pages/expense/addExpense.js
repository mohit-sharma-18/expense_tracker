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
        { value: "Tea & Snacks", label: "Tea & Snacks", icon: "fa-coffee" },
        { value: "Grocery", label: "Grocery", icon: "fa-shopping-basket" },
        { value: "Vehicle", label: "Vehicle", icon: "fa-car" },
        { value: "Food", label: "Food", icon: "fa-burger" },
        { value: "Gift", label: "Gift", icon: "fa-gift" },
        { value: "Online Shopping", label: "Online Shopping", icon: "fa-cart-shopping" },
        { value: "Subscription", label: "Subscription", icon: "fa-film" },
        { value: "Cab", label: "Cab", icon: "fa-car" },
        { value: "Shopping", label: "Shopping", icon: "fa-shopping-basket" },
        { value: "Recharge/Bill", label: "Recharge/Bill", icon: "fa-file" },
        { value: "Others", label: "Others", icon: "fa-group-arrows-rotate" },
    ];
    const [defaults, setDefaults] = useState({
        amount: '',
        description: '',
        expenseType: 'Others',
        icon: ''
    })
    const { amount, description } = defaults
    const handlerChange = (e) => {
        const { name, value } = e.target
        setDefaults((prev) => ({
            ...prev, [name]: value
        }))
    }



    const handlerSelectList = (e) => {
        const fetchedIcon = e.target.options[e.target.selectedIndex].getAttribute("data-icon")
        setDefaults((prev) => ({
            ...prev,
            expenseType: e.target.value,
            icon: fetchedIcon
        }))
        setSelectedValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        callApi('/addExpense', 'POST', defaults).then((data) => {
            setApiData(data)
            setShowToast(true)
        })
    }
    //i will handle state later with redux or contxt
    useEffect((e) => {
        let timeout;
        if (showToast) {
            timeout = setTimeout(() => {
                setShowToast(false)
            }, 2000);
        }
        return (() => clearTimeout(timeout))
    }, [showToast])

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