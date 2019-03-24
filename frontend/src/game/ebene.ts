import {Group, Mesh, MeshBasicMaterial, PlaneGeometry} from "three";


export class Ebene {
    private _body: Group;
    private _ebeneGeometry;
    private _ebeneMaterial;
    private _ebene;

    /**
     * Y Position auf der, der Charakter steht
     */
    public static readonly Y_VALUE = 1.5;

    public constructor() {
        this._body = new Group();
        this._ebeneGeometry = new PlaneGeometry(200, 2, 2);

        //this.ebene.applyMatrix(new Matrix4().makeRotationX(-Math.PI/2));

        this._ebeneMaterial = new MeshBasicMaterial({
            color: 0x68c3c0,
            opacity: .6,
        });

        this._ebene = new Mesh(this._ebeneGeometry, this._ebeneMaterial);

        this._body.position.y = 0;
        this._body.add(this._ebene);
    }

    get ebene() {
        return this._ebene;
    }

    get body(): Group {
        return this._body;
    }

    set body(value: Group) {
        this._body = value;
    }

    get ebeneGeometry() {
        return this._ebeneGeometry;
    }

    set ebeneGeometry(value) {
        this._ebeneGeometry = value;
    }

    get ebeneMaterial() {
        return this._ebeneMaterial;
    }

    set ebeneMaterial(value) {
        this._ebeneMaterial = value;
    }
}