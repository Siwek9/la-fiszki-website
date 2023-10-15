<template>
  <div class="cardboard-top row center-middle">
    <div class="cardboard">
      <div class="row center-middle">
        <div class="cardboard-input">
          <span class="input-name">{{sideName.front}}:</span>
          <div class="input-field-background">
            <input 
              type="text" 
              class="input-field" 
              placeholder="Text Here"
              ref="front"
              :value="cardboardData.front" 
              @input="inputFrontChanged"
              @focus="inputFocus"
              @keyup.enter="frontSideMoveTab"
              @keyup.tab.prevent="frontSideMoveTab"
            >
          </div>
        </div>
        <span class="fields-divider">-></span>
        <div class="cardboard-input">
          <span class="input-name">{{sideName.back}}:</span>
          <div class="input-field-background">
            <input 
              type="text" 
              class="input-field" 
              placeholder="Text Here"
              ref="back"
              :value="cardboardData.back" 
              @input="inputBackChanged"
              @focus="inputFocus"
              @keyup.enter.prevent="backSideMoveTab"
              @keydown.tab.prevent="backSideMoveTab"
              >
          </div>
        </div>
      </div>
    </div>
    <span class="delete-button material-symbols-outlined" @click="deleteCardboard">delete</span>
  </div>
</template>

<script>
  export default {
    methods: {
      inputFocus: function(e) {
        // console.log("siema")
        e.target.select();
      },
      frontSideMoveTab: function(e) {
        if (e.target.value != "") {
          this.$refs['back'].focus();
        }
      },
      backSideMoveTab: function(e) {
        if (e.target.value != "") {
          this.$emit("nextCardboard", this.cardboardData.id)
        }
        // browser.tabs.move()
      },
      deleteCardboard: function() {
        this.$emit("deleteCardboard", this.cardboardData.id);
      },
      inputFrontChanged: function(e) {
        this.$emit("inputFrontChanged", e.target.value, this.cardboardData.id)
      },
      inputBackChanged: function(e) {
        this.$emit("inputBackChanged", e.target.value, this.cardboardData.id)
      },
    },
    props: [
      'cardboardData',
      'sideName'
    ],
    mounted() {
      // if (this.cardboardData.id = 1) {
        this.$refs["front"].focus();
      // }
      // console.log("witam");
    }
  }
</script>

<style>

.fields-divider {
  font-weight: bold;
  font-size: 2em;
  margin: min(15px, 2vw); 
}

.cardboard-input .input-field::placeholder {
  color: #8f7da7;
}

.cardboard-input .input-field {
  min-width: 200px;
  /* width: unset; */
  font: inherit;
  font-size: max(1em, 1vw);
  outline: none;
  border: none;
  color: white;
  /* border-bottom: white 2px solid; */
  background-color: transparent;
}

.cardboard-input .input-name {
  margin: 0 0 1vh 1vw; 
}

.cardboard-input .input-field-background {
  padding: max(.5em, 1vw);
  border-radius: 1.5em;
  background-color: #512B81;
}

.cardboard-input {
  display: flex;
  flex-direction: column;
}

.center-middle {
  display: flex;
  justify-content: center;
  align-items: center;
}

.row {
  display: flex;
  flex-direction: row;
}

.cardboard {
  border-radius: 15px;
  background-color: #35155D;
  padding: 2vh 2vw;
  margin: 10px;
}

.delete-button {
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fd000066;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  aspect-ratio: 1/1;
}

.delete-button:hover {
  cursor: pointer;
}

.cardboard-top {
  margin-left:40px;
}

</style>