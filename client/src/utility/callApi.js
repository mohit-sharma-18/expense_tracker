const apiUrl = process.env.REACT_APP_API_URL
const callApi = (apiPath, apiMethod, apibody, setLoader) => {
    if (setLoader) setLoader(true)
    return fetch(apiUrl + apiPath, {
        method: apiMethod,
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: apibody ? JSON.stringify(apibody) : null
    })
        .then((res) => {
            if (res.status === 401) window.location.href = '/login'
            if (!res.ok) {
                return {
                    "toastHeader": 'Error',
                    "toastMsg": res.statusText,
                    "toastColor": 'red',
                    "toastIcon": 'fa-close',
                    "auth": res.redirected
                }
            }
            return res.json()
        })
        .then((data) => {
            console.log('data', data)
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
