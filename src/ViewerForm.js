export default class FormControl {
    constructor() {
        this.callbacks = {};
        this.figure = document.getElementById('figure');
        this.range = document.getElementById('range');
        this.addFigure = document.getElementById('create-figure');
        this.listItems = document.getElementById('list-figure');
    }

    init() {
        this.addFigure.addEventListener('click', () => this.addNewFigure());
    }

    addNewFigure() {
        this.dispatch('addFigureEvent', {
            name: this.figure.value,
            size: this.range.value,
        });
    }

    addListItem(data) {
        const label = this.createListElement({
            data: data,
            elementName: 'label',
            className: 'title',
        });

        const delButton = this.createListElement({
            data: data,
            elementName: 'button',
            className: 'delete',
            text: 'delete',
            id: 'delete',
        });

        const listItem = this.createListElement({
            data: data,
            elementName: 'li',
            className: 'list-item',
            childs: [label, delButton],
        });

        this.bindEvent(listItem);

        this.listItems.appendChild(listItem);

        return listItem;
    }

    createListElement({ data, elementName, className, text, id, childs }) {
        const element = document.createElement(elementName);
        className !== '' ? (element.className = className) : '';

        if (id) {
            element.id = id;
        } else {
            if (className === 'list-item') {
                element.id = data.item_id;
            }
        }

        element.textContent =
            className === 'title'
                ? `${data.name.toUpperCase()}: ${data.size} : ${data.uuid}`
                : text;
        id === 'delete' ? element.setAttribute(`item-id`, data.item_id) : '';

        if (childs) {
            childs.forEach((child) => {
                element.appendChild(child);
            });
        }

        return element;
    }

    bindEvent(item) {
        const deleteButton = item.querySelector('button.delete');

        deleteButton.addEventListener('click', this.delListItem.bind(this));
    }

    delListItem(e) {
        const item_id = e.target.attributes[2].value;
        this.dispatch('removeFigureEvent', { item_id: item_id });

        const item = document.getElementById(`${e.target.attributes[2].value}`);

        this.listItems.removeChild(item);
    }

    // ---------- EVENT SYSTEM ----------
    subscribe(eventName, cb) {
        if (!this.callbacks[eventName]) {
            this.callbacks[eventName] = [];
        }
        this.callbacks[eventName].push(cb);
    }

    dispatch(eventName, props = {}) {
        if (eventName in this.callbacks) {
            this.callbacks[eventName].forEach((cb) => cb(props));
        }
    }
    // ---------- END OF EVENT SYSTEM ----------
}
