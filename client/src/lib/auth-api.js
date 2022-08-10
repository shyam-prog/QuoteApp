

export async function loginUser(details) {
    const res = await fetch("https://quote-app-shy.herokuapp.com/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: details.email,
            password: details.pwd,
        })
    })

    const data = await res.json();
    let isAuth = false;
    if (data.user) {
        alert("Login Successfull!!");
        localStorage.setItem('token', data.user);
        // eslint-disable-next-line no-restricted-globals
        location.href = '/quotes';
        isAuth = true;
    } else {
        alert("Invalid Details..");
        // eslint-disable-next-line no-restricted-globals
        location.href = '/auth';
    }
    console.log(data);

    return isAuth;

}

export async function registerUser(details) {
    
    const res = await fetch("https://quote-app-shy.herokuapp.com/register", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: details.name,
            email: details.email,
            password: details.pwd,
        })
    })
    const isAuth = false;
    const data = await res.json();
    if (data.status === 'ok') {
        localStorage.setItem('token', data.user);
        // eslint-disable-next-line no-restricted-globals
        location.href = '/quotes';

        isAuth = true;
    } else {
        alert(data.error);
        // eslint-disable-next-line no-restricted-globals
        location.href = '/auth';

    }

    return isAuth;

}