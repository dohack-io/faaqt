export class FileGetter {
    private boundDropListener = this.dropListener.bind(this);
    private boundDragListener = this.dragListener.bind(this);

    constructor(private wrapper: HTMLElement) {
        wrapper.addEventListener('drop', this.boundDropListener);
        wrapper.addEventListener('dragover', this.boundDragListener);
    }

    dragListener(ev: DragEvent) {
        ev.preventDefault();
    }

    dropListener(ev: DragEvent) {
        console.log('drop initiated', ev);
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
    }

    gotFiles(files: File[]) { }
}