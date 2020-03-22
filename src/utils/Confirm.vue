<template>
    <v-row justify="center">
        <v-dialog
                persistent
                v-model="enable"
                :max-width="dialogWidth"
        >
            <v-card color="yellow">
                <v-card-title class="headline">{{ titleData }}</v-card-title>
                <v-card-text>{{ getCardText }}</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="green darken-1"
                        text
                        @click="nemChoice"
                    >
                        Nem
                    </v-btn>
                    <v-btn
                        color="green darken-1"
                        text
                        @click="igenChoice"
                    >
                        Igen
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    var Util = require('./Util.js');
    export default {
        props: {
            mode: {
                type: String
            },
            dialog: {
                type: Boolean
            }
        },
        methods: {
            igenChoice() {
                if (this.mode === 'F') {
                    this.$emit('igenChoiceElfogad');
                } else if (this.mode === 'U') {
                    this.$emit('igenChoiceElutasit');
                } else {
                    this.$emit('igenChoiceTorol');
                }
            },
            nemChoice() {
                if (this.mode === 'F') {
                    this.$emit('nemChoiceElfogad');
                } else if (this.mode === 'U') {
                    this.$emit('nemChoiceElutasit');
                } else {
                    this.$emit('nemChoiceTorol');
                }
            }
        },
        computed: {
            enable: function() {
                return this.dialog;
            },
            dialogWidth: function() {
                return this.mode === 'F' 
                    ? Util.okeWidth
                    : (this.mode === 'U' ? Util.elutWidth : Util.torlWidth)
            },
            titleData: function() {
                return this.mode === 'F' 
                    ? Util.ELFOGAD
                    : (this.mode === 'U' ? Util.ELUTASIT : Util.TORLES)
            },
            getCardText: function() {
                return this.mode === 'F' 
                    ? Util.okeSzoveg
                    : (this.mode === 'U' ? Util.elutSzoveg : Util.torlSzoveg)
            }
        },
        data () {
            return {
            }
        }
    }
</script>

<style>
</style>
