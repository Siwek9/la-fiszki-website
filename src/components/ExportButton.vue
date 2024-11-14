<template>
    <button
        class="text-button"
        @click="exportFlashcards"
    >
        Export Set
    </button>
</template>

<script>
function exportFlashcards() {
    if (this.name === '') return;
    if (this.author === '') return;
    if (this.sideName.front === '') return;
    if (this.sideName.back === '') return;
    let empty = false;
    this.flashcards.forEach(cardboard => {
        if (cardboard.front === '' || cardboard.back === '') {
            empty = true;
            return;
        }
    });
    if (empty) return;

    let objectToExport = this.createFlashcardObject(this.name, this.author, this.sideName, this.flashcards);

    var downloadAnchorNode = document.createElement('a');
    const file = new Blob([JSON.stringify(objectToExport)], {type: 'text/plain'});
    downloadAnchorNode.href = URL.createObjectURL(file);
    downloadAnchorNode.download = objectToExport.name += '.json';
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}
function createFlashcardObject(name, author, sideName, flashcards) {
    return {
        name: name,
        author: author,
        sideName: {
            ...sideName,
        },
        version: '0.1',
        flashcards: flashcards.map(cardboard => {
            return {
                front: [...cardboard.front],
                back: [...cardboard.back],
            };
        }),
    };
}
const props = defineProps(['name', 'author', 'sideName', 'flashcards']);
</script>

<style>
.text-button {
    all: unset;
    margin: 20px;
    padding: clamp(15px, 3vw, 25px);
    background-color: #35155d;
    border-radius: 25px;
}

.text-button:hover {
    cursor: pointer;
}
</style>
