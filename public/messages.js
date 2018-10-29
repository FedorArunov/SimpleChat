var Chat = (function () {
    console.log('huh');
    var Messages = function (container) {
        this._container = container;
    };
    Messages.prototype.constructor = Messages;
    Messages.prototype.setMessages = function (items) {
        var content = items.map(function(item) {
            var author = item.author;
            var text = item.text;
            var timestamp = item.timestamp;
            return ['<div class="message-item">',
                '<div class="message-time">', timestamp, '</div>',
                '<div class="message-author">', author, '</div>',
                '<div class="message-text">', text, '</div>',
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
    };
    Chat.prototype.constructor = Chat;
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
chat.test();