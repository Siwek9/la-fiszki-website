<template>
  <!-- <ImportDialog v-if="importDialogOpen" /> -->
  <h1 class="center-text">{{ name }}</h1>
  <h3>by: {{ author }}</h3>
  <AutoSaveButton
    @autoSave="toggleAutoSave"
    ref="auto_save"
    :isAutoSaveOn="autoSave"
  />
  <ImportButton />
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
    v-for="cardboard in flashcards"
    ref="flashcard_array_object"
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
    :cardboards="flashcards"
    ref="export"
  />
</template>

<script lang="ts">
import {defineComponent, useTemplateRef} from 'vue';

import TextInput from './components/TextInput.vue';
import NewCardboard from './components/NewCardboard.vue';
import AddButton from './components/AddButton.vue';
import ExportButton from './components/ExportButton.vue';
import AutoSaveButton from './components/AutoSaveButton.vue';
// import ImportButton from './components/ImportButton.vue';
// import ImportDialog from './components/ImportDialog.vue';
import Flashcard from './utils/Flashcard';

// type AutoSaveButtonType = InstanceType<typeof AutoSaveButton>;
// type ExportButtonType = InstanceType<typeof ExportButton>;

const autoSaveRef = useTemplateRef<typeof AutoSaveButton>('auto_save');
const exportRef = useTemplateRef<typeof ExportButton>('export');

export default defineComponent({
  name: 'App',
  data() {
    return {
      // importDialogOpen: false,
      autoSave: false,
      name: 'New Flashcards Set',
      author: 'Unknown',
      sideName: {
        front: 'Default',
        back: 'Default',
      },
      flashcards: [] as Array<Flashcard>,
    };
  },
  methods: {
    deleteFrontField: function (flashcardID: number, fieldID: number) {
      if (this.flashcards[flashcardID].front.length <= 1) return;
      this.flashcards[flashcardID].front.splice(fieldID, 1);
    },
    deleteBackField: function (cardboardID: number, fieldID: number) {
      if (this.flashcards[cardboardID].back.length <= 1) return;
      this.flashcards[cardboardID].back.splice(fieldID, 1);
    },
    toggleAutoSave: function (toggle: boolean) {
      this.autoSave = toggle;
      if (this.autoSave) {
        autoSaveRef.value?.setCookie(
          'last_save',
          JSON.stringify(
            exportRef.value?.createFlashcardObject(this.name, this.author, this.sideName, this.flashcards)
          ),
          7
        );
      } else {
        autoSaveRef.value?.methods?.deleteCookie('last_save');
      }
    },
    createNewCardboard: function () {
      this.flashcards[this.flashcards.length] = {
        id: this.flashcards.length,
        front: [''],
        back: [''],
      };
      // if (this.autoSave) {
      //     this.$refs['auto_save'].setCookie(
      //         'last_save',
      //         JSON.stringify(
      //             this.$refs['export'].createFlashcardObject(
      //                 this.name,
      //                 this.author,
      //                 this.sideName,
      //                 this.flashcards
      //             )
      //         ),
      //         7
      //     );
      // }
    },
    moveToNextCardboard: function (id: number) {
      if (id < this.flashcards.length - 1) {
        // this.$refs['cardboardArrayObject'][id + 1].$refs['front'].focus();
      } else {
        this.createNewCardboard();
      }
    },
    deleteCardboard: function (id: number) {
      if (this.flashcards.length <= 1) return;
      this.flashcards.splice(id, 1);
      var i = 0;
      this.flashcards.forEach(cardboard => {
        cardboard.id = i;
        i++;
      });
    },
    setAuthor: function (author: string) {
      this.author = author;
    },
    setName: function (name: string) {
      this.name = name;
    },
    setFrontSide: function (frontSide: string) {
      this.sideName.front = frontSide;
    },
    setBackSide: function (backSide: string) {
      this.sideName.back = backSide;
    },
    inputFrontChanged: function (value: string, id: number) {
      if (value.slice(-1) == '/' && value.length > 1) {
        this.flashcards[id].front.push('');
      } else if (value.slice(-1) != '/') {
        let lastIndex = this.flashcards[id].front.length - 1;
        this.flashcards[id].front[lastIndex] = value;
      }
    },
    inputBackChanged: function (value: string, id: number) {
      if (value.slice(-1) == '/' && value.length > 1) {
        this.flashcards[id].back.push('');
      } else if (value.slice(-1) != '/') {
        let lastIndex = this.flashcards[id].back.length - 1;
        this.flashcards[id].back[lastIndex] = value;
      }
    },
  },
  mounted() {
    // var data;
    // if ((data = this.$refs['auto_save'].getCookie('last_save')) != null) {
    //     this.autoSave = true;
    //     data = JSON.parse(data);
    //     if (data.name != undefined) this.name = data.name;
    //     if (data.author != undefined) this.author = data.author;
    //     if (data.sideName != undefined) {
    //         if (data.sideName.front != undefined) this.sideName.front = data.sideName.front;
    //         if (data.sideName.back != undefined) this.sideName.back = data.sideName.back;
    //     }
    //     if (data.cardboards != undefined) {
    //         if (Array.isArray(data.cardboards)) {
    //             data.cardboards.forEach((value, index) => {
    //                 this.flashcards[index] = {
    //                     id: index,
    //                     front: value.front != undefined ? value.front : '',
    //                     back: value.back != undefined ? value.back : '',
    //                 };
    //             });
    //         }
    //     }
    // }
  },
  components: {
    NewCardboard,
    AddButton,
    ExportButton,
    TextInput,
    AutoSaveButton,
    // ImportButton,
    // ImportDialog,
  },
});
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
