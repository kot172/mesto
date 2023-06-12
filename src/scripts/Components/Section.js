export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._container = document.querySelector(containerSelector)
        this._items = items
        this.renderer = renderer
    }

    renderItems() {
        this._items.forEach(element => {
            this.addItem(this.renderer(element))
        })
    }
    addItem(elementDom) {
        this._container.prepend(elementDom);
    }
}