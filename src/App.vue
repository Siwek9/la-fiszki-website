<template>
  <h1>{{ name }}</h1>
  <h3>by: {{ author }}</h3>
  <TextInput name="Cardboard Name" :value="name" @valueChanged="setName"/>
  <TextInput name="Cardboard Author" :value="author" @valueChanged="setAuthor"/>
  <div class="row">
    <TextInput name="Front Side" :value="side_name.front" @valueChanged="setFrontSide"/>
    <TextInput name="Back Side" :value="side_name.back" @valueChanged="setBackSide"/>
  </div>
  <NewCardboard 
    ref="cardboardArrayObject" 
    @deleteCardboard="deleteCardboard" 
    @nextCardboard="moveToNextCardboard" 
    @inputFrontChanged="inputFrontChanged"
    @inputBackChanged="inputBackChanged"
    v-for="cardboard in cardboards" 
    :side-name="side_name" 
    :key="cardboard.id" 
    :cardboard-data="cardboard" />
  <AddButton @newCardboard="createNewCardboard"/>
  <ExportButton :name="name" :author="author" :side-name="side_name" :cardboards="cardboards" />
</template>

<script>
import TextInput from './components/TextInput.vue';
import NewCardboard from './components/NewCardboard.vue';
import AddButton from './components/AddButton.vue';
import ExportButton from './components/ExportButton.vue';

export default {
  name: 'App',
  data() {
    return {
      name: "New Cardboard",
      author: "Unknown",
      side_name: {
        front: "Default",
        back: "Default"
      },
      cardboards: [
        {
          id: 0,
          front: "",
          back: ""
        }
      ]
    }
  },
  methods: {
    createNewCardboard: function () {
      this.cardboards[this.cardboards.length] = {
        id: this.cardboards.length,
        front:"",
        back:""
      }
      // this.$refs['cardboardArrayObject'][this.cardboards.length - 1].$refs["first_side"].focus();
    },
    moveToNextCardboard: function (id) {
      if (id < this.cardboards.length - 1) {
        this.$refs['cardboardArrayObject'][id + 1].$refs["front"].focus();
      }
      else {
        this.createNewCardboard();
      }
    },
    deleteCardboard: function (id) {
      if (this.cardboards.length <= 1) return;
      this.cardboards.splice(id, 1);
      var i = 0;
      this.cardboards.forEach(cardboard => {
        cardboard.id = i;
        i++;
      })
    },
    setAuthor: function (author) {
      this.author = author;
    },
    setName: function (name) {
      this.name = name;
    },
    setFrontSide: function (frontSide) {
      this.side_name.front = frontSide;
    },
    setBackSide: function (backSide) {
      this.side_name.back = backSide;
    },
    inputFrontChanged: function(value, id) {
      this.cardboards[id].front = value;
    },
    inputBackChanged: function(value, id) {
      this.cardboards[id].back = value;
    },
  },
  components: {
    NewCardboard,
    AddButton,
    ExportButton,
    TextInput
  }
  
}
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Mooli);

html, body {
  padding: 0;
  margin: 0;
  min-width: 100%;
  min-height: 100%;
  background-color: #512B81;
  color: white;
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  
  font-family: Mooli, Arial, Helvetica, sans-serif;
}
</style>
