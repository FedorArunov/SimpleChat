function get_messages () {
    return fetch ('messages')
    .then (function (response) {
        return response.json();
    });
}

function add_message (author, content) {
    return fetch ('messages', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({author, content})
    })
    .then (function (response) {
        return response.json();
    });
}

function add_user (login) {
    return fetch ('users', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({login})
    })
    .then (function (response) {
        return response.json();
    });
}

module.exports = {get_messages: get_messages, add_message: add_message, add_user: add_user};