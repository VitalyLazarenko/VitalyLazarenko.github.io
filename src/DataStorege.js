export default class DataStorage {
    constructor() {
        this.figureDataList = [];
    }

    saveItem(data) {
        if (data === '') return alert('No data to add!');

        this.figureDataList.push(data);
    }

    getAllItems() {
        return this.figureDataList;
    }

    getItemById({ item_id }) {
        if (item_id === '') alert('Which item to find? ');

        let findItem = this.figureDataList.find((item) => item.item_id === item_id);

        if (findItem !== '') {
            return findItem;
        } else {
            alert('Such an element does not exist!');
        }
    }

    removeItem({ item_id }) {
        this.figureDataList.forEach((item, index) => {
            item.item_id === item_id ? this.figureDataList.splice(index, 1) : '';
        });
    }
}
