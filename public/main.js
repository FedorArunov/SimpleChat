var Chat = (function () {
    console.log('huh');
    var Messages = function (container) {
        this._container = container;
    };
    Messages.prototype.constructor = Messages;
    Messages.prototype.setMessages = function (items) {
        var content = items.map(function(item) {
            var author = item.author;
            var content = item.content;
            var updated = item.updated;
            return ['<div class="message-item">',
                '<div class="message-time">', updated, '</div>',
                '<div class="message-author">', author, '</div>',
                '<div class="message-text">', content, '</div>',
            '</div>'].join(' ');
        }).join('');
        this._container.innerHTML = content;
    };

    var Box = function (container) {
        this._container = container;    
    };
    Box.prototype.constructor = Box;

    var Chat = function (container) {
        this._container = container;
        this._container.innerHTML = '<div class="messages"></div><div class="box"></div>';
        this._messages = new Messages (this._container.querySelector('.messages'));
        this._box = new Box (this._container.querySelector('.box'));
        this.getMessages()
        .then (function (items) {
            this._messages.setMessages (items);
        }.bind(this))
        .catch (function (e) { console.log (e); });
    };
    Chat.prototype.constructor = Chat;
    Chat.prototype.getMessages = function () {
        return fetch ('messages').then (function (response) { return response.json(); });
    };    
    Chat.prototype.test = function () {

        var time = '[' + new Date().getHours() + ':' + new Date().getMinutes() + ']';

        this._messages.setMessages ([
            {author: 'user1', timestamp: time, text: 'Hey guys!'},
            {author: 'user2', timestamp: time, text: 'sup'},
            {author: 'user3', timestamp: time, text: 'Hey, user1'},
        ]);
    };
    
    return Chat;

}());

var chat = new Chat(document.getElementById('messages-list'));