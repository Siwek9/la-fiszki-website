<template>
    <div class="center-center cardboard-and-delete">
        <div class="cardboard">
            <div class="row center-middle">
                <div class="cardboard-input">
                    <span class="input-name">{{ sideName.front }}:</span>
                    <div
                        class="input-field-background"
                        v-for="(frontValues, index) in cardboardData.front"
                        :key="index"
                    >
                        <input
                            type="text"
                            class="input-field"
                            placeholder="Text Here"
                            :ref="refsForFront"
                            :value="frontValues"
                            @input="inputFrontChanged"
                            @focus="inputFocus"
                            @keyup.enter="frontSideMoveTab"
                            @keyup.tab.prevent="frontSideMoveTab"
                        />
                        <div
                            class="delete-input-field"
                            @click="deleteFrontField(index)"
                        ></div>
                    </div>
                </div>
                <span class="fields-divider center-center">-></span>
                <div class="cardboard-input">
                    <span class="input-name">{{ sideName.back }}:</span>
                    <div
                        class="input-field-background"
                        v-for="(backValues, index) in cardboardData.back"
                        :key="index"
                    >
                        <input
                            type="text"
                            class="input-field"
                            placeholder="Text Here"
                            :ref="refsForBack"
                            :value="backValues"
                            @input="inputBackChanged"
                            @focus="inputFocus"
                            @keyup.enter.prevent="backSideMoveTab"
                            @keydown.tab.prevent="backSideMoveTab"
                        />
                        <div
                            class="delete-input-field"
                            @click="deleteBackField(index)"
                        ></div>
                    </div>
                </div>
            </div>
        </div>
        <span
            class="delete-button"
            @click="deleteCardboard"
        ></span>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                frontRefs: [],
                backRefs: [],
                frontElementNumber: 1,
                backElementNumber: 1,
            };
        },
        methods: {
            deleteFrontField: function (index) {
                // console.log(index);
                this.$emit('deleteFrontField', this.cardboardData.id, index);
            },
            deleteBackField: function (index) {
                this.$emit('deleteBackField', this.cardboardData.id, index);
            },
            refsForFront: function (e) {
                this.frontRefs.push(e);
            },
            refsForBack: function (e) {
                this.backRefs.push(e);
            },
            inputFocus: function (e) {
                e.target.select();
            },
            frontSideMoveTab: function (e) {
                if (e.target.value != '') {
                    this.backRefs[0].focus();
                }
            },
            backSideMoveTab: function (e) {
                if (e.target.value != '') {
                    this.$emit('nextCardboard', this.cardboardData.id);
                }
            },
            deleteCardboard: function () {
                this.$emit('deleteCardboard', this.cardboardData.id);
            },
            inputFrontChanged: function (e) {
                this.$emit('inputFrontChanged', e.target.value, this.cardboardData.id);
            },
            inputBackChanged: function (e) {
                e.preventDefault();
                this.$emit('inputBackChanged', e.target.value, this.cardboardData.id);
            },
        },
        props: ['cardboardData', 'sideName'],
        mounted() {
            this.frontRefs[0].focus();
        },
        beforeUpdate() {
            this.frontRefs = [];
            this.backRefs = [];
        },
        updated() {
            if (this.frontRefs.length > this.frontElementNumber) {
                this.frontRefs[this.frontRefs.length - 1].focus();
                this.frontElementNumber++;
            } else if (this.backRefs.length > this.backElementNumber) {
                this.backRefs[this.backRefs.length - 1].focus();
                this.backElementNumber++;
            }
        },
    };
</script>

<style>
    .fields-divider {
        font-weight: bold;
        font-size: min(2em, 3vw);
        margin: min(15px, 1.5vw);
        white-space: nowrap;
    }

    .cardboard-input .input-field::placeholder {
        color: #8f7da7;
    }

    .cardboard-input .delete-input-field {
        background-color: white;
        height: 100%;
        width: min(50px, 10vw);
        background-color: #fd000066;
        position: absolute;
        top: 0;
        right: 0;
        background-image: url(../assets/delete.svg);
        background-repeat: no-repeat;
        background-position: 33% center;
        background-size: 65%;
        /* transition: 0.5s; */
    }

    .cardboard-input .input-field {
        width: 200px;
        max-width: 36vw;
        font-size: max(1.2em, 1.5vw);
        outline: none;
        border: none;
        color: white;
        background-color: transparent;
    }

    .cardboard-input .input-name {
        margin: 0 0 10px 1vw;
    }

    .cardboard-input .input-field-background {
        padding: max(0.5em, 1vw);
        border-radius: 1.5em;
        background-color: #512b81;
        margin-bottom: 1.25em;
        display: flex;
        flex-direction: row;
        overflow: hidden;
        position: relative;
    }

    .cardboard-input {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .cardboard {
        border-radius: 15px;
        background-color: #35155d;
        padding: 15px 3vw;
        margin: 10px min(10px, 2vw);
    }

    .delete-button {
        background-image: url(../assets/delete.svg);
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 85%;
        user-select: none;
        background-color: #fd000066;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        aspect-ratio: 1/1;
    }

    @media only screen and (min-width: 600px) {
        .cardboard-and-delete {
            flex-direction: row;
            margin-left: 40px;
        }
    }

    @media only screen and (max-width: 600px) {
        .cardboard-and-delete {
            flex-direction: column;
            margin-left: 0;
        }
    }
    .delete-button:hover {
        cursor: pointer;
    }

    .cardboard-and-delete {
        display: flex;
    }
</style>
