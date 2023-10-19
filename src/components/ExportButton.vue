<template>
  <button
    class="text-button"
    @click="exportCardboards"
  >
    Export Cardboard
  </button>
</template>

<script>
export default {
  methods: {
    exportCardboards: function () {
      if (this.name === '') return;
      if (this.author === '') return;
      if (this.sideName.front === '') return;
      if (this.sideName.back === '') return;
      let empty = false;
      this.cardboards.forEach(cardboard => {
        if (cardboard.front === '' || cardboard.back === '') {
          empty = true;
          return;
        }
      });
      if (empty) return;

      let objectToExport = {
        name: this.name,
        author: this.author,
        sideName: {
          ...this.sideName,
        },
        cardboards: this.cardboards.map(cardboard => {
          return {
            front: cardboard.front,
            back: cardboard.back,
          };
        }),
      };

      var downloadAnchorNode = document.createElement('a');
      const file = new Blob([JSON.stringify(objectToExport)], {type: 'text/plain'});
      downloadAnchorNode.href = URL.createObjectURL(file);
      downloadAnchorNode.download = objectToExport.name += '.json';
      document.body.appendChild(downloadAnchorNode); // required for firefox
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    },
  },
  props: ['name', 'author', 'sideName', 'cardboards'],
};
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
