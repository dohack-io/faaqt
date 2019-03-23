import {CylinderGeometry, Matrix4, Mesh, MeshBasicMaterial} from "three";


export class Ebene {
    private ebene;
    private material;
    private _cylinder;

    public constructor() {
        this.ebene = new CylinderGeometry(2, 2, 1, 8, 1);
        this.ebene.applyMatrix(new Matrix4().makeRotationX(-Math.PI / 2));

        this.material = new MeshBasicMaterial({
            color: 0x68c3c0,
            opacity: .6,
        });

        this._cylinder = new Mesh(this.ebene, this.material);

    }

    get cylinder() {
        return this._cylinder;
    }


}