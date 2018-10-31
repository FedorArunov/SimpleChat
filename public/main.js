var Chat = (function () {
    'use strict';

    var Messages = function (container) {
        this._container = container;
        this.render = this.render.bind(this);
    };
    Messages.prototype.constructor = Messages;
    Messages.prototype.render = function (items) {
        this._container.innerHTML = items.map(function(item) {
            var author = item.author;
            var content = item.content;
            var updated = (new Date (item.updated)).toLocaleString();
            return ['<div class="message-item">',
                '<div class="message-time">', updated, '</div>',
                '<div class="message-author">', author, '</div>',
                '<div class="message-text">', content, '</div>',
            '</div>'].join(' ');
        }).join('');        
    };

    var Messages_1 = Messages;

    var Box = function (container) {
        this._container = container;
        this._container.innerHTML = '<textarea></textarea>';
        this._container.querySelector('textarea').addEventListener ('keydown', this.keyHandler.bind(this));
    };
    Box.prototype.constructor = Box;
    Box.prototype.keyHandler = function (e) {
        if (typeof this.onSend === 'function' && e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault();
            var text = this._container.querySelector('textarea');                        
            this.onSend(text.value);
            text.value = '';
        }
    };
    var Box_1 = Box;

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

    var Server = {get_messages: get_messages, add_message: add_message, add_user: add_user};

    var App = function (container) {
        
        this.refresh = this.refresh.bind(this);
        this.resize = this.resize.bind(this);

        this._container = container;
        this._container.innerHTML = [
            '<div class="header"></div>',
            '<div class="wrapper">',
                '<div class="content">',
                    '<div class="messages"></div>',
                    '<div class="messages-input"></div>',
                '</div>',
                '<div class="sidebar">',
                    '<div class="sidebar-menu"></div>',
                    '<div class="sidebar-users"></div>',
                '</div>',
            '</div>',
            '<div class="footer"></div>',
        ].join('');
        
        this._messages = new Messages_1 (this._container.querySelector('.messages'));
        this._box = new Box_1 (this._container.querySelector('.messages-input'));
        this._box.onSend = this.addMessage.bind(this);                
        window.addEventListener ('resize', this.resize);
        this.refresh();
        this.resize();
    };

    App.prototype.constructor = App;
    App.prototype.refresh = function () {
        Server.get_messages()
        .then (this._messages.render)
        .catch (function (e) { console.log (e); });
    };
    App.prototype.resize = function () {
        var containerHeight = this._container.getBoundingClientRect().height;
        var headerHeight = this._container.querySelector('.header').getBoundingClientRect().height;        
        var footerHeight = this._container.querySelector('.footer').getBoundingClientRect().height;        
        var boxHeight = this._container.querySelector('.messages-input').getBoundingClientRect().height;
        var h = ''.concat(containerHeight - headerHeight - boxHeight - footerHeight, 'px');
        var messages = this._container.querySelector('.messages');
        messages.style.maxHeight = h;
        messages.style.height = h;    
    };
    App.prototype.addMessage = function (content) {
        Server.add_message (0, content)
        .then (this.refresh)
        .catch (function (e) {
            console.log(e);
        });
    };

    var App_1 = App;

    var app = new App_1(document.getElementById('app'));

    var SimpleChat = {

    };

    return SimpleChat;

}());
//# sourceMappingURL=main.js.map
