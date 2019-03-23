import {BoxGeometry, Group, Material, Mesh, MeshBasicMaterial} from 'three';

export class Player {
    private _body: Group;
    private torso: Mesh;

    public constructor() {
        this._body = new Group();
        let torsoMaterial: Material = new MeshBasicMaterial({color: 0xcccccc});
        let torsoGeometry = new BoxGeometry(1, 1, 1, 100);
        this.torso = new Mesh(torsoGeometry, torsoMaterial);
        this._body.add(this.torso);
    }


    get body(): Group {
        return this._body;
    }
}