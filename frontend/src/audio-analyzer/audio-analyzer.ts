import '../../static/stylesheets/drop-style.css';
import { FileGetter } from './file-getter';

class AudioAnalyzer {
    constructor() {
        console.log('%cThis is AudioAnalylzer', 'color:orange');
    }
}

const createDropZone = () => {
    const dzw = document.createElement('div');
    dzw.className = "full-overlay";

    dzw.innerHTML = `
    <div class="file-request-popover">
        <div>
            <h1>Drop your file here</h1>
            <div class="file-drop-zone"></div>
        </div>
        <hr />
        <input id="file-choose-dialog" type="file" />
    </div>
    `;

    document.body.append(dzw);

    return dzw;
}

const intialize = () => {
    // new AudioAnalyzer();
    const dropZoneWrapper = createDropZone();
    const fileGetter = new FileGetter(dropZoneWrapper);
    fileGetter.gotFiles = (ev) => {
        console.log("got files", ev);
    }
}



if (document.readyState == 'loading')
    document.addEventListener('DOMContentLoaded', intialize);
else
    intialize();