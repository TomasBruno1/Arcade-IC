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
        const csrftoken = getCookie('csrftoken');
        console.log(csrftoken)
        try {
            return await fetch(`${url}/login/`, {

                method: 'POST',
                headers: {
                    'X-CSRFToken': csrftoken
                },
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

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
