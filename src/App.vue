<template>
  <h1 class="center-text">{{ name }}</h1>
  <h3>by: {{ author }}</h3>
  <AutoSaveButton
    @autoSave="toggleAutoSave"
    ref="AutoSave"
    :isAutoSaveOn="autoSave"
  />
  <TextInput
    name="Cardboard Name"
    :value="name"
    @valueChanged="setName"
  />
  <TextInput
    name="Cardboard Author"
    :value="author"
    @valueChanged="setAuthor"
  />
  <div class="center-center row flex-wrap">
    <TextInput
      name="Front Side"
      :value="sideName.front"
      @valueChanged="setFrontSide"
    />
    <TextInput
      name="Back Side"
      :value="sideName.back"
      @valueChanged="setBackSide"
    />
  </div>
  <NewCardboard
    v-for="cardboard in cardboards"
    ref="cardboardArrayObject"
    @deleteCardboard="deleteCardboard"
    @deleteFrontField="deleteFrontField"
    @deleteBackField="deleteBackField"
    @nextCardboard="moveToNextCardboard"
    @inputFrontChanged="inputFrontChanged"
    @inputBackChanged="inputBackChanged"
    :side-name="sideName"
    :key="cardboard.id"
    :cardboard-data="cardboard"
  />
  <AddButton @newCardboard="createNewCardboard" />
  <ExportButton
    :name="name"
    :author="author"
    :side-name="sideName"
    :cardboards="cardboards"
    ref="Export"
  />
</template>

<script>
import TextInput from './components/TextInput.vue';
import NewCardboard from './components/NewCardboard.vue';
import AddButton from './components/AddButton.vue';
import ExportButton from './components/ExportButton.vue';
import AutoSaveButton from './components/AutoSaveButton.vue';

export default {
  name: 'App',
  data() {
    return {
      autoSave: false,
      name: 'New Cardboard',
      author: 'Unknown',
      sideName: {
        front: 'Default',
        back: 'Default',
      },
      cardboards: [
        {
          id: 0,
          front: [''],
          back: [''],
        },
      ],
    };
  },
  methods: {
    deleteFrontField: function (cardboardID, fieldID) {
      if (this.cardboards[cardboardID].front.length <= 1) return;
      this.cardboards[cardboardID].front.splice(fieldID, 1);
    },
    deleteBackField: function (cardboardID, fieldID) {
      if (this.cardboards[cardboardID].back.length <= 1) return;
      this.cardboards[cardboardID].back.splice(fieldID, 1);
    },
    toggleAutoSave: function (e) {
      this.autoSave = e;
      if (this.autoSave) {
        this.$refs['AutoSave'].setCookie(
          'last_save',
          JSON.stringify(
            this.$refs['Export'].createFlashcardObject(this.name, this.author, this.sideName, this.cardboards)
          ),
          7
        );
      } else {
        this.$refs['AutoSave'].deleteCookie('last_save');
      }
    },
    createNewCardboard: function () {
      this.cardboards[this.cardboards.length] = {
        id: this.cardboards.length,
        front: [''],
        back: [''],
      };
      if (this.autoSave) {
        this.$refs['AutoSave'].setCookie(
          'last_save',
          JSON.stringify(
            this.$refs['Export'].createFlashcardObject(this.name, this.author, this.sideName, this.cardboards)
          ),
          7
        );
      }
    },
    moveToNextCardboard: function (id) {
      if (id < this.cardboards.length - 1) {
        this.$refs['cardboardArrayObject'][id + 1].$refs['front'].focus();
      } else {
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
      });
    },
    setAuthor: function (author) {
      this.author = author;
    },
    setName: function (name) {
      this.name = name;
    },
    setFrontSide: function (frontSide) {
      this.sideName.front = frontSide;
    },
    setBackSide: function (backSide) {
      this.sideName.back = backSide;
    },
    inputFrontChanged: function (value, id) {
      if (value.slice(-1) == '/' && value.length > 1) {
        this.cardboards[id].front.push('');
      } else if (value.slice(-1) != '/') {
        let lastIndex = this.cardboards[id].front.length - 1;
        this.cardboards[id].front[lastIndex] = value;
      }
    },
    inputBackChanged: function (value, id) {
      if (value.slice(-1) == '/' && value.length > 1) {
        this.cardboards[id].back.push('');
      } else if (value.slice(-1) != '/') {
        let lastIndex = this.cardboards[id].back.length - 1;
        this.cardboards[id].back[lastIndex] = value;
      }
    },
  },
  mounted() {
    var data;
    if ((data = this.$refs['AutoSave'].getCookie('last_save')) != null) {
      this.autoSave = true;
      data = JSON.parse(data);
      if (data.name != undefined) this.name = data.name;
      if (data.author != undefined) this.author = data.author;
      if (data.sideName != undefined) {
        if (data.sideName.front != undefined) this.sideName.front = data.sideName.front;
        if (data.sideName.back != undefined) this.sideName.back = data.sideName.back;
      }
      if (data.cardboards != undefined) {
        if (Array.isArray(data.cardboards)) {
          data.cardboards.forEach((value, index) => {
            this.cardboards[index] = {
              id: index,
              front: value.front != undefined ? value.front : '',
              back: value.back != undefined ? value.back : '',
            };
          });
        }
      }
    }
  },
  components: {
    NewCardboard,
    AddButton,
    ExportButton,
    TextInput,
    AutoSaveButton,
  },
};
</script>

<style>

html,
body {
  padding: 0;
  margin: 0;
  max-width: 100%;
  min-height: 100%;
  background-color: #512b81;
  color: white;
  overflow-x: hidden;
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Mooli, sans-serif;
}

.text-center {
  text-align: center;
}

.center-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.row {
  display: flex;
  flex-direction: row;
}

.flex-wrap {
  display: flex;
  flex-wrap: wrap;
}

input,
select,
option,
button {
  font: inherit;
}
</style>
