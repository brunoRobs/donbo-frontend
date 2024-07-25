class DBController {
    async search(title) {
        let books;
        if (title) {
            books = await fetch(`http://26.60.40.255:8080/search?title=${title}`, {
                method: 'GET'
            }).then(response => response.json())
                .then(data => data);
        } else {
            books = await fetch(`http://26.60.40.255:8080/search`, {
                method: 'GET'
            }).then(response => response.json())
                .then(data => data);
        }
        return books;
    }

    async register(credentials, userData, address) {
        const response = await fetch(`http://26.60.40.255:8080/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                credentials: credentials,
                userData: userData,
                address: address
            })
        }).then(response => response.ok);
        return response;
    }

    async login(username, password) {
        const response = await fetch(`http://26.60.40.255:8080/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then(response => response.ok);
        return response;
    }

    async select(title) {
        const book = await fetch(`http://26.60.40.255:8080/select?title=${title}`, {
            method: 'GET'
        }).then(response => response.json());

        return book;
    }
}

export const controller = new DBController();