import Viewer from './Viewer';
import DataStorage from './DataStorege';
import FormControl from './ViewerForm';

export default class App {
    constructor(viewerContainer) {
        this.viewer = new Viewer(viewerContainer);
        this.dataStorage = new DataStorage();
        this.formControl = new FormControl();
    }

    init() {
        this.formControl.init();
        this.viewer.init();
        this.setListeners();
    }

    setListeners() {
        this.formControl.subscribe('addFigureEvent', (figureProps) => {
            const newFigure = this.addNewFigureToViewer(figureProps);
            this.dataStorage.saveItem(newFigure);

            this.formControl.addListItem(newFigure);
        });

        this.formControl.subscribe('removeFigureEvent', (item_id) => {
            const figure = this.dataStorage.getItemById(item_id);

            this.viewer.deleteFigure(figure);
            this.dataStorage.removeItem(figure);
            this.dataStorage.getAllItems();
        });
    }

    addNewFigureToViewer({ name, size }) {
        let newFigure = this.viewer.createFigure(name, size);

        return newFigure;
    }
}
