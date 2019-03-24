import {BoxGeometry, Group, Material, Mesh, MeshBasicMaterial} from 'three';
import {PlayerStatusEnum} from './enums/player-status.enum';
import {Ebene} from './ebene';

export class Player {
    public static readonly maxJumps: number = 3;
    /**
     * Fasst alle  Objekte zusammen, die zu einem Player gehören
     */
    private _body: Group;
    private _torso: Mesh;

    /**
     * Gibt an bis zu welch einer Höhe der Spieler springen kann
     */
    private _jumpHeight: number = Ebene.Y_VALUE + 4;
    private _jumpPressedMax: number = 3;
    private _jumpPressed: number = 1;
    private currentJumps: number = 0;
    private jumpDirection: boolean = true;

    /**
     * Animation ID
     */
    private id: number;

    private _status: PlayerStatusEnum = PlayerStatusEnum.RUNNING;

    public constructor() {
        this._body = new Group();
        let torsoMaterial: Material = new MeshBasicMaterial({color: 0xf2a2e8});
        let torsoGeometry = new BoxGeometry(1, 1, 1, 100);
        this._torso = new Mesh(torsoGeometry, torsoMaterial);

        this._body.add(this._torso);

    }

    jump(): void {
        // if (this._jumpPressed <= this._jumpPressedMax) {
        //     this._jumpPressed++;
        //     console.log("++");
        //     let factor = 1;
        //     switch (this._jumpPressed) {
        //         case 1:
        //             factor = 1.2;
        //             break;
        //         case 2:
        //             factor = 1.4;
        //             break;
        //         case 3:
        //             factor = 1.5;
        //             break;
        //         default:
        //             factor = 1.5;
        //     }
        //     this._jumpHeight = this._jumpHeight * factor;
        //     console.log(this._jumpHeight);
        // }
        // Nix machen, wenn gerade in der Jump Animation
        // if (this.status == PlayerStatusEnum.JUMPING)
        //     return;

        if (this.currentJumps <= this.jumpPressedMax) {
            this.jumpDirection = true;
        }
        // if (this._status != PlayerStatusEnum.JUMPING && this.currentJumps >= Player.maxJumps) {
        //     this._body.position.y = Ebene.Y_VALUE;
        //     return;
        // }
        // cancelAnimationFrame(this.id);
        this.currentJumps++;
        console.log(this.currentJumps);
        cancelAnimationFrame(this.id);
        let doJump = () => {
            if (this._body.position.y >= this._jumpHeight) {
                this.jumpDirection = false;
            }

            if (this.jumpDirection && this._body.position.y <= this._jumpHeight) {
                this._status = PlayerStatusEnum.JUMPING;
                this._body.position.y += 0.1;
                this.id = requestAnimationFrame(doJump);

            } else if (!this.jumpDirection && this._body.position.y >= Ebene.Y_VALUE) {
                this._status = PlayerStatusEnum.JUMPING;
                this._body.position.y -= 0.1;
                this.id = requestAnimationFrame(doJump);

            } else {
                this._status = PlayerStatusEnum.RUNNING;
                cancelAnimationFrame(this.id);
                console.log("cancel");
                this._body.position.y = Ebene.Y_VALUE;
                this._jumpHeight = Ebene.Y_VALUE + 4;
                this._jumpPressed = 1;
                this.currentJumps = 0;
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

    get jumpPressedMax(): number {
        return this._jumpPressedMax;
    }

    set jumpPressedMax(value: number) {
        this._jumpPressedMax = value;
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