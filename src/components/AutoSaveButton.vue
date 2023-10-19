<template>
  <div class="row center-center">
    <label class="auto-save-label">Auto save</label>
    <label class="switch">
      <input
        type="checkbox"
        @change="toggle"
        :checked="isAutoSaveOn"
      />
      <span class="slider round"></span>
    </label>
  </div>
</template>
<script>
export default {
  methods: {
    toggle: function (e) {
      if (e.target.checked) {
        this.onChecked();
      } else {
        this.onUnchecked();
      }
    },
    onChecked: function () {
      this.$emit('autoSave', true);
    },
    onUnchecked: function () {
      this.$emit('autoSave', false);
    },
    setCookie: function (cookieName, cookieValue, expirationDays) {
      const d = new Date();
      d.setTime(d.getTime() + expirationDays * 24 * 60 * 60 * 1000);
      let expires = 'expires=' + d.toUTCString();
      document.cookie = cookieName + '=' + cookieValue + ';' + expires + ';path=/';
    },
    deleteCookie: function (cookieName) {
      this.setCookie(cookieName, '', -1);
    },
    getCookie: function (cookieName) {
      var nameEQ = cookieName + '=';
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    },
  },
  props: ['isAutoSaveOn'],
};
</script>
<style>
.auto-save-label {
  margin-right: 2vw;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ff0000;
  transition: 0.3s;
}

.slider:before {
  position: absolute;
  content: '';
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: #512b81;
  -webkit-transition: 0.3s;
  transition: 0.3s;
}

input:checked + .slider {
  background-color: #1f9900;
}

input:focus + .slider {
  box-shadow: 0 0 1px #1f9900;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
