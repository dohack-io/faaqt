import '../../static/stylesheets/drop-style.css';

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
            <h1>Drop your File here</h1>
            <div class="file-drop-zone"></div>
        </div>
        <hr />
        <input id="file-choose-dialog" type="file" />
    </div>
    `;

    document.body.append(dzw);
}

const intialize = () => {
    // new AudioAnalyzer();
    createDropZone();
}



if (document.readyState == 'loading')
    document.addEventListener('DOMContentLoaded', intialize);
else
    intialize();