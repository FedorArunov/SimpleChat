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
module.exports = Box;