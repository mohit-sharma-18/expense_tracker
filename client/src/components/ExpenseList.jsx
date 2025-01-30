import { useState } from 'react';
import { data, Link } from 'react-router-dom'
import callApi from '../utility/callApi';
import Loader from './Loader';
const ExpenseList = (props) => {
    const { apiData, onSendData } = props
    const [loader, setLoader] = useState(false)


    const handlerDelete = (e) => {
        e.preventDefault()
        setLoader(true)
        const deleteID = e.target.getAttribute("data-value")
        callApi(`/addExpense?deleteID=${deleteID}`, 'DELETE', null, setLoader).then((data) => {
            onSendData(data)
        })
    }

    return (
        <>
            <div className="expenseList_comp">
                {loader && <Loader loaderMsg="Loading" />}
                <div className="container">
                    <ul className="exListBox">
                        {apiData.map((data, i) => {
                            if (data.expense_type === 'Total') return
                            return <li className="exListItem" key={i}>
                                <div className="expenseListContainer">
                                    <div className="left">
                                        <div className="icon">
                                            <i className={`fa ${data.icon}`}></i>
                                        </div>
                                        <div className="details">
                                            <h4 className="listHeader">{data.expense_type}</h4>
                                            <p className="listPara">{data.description}</p>
                                        </div>
                                    </div>
                                    <div className="right">
                                        <p className="expense"> <span className="rupess">&#x20b9;</span>{data.amount}</p>
                                    </div>
                                </div>
                                <div className="actionBtns">
                                    <Link to={`/addExpense?editID=${data.id}`}> <i className="fa fa-pencil" data-value={data.id}></i></Link>
                                    <i className="fa fa-trash" data-value={data.id} onClick={handlerDelete}></i>
                                </div>
                            </li>
                        })}

                    </ul>

                </div>
            </div>
        </>
    )
}

export default ExpenseList