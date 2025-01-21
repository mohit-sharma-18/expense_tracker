import { useEffect, useState } from "react"
import Header from "../../components/Header"
import TextBox from "../../components/TextBox"
import SelectList from "../../components/SelectList"
import callApi from "../../utility/callApi"
import Button from "../../components/Button"
import { Link } from "react-router"
import Toast from "../../components/Toast"
import { useSearchParams } from "react-router"

const AddExpense = () => {
    const [params] = useSearchParams()
    const [selectedValue, setSelectedValue] = useState("Tea & Snacks");
    const [showToast, setShowToast] = useState(false)
    const [apiData, setApiData] = useState([])
    const editID = params.get('editID')
    const expenseTypeData = [
        { value: "Tea & Snacks", label: "Tea & Snacks", icon: "fa-coffee" },
        { value: "Grocery", label: "Grocery", icon: "fa-shopping-basket" },
        { value: "Vehicle", label: "Vehicle", icon: "fa-car" },
        { value: "Food", label: "Food", icon: "fa-cutlery" },
        { value: "Gift", label: "Gift", icon: "fa-gift" },
        { value: "Online Shopping", label: "Online Shopping", icon: "fa-shopping-cart" },
        { value: "Subscription", label: "Subscription", icon: "fa-film" },
        { value: "Cab", label: "Cab", icon: "fa-car" },
        { value: "Shopping", label: "Shopping", icon: "fa-shopping-cart" },
        { value: "Recharge/Bill", label: "Recharge/Bill", icon: "fa-file" },
        { value: "Others", label: "Others", icon: "fa-random" },
    ];
    const [defaults, setDefaults] = useState({
        amount: '',
        description: '',
        expenseType: 'Tea & Snacks',
        icon: 'fa-coffee'
    })
    const { amount, description, expenseType, icon } = defaults

    useEffect(() => {
        if (editID)
            callApi(`/addExpense?editID=${editID}`, 'GET', null).then((data) => {
                setDefaults((prev) => ({
                    ...prev,
                    amount: data[0].amount,
                    description: data[0].description,
                    expenseType: data[0].expensetype,
                    icon: data[0].icon
                }))
                console.log(data[0], defaults);

            })
        return
    }, [])
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
        if (editID) {
            callApi(`/addExpense?editID=${editID}`, 'PUT', defaults).then((data) => {
                setApiData(data)
                setShowToast(true)
            })
            return
        }
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
                    <TextBox type="number" label="Amount" name="amount" value={amount} placeholder="Enter an amount" className="inputAmount" onChange={handlerChange} />
                    <div className="selectListCon">
                        <p>Expenses made for</p>
                        <SelectList
                            options={expenseTypeData}
                            onChange={handlerSelectList}
                            // placeholder="- Select -"
                            value={expenseType}
                        />
                    </div>
                    <div>
                        <TextBox type="text" name="description" label="Description" value={description} className="description" placeholder="Add a comment" onChange={handlerChange} />
                    </div>
                    <div className="clearfix"></div>
                    <div className="btn">
                        <Button type="submit" name={editID ? "Update" : "Save"} className="primary" style={{ width: "325px" }}></Button>
                        <Link to="/home"> <Button name="Cancel" className="secondary createBtn" style={{ width: "325px" }}></Button></Link>
                    </div>
                </form>
            </div>
        </div>
    </>
}
export default AddExpense
