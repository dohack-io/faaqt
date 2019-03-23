import {BoxGeometry, Group, Material, Mesh, MeshBasicMaterial} from 'three';

export class Hurdle {
    private _body: Group;

    public constructor() {
        this._body = new Group();
        let hurdleMaterial: Material = new MeshBasicMaterial({color: 0x00ff00});
        let hurdleGeometry = new BoxGeometry(1, 1, 1, 100);
        let hurdleMesh: Mesh = new Mesh(hurdleGeometry, hurdleMaterial);
        this.body.add(hurdleMesh);
    }


    get body(): Group {
        return this._body;
    }
}