import {BoxGeometry, Group, Material, Mesh, MeshBasicMaterial} from 'three';
import {PlayerStatusEnum} from './enums/player-status.enum';

export class Player {
    /**
     * Fasst alle  Objekte zusammen, die zu einem Player gehören
     */
    private _body: Group;
    private torso: Mesh;

    /**
     * Gibt an bis zu welch einer Höhe der Spieler springen kann
     */
    private _jumpHeight: number = 5;
    private status: PlayerStatusEnum = PlayerStatusEnum.RUNNING;

    public constructor() {
        this._body = new Group();
        let torsoMaterial: Material = new MeshBasicMaterial({color: 0xcccccc});
        let torsoGeometry = new BoxGeometry(1, 1, 1, 100);
        this.torso = new Mesh(torsoGeometry, torsoMaterial);
        this._body.add(this.torso);

    }

    jump(): void {
        // Nix machen, wenn gerade in der Jump Animation
        if (this.status == PlayerStatusEnum.JUMPING)
            return;

        this.status = PlayerStatusEnum.JUMPING;
        new createjs.Tween(this._body.position)
            .to({y: this._jumpHeight}, 1);
        // TweenMax.to(this.mesh.position, totalSpeed/2, {y:jumpHeight, ease:Power2.easeOut});
        // TweenMax.to(this.mesh.position, totalSpeed/2, {y:0, ease:Power4.easeIn, delay:totalSpeed/2, onComplete: function(){
        //         //t = 0;
        //         _this.status="running";
        //     }});

    }

    get body(): Group {
        return this._body;
    }

    get jumpHeight(): number {
        return this._jumpHeight;
    }

    set jumpHeight(value: number) {
        this._jumpHeight = value;
    }
}