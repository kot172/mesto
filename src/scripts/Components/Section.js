export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._items = items;
    this.renderer = renderer;
  }

  renderItems(items) { 
     items.forEach((item) => this.addItem(this.renderer(item)))    
  }
  addItem(elementDom) {
    this._container.append(elementDom);
  }
}