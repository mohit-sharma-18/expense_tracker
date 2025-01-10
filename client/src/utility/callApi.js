const callApi = (apiPath, apiMethod, apibody) => {

    return fetch(apiPath, {
        method: apiMethod,
        headers: {
            'Content-Type': 'application/json',
        },
        body: apibody ? JSON.stringify(apibody) : null
    })
        .then((res) => {
            console.log('res', res);
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
}

export default callApi
