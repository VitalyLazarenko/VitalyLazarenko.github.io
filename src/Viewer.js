export default class Viewer {
    constructor(viewerContainer) {
        this.viewerContainer = viewerContainer;
        this.renderer = new THREE.WebGLRenderer();
        this.viewerContainer.appendChild(this.renderer.domElement);

        this.renderHeight = this.viewerContainer.offsetHeight;
        this.renderWidth = this.viewerContainer.offsetWidth;

        this.scene = new THREE.Scene();
        this.axesHelper = new THREE.AxesHelper(15);
        this.camera = new THREE.PerspectiveCamera(
            25,
            this.renderWidth / this.renderHeight,
            0.1,
            1000
        );

        this.randomCoordinatesLimits = {
            x: {
                min: -30,
                max: 30,
            },
            y: {
                min: -17,
                max: 17,
            },
            z: {
                min: -30,
                max: 30,
            },
        };
    }

    init() {
        this.scene.add(this.axesHelper);
        this.renderer.setSize(this.renderWidth, this.renderHeight);
        this.camera.position.z = 120;
        this.controls = new THREE.OrbitControls(
            this.camera,
            this.renderer.domElement
        );

        const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
        hemiLight.color.setHSL( 0.095, 1, 0.75 );
        hemiLight.groundColor.setHSL( 0.6, 1, 0.6 );
        hemiLight.position.set( 0, 100, 0 );
        this.scene.add( hemiLight );

        this._animate();
    }

    createFigure(name, size) {
        let geometry;
        let material;
        switch (name) {
            case 'Box':
                geometry = new THREE.BoxGeometry(1, 1, 1);
                material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
                break;
            case 'Sphere':
                geometry = new THREE.SphereGeometry(1, 32, 32);
                material = new THREE.MeshStandardMaterial({ color: 0x0000ff });
                break;
            case 'Pyramid':
                geometry = new THREE.CylinderGeometry(0, 1, 1, 4);
                material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
                break;
            default:
                alert('Something went wrong! :D');
                break;
        }

        const figure = new THREE.Mesh(geometry, material);

        figure.position.x = this.createRandomCordinates('x');
        figure.position.y = this.createRandomCordinates('y');
        figure.position.z = this.createRandomCordinates('z');

        figure.geometry.scale(size, size, size);

        this.scene.add(figure);

        return {
            item_id: String(Date.now()),
            uuid: figure.uuid,
            name: name,
            size: size,
        };
    }

    generateRandomCordinate(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    createRandomCordinates(axis) {
        return this.generateRandomCordinate(
            this.randomCoordinatesLimits[axis].min,
            this.randomCoordinatesLimits[axis].max
        );
    }

    deleteFigure({ uuid }) {
        let removeFigure;

        for (let i = 0; i < this.scene.children.length; i++) {
            if (this.scene.children[i].uuid === uuid) {
                removeFigure = this.scene.children[i];
            }
        }

        this.scene.remove(removeFigure);
    }

    _animate() {
        requestAnimationFrame(() => this._animate());
        this.renderer.render(this.scene, this.camera);
        this.controls.update();
    }
}
