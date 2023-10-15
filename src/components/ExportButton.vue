<template>
  <button class="text-button" @click="exportCardboards">Export Cardboard</button>
</template>

<script>
export default {
  methods: {
    exportCardboards: function() {
      if (this.name === "") return;
      if (this.author === "") return;
      if (this.sideName.front === "") return;
      if (this.sideName.back === "") return;
      let empty = false;
      this.cardboards.forEach(cardboard => {
        if (cardboard.front === "" || cardboard.back === "") {
          empty = true;
          return
        }
      });
      if (empty) return;
      
      let objectToExport = {
        name: this.name,
        author: this.author,
        sideName: {
          ...this.sideName
        },
        cardboards: 
          this.cardboards.map(cardboard => {
            return {
              front: cardboard.front,
              back: cardboard.back
            };
          })
      }

      var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(objectToExport));
      var downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", this.name + ".json");
      document.body.appendChild(downloadAnchorNode); // required for firefox
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    }
  },
  props:[
    'name',
    'author',
    'sideName',
    'cardboards'
  ]
}
</script>

<style>

.text-button {
  all: unset;
  margin: 20px;
  padding: 1vw;
  font: inherit;
  background-color: #35155D;
  border-radius: 25px;
}

.text-button:hover {
  cursor: pointer;
}

</style>