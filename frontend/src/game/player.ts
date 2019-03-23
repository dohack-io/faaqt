import {BoxGeometry, Group, Material, Mesh, MeshBasicMaterial} from 'three';
import {PlayerStatusEnum} from './enums/player-status.enum';

export class Player {
    set torso(value: Mesh) {
        this._torso = value;
    }

    /**
     * Fasst alle  Objekte zusammen, die zu einem Player gehören
     */
    private _body: Group;
    private _torso: Mesh;

    /**
     * Gibt an bis zu welch einer Höhe der Spieler springen kann
     */
    private _jumpHeight: number = 6;
    private _status: PlayerStatusEnum = PlayerStatusEnum.RUNNING;

    public constructor() {
        this._body = new Group();
        let torsoMaterial: Material = new MeshBasicMaterial({color: 0xcccccc});
        let torsoGeometry = new BoxGeometry(1, 1, 1, 100);
        this._torso = new Mesh(torsoGeometry, torsoMaterial);
        this._body.add(this._torso);

    }

    jump(): void {
        // Nix machen, wenn gerade in der Jump Animation
        // if (this.status == PlayerStatusEnum.JUMPING)
        //     return;

        let direction = true;
        let id;
        if (this._status == PlayerStatusEnum.JUMPING)
            return;

        let doJump = () => {
            if (this._body.position.y >= this._jumpHeight) {
                direction = false;
                console.log("direction false");
            }

            if (direction && this._body.position.y <= this._jumpHeight) {
                this._status = PlayerStatusEnum.JUMPING;
                this._body.position.y += 0.1;
                console.log("up");
                id = requestAnimationFrame(doJump);

            } else if (!direction && this._body.position.y >= 0) {
                this._status = PlayerStatusEnum.JUMPING;
                console.log("down");
                this._body.position.y -= 0.1;
                id = requestAnimationFrame(doJump);

            } else {
                this._status = PlayerStatusEnum.RUNNING;
                console.log("ende");
                cancelAnimationFrame(id);
                this._body.position.y = 0;
            }
        };
        requestAnimationFrame(doJump);

        console.log("jump")
        // let tweenJump = new TWEEN.Tween(this._body.position)
        //     .to({x: this._jumpHeight}, 1000)
        //     .easing(TWEEN.Easing.Quadratic.InOut)
        //     .start()
        //     .onComplete(() => {
        //         this.status = PlayerStatusEnum.RUNNING;
        //     });
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


    get status(): PlayerStatusEnum {
        return this._status;
    }

    set status(value: PlayerStatusEnum) {
        this._status = value;
    }
}