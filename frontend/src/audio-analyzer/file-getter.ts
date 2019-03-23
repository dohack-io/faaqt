export class FileGetter {
    private boundDropListener = this.dropListener.bind(this);
    private boundDragListener = this.dragListener.bind(this);

    private timeout = null;

    constructor(private wrapper: HTMLElement) {
        wrapper.addEventListener('drop', this.boundDropListener);
        document.addEventListener('dragover', this.boundDragListener);
    }

    show() {
        this.wrapper.classList.add('shown');
        if (this.timeout !== null)
            clearTimeout(this.timeout);

        this.timeout = setTimeout(this.clearShown.bind(this), 700);
    }

    clearShown() {
        clearTimeout(this.timeout);
        this.wrapper.classList.remove('shown');
    }

    dragListener(ev: DragEvent) {
        ev.preventDefault();
        this.show();
    }

    dropListener(ev: DragEvent) {
        ev.preventDefault();

        const files = [];

        if (ev.dataTransfer.items) {
            for (const item of ev.dataTransfer.items)
                if (item.kind == 'file') {
                    const file = item.getAsFile();
                    files.push(file);
                }
        } else {
            for (const file of ev.dataTransfer.files) {
                files.push(file);
            }
        }

        this.gotFiles.call(undefined, files);
        this.clearShown();
    }

    gotFiles(files: File[]) { }
}