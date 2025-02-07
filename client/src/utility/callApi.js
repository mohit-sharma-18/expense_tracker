import store from "../redux/store/store"
import { showToast } from "../redux/store/actions"
const apiUrl = process.env.REACT_APP_API_URL

const callApi = (apiPath, apiMethod, apibody, setLoader, Oauth, token) => {
    if (setLoader) setLoader(true)
    const headers = {
        "Content-Type": "application/json",
    };
    if (Oauth)
        headers["Authorization"] = `Bearer ${token}`;
    return fetch(apiUrl + apiPath, {
        method: apiMethod,
        headers: headers,
        credentials: 'include',
        body: apibody ? JSON.stringify(apibody) : null
    })
        .then((res) => {
            if (res.status === 401) window.location.href = '/login'
            if (!res.ok) {
                return store.dispatch(
                    showToast({
                        "toastHeader": 'Error',
                        "toastMsg": res.statusText,
                        "toastColor": 'red',
                        "toastIcon": 'fa-close',
                        "auth": res.redirected
                    })
                )
            }
            return res.json()
        })
        .then((data) => {
            if (data?.toastHeader) {
                store.dispatch(
                    showToast({
                        "toastHeader": data.toastHeader,
                        "toastMsg": data.toastMsg,
                        "toastColor": data.toastColor,
                        "toastIcon": data.toastIcon,
                        "auth": data.redirected
                    })
                )
            }
            return data
        })
        .catch((err) => {
            console.log('Error while post req', err);
        })
        .finally(() => {
            if (setLoader) setLoader(false)
        })
}

export default callApi
