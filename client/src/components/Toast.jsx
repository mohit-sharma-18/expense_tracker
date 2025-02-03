import { useEffect } from "react";

const Toast = (props) => {
    const { toastHeader, toastIcon, toastMsg, toastColor, closeToast } = props
    useEffect((e) => {
        let timeout;
        if (closeToast) {
            timeout = setTimeout(() => {
                closeToast()
            }, 2000);
        }
        return (() => clearTimeout(timeout))
    }, [closeToast])

    return (<>
        <div className="toast_comp">
            <div className="container">
                <div className={`toastContainer ${toastColor}`}>
                    <div className="toastHeader">
                        <div className="left">
                            <i className={`fa ${toastIcon}`}></i>
                            <p className={`alert ${toastColor}`}>{toastHeader}</p>
                        </div>
                        <i className="fa fa-close" onClick={closeToast}></i>
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