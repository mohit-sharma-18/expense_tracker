const Toast = (props) => {
    const { toastHeader, toastIcon, toastMsg, toastColor } = props
    return (<>
        <div className="toast_comp">
            <div className="container">
                <div className={`toastContainer ${toastColor}`}>
                    <div className="toastHeader">
                        <div className="left">
                            <i className={`fa ${toastIcon}`}></i>
                            <p className={`alert ${toastColor}`}>{toastHeader}</p>
                        </div>
                        <i className="fa fa-close"></i>
                    </div>
                    <div className="toastMsg">
                        <p>{toastMsg}</p>
                    </div>

                </div>
            </div>
        </div>
    </>)
}

export default Toast