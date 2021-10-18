const url = "http://127.0.0.1:8000"

class UserAPI {

    postData = async (data) => {
        try {
            return await fetch(`${url}/users/`, {
                method: 'POST',
                body: data
            })
                .then((response) => {
                    window.location.replace("/login")
                    return response?.json()
                });
        }catch (err) {
            console.log(err)
        }
    }

    loginData = async ( data = {}) => {
        try {
            return await fetch(`${url}/users/`, {
                method: 'POST',
                body: data
            })
                .then(res => {
                    window.sessionStorage.setItem("user", (JSON.stringify(res.json())));
                    window.location.replace("/")
                })
        }catch (err) {
            console.log(err)
        }
    }


}

export const userAPI = new UserAPI();