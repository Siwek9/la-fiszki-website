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

<script setup lang="ts">
    function toggle(event: Event) {
        const target = event.currentTarget as HTMLInputElement;
        emit('autoSave', target.checked);
    }
    function setCookie(cookieName: string, cookieValue: object | string | number, expirationDays: number) {
        const d = new Date();
        d.setTime(d.getTime() + expirationDays * 24 * 60 * 60 * 1000);
        const expires = 'expires=' + d.toUTCString();
        document.cookie = cookieName + '=' + cookieValue + ';' + expires + ';path=/';
    }
    function deleteCookie(cookieName: string) {
        setCookie(cookieName, '', -1);
    }
    function getCookie(cookieName: string) {
        const nameEQ = cookieName + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
    defineExpose({
        setCookie,
        deleteCookie,
        getCookie,
    });

    const emit = defineEmits<{autoSave: [status: boolean]}>();

    const {isAutoSaveOn} = defineProps<{isAutoSaveOn: boolean}>();
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
