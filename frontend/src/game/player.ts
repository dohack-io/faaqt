import {BoxGeometry, Group, Material, Mesh, MeshBasicMaterial} from 'three';
import {PlayerStatusEnum} from './enums/player-status.enum';
import {Ebene} from './ebene';

export class Player {
    /**
     * Fasst alle  Objekte zusammen, die zu einem Player gehören
     */
    private _body: Group;
    private _torso: Mesh;

    /**
     * Gibt an bis zu welch einer Höhe der Spieler springen kann
     */
    private _jumpHeight: number = Ebene.Y_VALUE + 1;
    private _jumpTime: number = 3;
    private _jumpPressed: number = 1;
    private _status: PlayerStatusEnum = PlayerStatusEnum.RUNNING;

    public constructor() {
        this._body = new Group();
        let torsoMaterial: Material = new MeshBasicMaterial({color: 0xcccccc});
        let torsoGeometry = new BoxGeometry(1, 1, 1, 100);
        this._torso = new Mesh(torsoGeometry, torsoMaterial);

        this._body.add(this._torso);

    }

    jump(): void {
        if (this._jumpPressed <= this._jumpTime) {
            this._jumpPressed++;
            console.log("++");
            let factor = 1;
            switch (this._jumpPressed) {
                case 1:
                    factor = 1.2;
                    break;
                case 2:
                    factor = 1.4;
                    break;
                case 3:
                    factor = 1.5;
                    break;
                default:
                    factor = 1.5;
            }
            this._jumpHeight = this._jumpHeight * factor;
            console.log(this._jumpHeight);
        }
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
            }

            if (direction && this._body.position.y <= this._jumpHeight) {
                this._status = PlayerStatusEnum.JUMPING;
                this._body.position.y += 0.1;
                id = requestAnimationFrame(doJump);

            } else if (!direction && this._body.position.y >= Ebene.Y_VALUE) {
                this._status = PlayerStatusEnum.JUMPING;
                this._body.position.y -= 0.1;
                id = requestAnimationFrame(doJump);

            } else {
                this._status = PlayerStatusEnum.RUNNING;
                cancelAnimationFrame(id);
                this._body.position.y = Ebene.Y_VALUE;
                this._jumpHeight = Ebene.Y_VALUE + 1;
                this._jumpPressed = 1;
            }
        };
        requestAnimationFrame(doJump);

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

    get jumpTime(): number {
        return this._jumpTime;
    }

    set jumpTime(value: number) {
        this._jumpTime = value;
    }

    get jumpPressed(): number {
        return this._jumpPressed;
    }

    set jumpPressed(value: number) {
        this._jumpPressed = value;
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