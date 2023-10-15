<template>
  <div class="add-button" @click="addButton" tabindex="1">+</div>
</template>

<script>

export default {
    data() {
      return {

      }
    },
    methods: {
      addButton: function () {
        this.$emit("newCardboard")
      }
    }
}

</script>

<style>
  .add-button {
    margin-top: 10px;
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #35155D;
    width: 3vw;
    border-radius: 50%;
    aspect-ratio: 1/1;
  }

  .add-button:hover {
    cursor: pointer;
  }
</style>