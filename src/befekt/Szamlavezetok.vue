<template>
    <v-container>
        <v-row 
            :dense=true
            style="border: 1px solid gray">
            <v-col>Számlavezetők karbantartása</v-col>
        </v-row>
        <v-row
            :dense=true
            style="border: 1px solid gray;">
            <v-col cols="1" lg="2" align-self="start">
                <v-btn
                    :disabled=felvitelStatus 
                    color="blue" 
                    @click="felvitel"
                >Felvitel
                </v-btn>
            </v-col>
            <v-col cols="1" lg="2">
                <v-btn 
                    :disabled=modositasStatus 
                    color="blue" 
                    @click="modositas"
                >Módosítás
                </v-btn>
            </v-col>
            <v-col cols="1" lg="2">
                <v-btn 
                    :disabled=torlesStatus 
                    color="blue"
                >Törlés
                </v-btn>
            </v-col>
            <v-col cols="1" lg="2">
                <v-btn 
                    :disabled=okStatus 
                    color="blue" 
                    @click="okeClick"
                >OK</v-btn>
            </v-col>
            <v-col cols="1" lg="2">
                <v-btn 
                    :disabled=megseStatus 
                    color="blue" 
                    @click="megseClick"
                >Mégse
                </v-btn>
            </v-col>
        </v-row>
        <v-container class="scroll-y">
            <v-data-table   :headers="headers"
                            :items="adatok"
                            single-select
                            v-model="selectedRows"
                            dense 
                            item-key="kod"
                            show-select>
                Data Table
            </v-data-table>
        </v-container>
        <v-form>
            <v-row>
                <v-col cols="3" sm="6" md="3">
                    <v-text-field
                        :disabled="kodStatus"
                        label="A számlavezető kódja"
                        filled
                        v-model="szamlavezeto.kod">
                    </v-text-field>
                </v-col>
                <v-col cols="3" sm="6" md="3">
                    <v-text-field
                        :disabled="megnevStatus"
                        label="A számlavezető megnevezése"
                        placeholder="Kötelezően kitöltendő tetszőleges szöveg"
                        filled
                        v-model="szamlavezeto.megnevezes">
                    </v-text-field>
                </v-col>
            </v-row>
        </v-form>
        <confirm 
            :title="confirmTitle" 
            :dialog="dialogOpen"
            :max_width="dialogWidth"
            :card_text="cardText"
            @okeChoice="addSzamlavezeto" 
            @megseChoice="megseGomb">
        </confirm>
    </v-container>
</template>

<script>
    var Util = require('../utils/Util.js');
    import Confirm from '../utils/Confirm.vue';
    export default {
        components: {
            confirm: Confirm
        },
        mounted: function() {
            this.fetchItems();
        },
        methods: {
            fetchItems: function() {
              this.axios.get(Util.alkUri + '/szamlavezetok')
                .then((response) => {
                    this.adatok = response.data;
                })
                .catch(function (error) {
                    alert(error);
                })
                .finally(function () {
                })
            },
            formFieldStatus: function(kodStat, megnevStat) {
                this.kodStatus = kodStat;
                this.megnevStatus = megnevStat;
            },
            formFieldUrit: function() {
                this.szamlavezeto.kod = null;
                this.szamlavezeto.megnevezes = null;
            },
            buttonStatus: function(isView) {
                this.felvitelStatus = isView ? false : true;
                this.modositasStatus = isView ? false : true;
                this.torlesStatus = isView ? false : true;
                this.okStatus = isView ? true : false;
                this.megseStatus = isView ? true : false;
            },
            felvitel: function() {
                this.formFieldStatus(false, false);
                this.buttonStatus(false);
            },
            okeClick: function() {
                this.confirmTitle = Util.ELFOGAD;
                this.cardText = Util.okeSzoveg;
                this.dialogOpen = true;
                this.dialogWidth = Util.okeWidth;
            },
            megseClick: function() {
                this.confirmTitle = Util.ELUTASIT;
                this.cardText = Util.elutSzoveg;
                this.dialogOpen = true;
                this.dialogWidth = Util.elutWidth;
            },
            megseGomb: function() {
                this.dialogOpen = false;
            },
            addSzamlavezeto: function() {
                this.dialogOpen = false;
                let uri = Util.alkUri + '/szamlavezetok/add';
                this.axios.post(uri, this.szamlavezeto).then(() => {
                    this.formFieldUrit();
                    this.formFieldStatus(true, true);
                    this.buttonStatus(true);
                    this.fetchItems();
                })
            },
            modositas: function() {
                var len = this.selectedRows.length;
                if (len > 0) {
                    this.szamlavezeto.kod = this.selectedRows[0].kod;
                    this.szamlavezeto.megnevezes = this.selectedRows[0].megnevezes;
                    alert(this.selectedRows[0]._id + " " + this.selectedRows[0].kod + " " + this.selectedRows[0].megnevezes + " " + this.selectedRows[0].__v)
                }
            },
            getTableData: function() {
                return this.adatok
            }
        },
        data: function() {
            return {
                felvitelStatus: false,
                modositasStatus: false,
                torlesStatus: false,
                okStatus: true,
                megseStatus: true,
                kodStatus: true,
                megnevStatus: true,
                confirmTitle: '',
                cardText: '',
                confirmDisabled: false,
                dialogWidth: '0',
                dialogOpen: false,
                selectedRows: [],
                szamlavezeto: {
                    kod: '',
                    megnevezes: ''
                },
                headers: [
                    {
                        text: 'Kód',
                        align: 'left',
                        sortable: true,
                        value: 'kod',
                    },
                    { text: 'Megnevezés', value: 'megnevezes' }
                ],                
                adatok: []
            }
        },
    }
</script>

<style>
</style>