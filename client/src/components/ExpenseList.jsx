const ExpenseList = (props) => {
    // const { listHeader, listPara, expense, icon } = props
    const { apiData } = props
    console.log('api', apiData);

    return (
        <>
            <div className="expenseList_comp">
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
                                {/* <div className="actionBtns">
                                    <i className="fa fa-pencil"></i>
                                    <i className="fa fa-trash"></i>
                                </div> */}
                            </li>
                        })}

                    </ul>

                </div>
            </div>
        </>
    )
}

export default ExpenseList