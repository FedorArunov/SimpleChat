require ('./Messages.css');

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

module.exports = Messages;
