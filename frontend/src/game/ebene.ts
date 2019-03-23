import {
    CircleGeometry, CylinderGeometry, FlatShading, Matrix4, Mesh, MeshBasicMaterial,
    MeshPhongMaterial, PlaneGeometry, SphereGeometry
} from "three";


export class Ebene {

    private ebene;
    private material;
    private _cylinder;


    public constructor() {
        this.ebene = new PlaneGeometry(200,2,2);
        //this.ebene.applyMatrix(new Matrix4().makeRotationX(-Math.PI/2));

        this.material = new MeshBasicMaterial({
            color:0x68c3c0,
            transparent:0x23190f,
            opacity:.6,

        });

        this._cylinder = new Mesh(this.ebene,this.material);
        this.cylinder.position.y = -15;

    }

    get cylinder() {
        return this._cylinder;
    }


}