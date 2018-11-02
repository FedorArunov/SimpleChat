require('./App.css');

var Messages = require('../Messages');
var Box = require('../Box');
var Server = require('../Server.js');

var App = function (container) {
    
    this.refresh = this.refresh.bind(this);
    this.resize = this.resize.bind(this);

    this._container = container;
    this._container.innerHTML = [
        '<div class="header">',
            '<div class="menu"><a>username</a></div>',
        '</div>',
        '<div class="wrapper">',
            '<div class="content">',
                '<div class="messages"></div>',
                '<div class="messages-input"></div>',
            '</div>',
            '<div class="sidebar">',
                '<div class="users"></div>',
            '</div>',
        '</div>',
        '<div class="footer"></div>',
    ].join('');
    
    this._messages = new Messages (this._container.querySelector('.messages'));
    this._box = new Box (this._container.querySelector('.messages-input'));
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

module.exports = App;