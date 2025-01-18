const apiUrl = process.env.REACT_APP_API_URL
console.log('apiUrl', apiUrl);

const callApi = (apiPath, apiMethod, apibody, setLoader) => {
    console.log('apiPath', apiPath);
    
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
            console.log('res', res, '---', apiUrl + apiPath);
            if (!res.ok) {
                console.log('Error')
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
            console.log('Response', data)
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
