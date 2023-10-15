<template>
  <div class="text-input-body">
    <span class="text-input-name">{{name}}:</span>
    <input @input="inputValue" :value="value" class="text-input-field" type="text">
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    inputValue: function(e) {
      this.$emit('valueChanged', e.target.value)
    }
  },
  props: [
    'name',
    'value'
  ]
}
</script>

<style>
  .text-input-field {
    all: unset;
    background-color: #35155D;
    font-size: 30px;
    border-radius: 0 10px 10px 10px;
    padding: 10px;
  }

  .text-input-name {
    background-color: #35155D;
    padding: 7px;
    border-radius: 10px 10px 0 0;
  }

  .text-input-body {
    display: flex;
    flex-direction: column;
    align-items: start;
    margin: 10px;
  }
</style>