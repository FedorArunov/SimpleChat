var App = (function () {
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
        
        this._messages = new Messages (this._container.querySelector('.messages'));
        this._box = new Box (this._container.querySelector('.messages-input'));
        this._box.onSend = this.addMessage.bind(this);                
        window.addEventListener ('resize', this.resize);
        this.refresh();
        this.resize();
    };
    App.prototype.constructor = App;
    App.prototype.refresh = function () {
        get_messages()
        .then (this._messages.render)
        .catch (function (e) { console.log (e); });
    };
    App.prototype.resize = function () {
        var {width, height} = this._container.getBoundingClientRect();
        var headerHeight = this._container.querySelector('.header').getBoundingClientRect().height;        
        var footerHeight = this._container.querySelector('.footer').getBoundingClientRect().height;        
        var box = this._container.querySelector('.messages-input');
        var h = ''.concat(height - headerHeight - box.getBoundingClientRect().height - footerHeight, 'px');
        var sidebarWidth = this._container.querySelector('.sidebar').getBoundingClientRect().width;
        var w = ''.concat(width - sidebarWidth, 'px');
        var messages = this._container.querySelector('.messages');
        messages.style.maxHeight = h;
        messages.style.height = h;        
        // var content = this._container.querySelector('.content');
        // content.style.width = w;
    };
    App.prototype.addMessage = function (content) {
        add_message (0, content)
        .then (this.refresh)
        .catch (function (e) {
            console.log(e);
        });
    };
    return App;
}());