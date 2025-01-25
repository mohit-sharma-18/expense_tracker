import { useEffect, useState } from "react"
import Header from "../../components/Header"
import TextBox from "../../components/TextBox"
import SelectList from "../../components/SelectList"
import callApi from "../../utility/callApi"
import Button from "../../components/Button"
import { Link, useNavigate } from "react-router"
import Toast from "../../components/Toast"
import { useSearchParams } from "react-router"
import Loader from "../../components/Loader"

const AddExpense = () => {
    const [params] = useSearchParams()
    const [selectedValue, setSelectedValue] = useState("Tea & Snacks");
    const [showToast, setShowToast] = useState(false)
    const [apiData, setApiData] = useState([])
    const [loader, setLoader] = useState(false)
    const [fieldError, setFieldError] = useState({})
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
    const Navigate = useNavigate()


    useEffect(() => {
        if (editID) {
            setLoader(true)
            callApi(`/addExpense?editID=${editID}`, 'GET', null, setLoader).then((data) => {
                setDefaults((prev) => ({
                    ...prev,
                    amount: data[0].amount,
                    description: data[0].description,
                    expenseType: data[0].expensetype,
                    icon: data[0].icon
                }))
            })
        }
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
        if (validate()) {
            if (editID) {
                callApi(`/addExpense?editID=${editID}`, 'PUT', defaults).then((data) => {
                    setApiData(data)
                    setShowToast(true)
                })
                return
            }

            callApi('/addExpense', 'POST', defaults).then((data) => {
                if (data?.auth == false) {
                    setApiData(data)
                    setShowToast(true)
                    setTimeout(() => {
                        return Navigate('/login')
                    }, 2500);
                }
                setApiData(data)
                setShowToast(true)
                setDefaults((prev) => ({
                    ...prev,
                    amount: '',
                    description: '',
                }))
            })
        }
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

    const validate = () => {
        let errors = {}
        for (let key in defaults) {
            if (defaults[key].trim().length < 1) {
                errors[key] = 'error'
            }
        }
        setFieldError(errors)
        return Object.entries(errors).length > 0 ? false : true
    }
    return <>
        {loader && <Loader loaderMsg="Loading" />}
        <div className="addExpense_comp">
            <div className="addExpenseContainer">
                {showToast && <Toast toastHeader={apiData.toastHeader} toastMsg={apiData.toastMsg} toastColor={apiData.toastColor} toastIcon={apiData.toastIcon} />}
                <div className="clearfix"></div>
                < Header backBtn={true} name="Add Expense" />
                <form onSubmit={handleSubmit}>
                    <TextBox type="number" label="Amount" name="amount" value={amount} placeholder="Enter an amount" className={`inputAmount ${fieldError.amount ? 'error' : ''}`} onChange={handlerChange} />
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
                        <TextBox type="text" name="description" label="Description" value={description} className={`description ${fieldError.description ? 'error' : ''}`} placeholder="Add a comment" onChange={handlerChange} />
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
