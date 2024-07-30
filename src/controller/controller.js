class DBController {
    async search(title) {
        let books;
        if (title) {
            books = await fetch(`http://localhost:8080/search?title=${title}`, {
                method: 'GET'
            }).then(response => response.json())
                .then(data => data);
        } else {
            books = await fetch(`http://localhost:8080/search`, {
                method: 'GET'
            }).then(response => response.json())
                .then(data => data);
        }
        return books;
    }

    async filterByType(type) {
        let books;
        if (type !== 'Todos') {
            books = await fetch(`http://localhost:8080/filter?type=${type}`, {
                method: 'GET'
            }).then(response => response.json())
                .then(data => data);
        } else {
            books = await fetch('http://localhost:8080/search', {
                method: 'GET'
            }).then(response => response.json())
                .then(data => data);
        }
        return books;
    }

    async filterByGenre(genre) {
        let books;
        if (genre !== 'Todos') {
            books = await fetch(`http://localhost:8080/filter?type=literature&genre=${genre}`, {
                method: 'GET'
            }).then(response => response.json())
                .then(data => data);
        } else {
            books = await fetch('http://localhost:8080/filter?type=literature', {
                method: 'GET'
            }).then(response => response.json())
                .then(data => data);
        }
        return books;
    }

    async genreList() {
        const genreList = await fetch('http://localhost:8080/list?type=genre', {
            method: 'GET'
        }).then(response => response.json())
            .then(data => data);

        return genreList;
    }

    async filterBySubject(subject) {
        let books;
        if (subject !== 'Todos') {
            books = await fetch(`http://localhost:8080/filter?type=academic&subject=${subject}`, {
                method: 'GET'
            }).then(response => response.json())
                .then(data => data);
        } else {
            books = await fetch('http://localhost:8080/filter?type=academic', {
                method: 'GET'
            }).then(response => response.json())
                .then(data => data);
        }
        return books;
    }

    async subjectList() {
        const subjectList = await fetch('http://localhost:8080/list?type=subject', {
            method: 'GET'
        }).then(response => response.json())
            .then(data => data);

        return subjectList;
    }

    async login(username, password) {
        const response = await fetch('http://localhost:8080/login', {
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

    async register(credentials, userData, address) {
        const response = await fetch('http://localhost:8080/register', {
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
}

export const controller = new DBController();