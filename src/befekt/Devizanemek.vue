<template>
    <v-container>
        <v-row 
            :dense=true
            align="center"
            style="border: 1px solid gray">
            <v-col sm="3">Devizanemek karbantartása</v-col>
        </v-row>
        <v-row
            :dense=true
            style="border: 1px solid gray;">
            <v-col cols="1" lg="2" align-self="start">
                <v-btn :disabled=felvitelStatus color="blue" @click="felvitel">Felvitel</v-btn>
            </v-col>
            <v-col cols="1" lg="2">
                <v-btn :disabled=modositasStatus color="blue" @click="modositas">Módosítás</v-btn>
            </v-col>
            <v-col cols="1" lg="2">
                <v-btn :disabled=torlesStatus color="blue">Törlés</v-btn>
            </v-col>
            <v-col cols="1" lg="2">
                <v-btn :disabled=okStatus color="blue" @click="okeClick">OK</v-btn>
            </v-col>
            <v-col cols="1" lg="2">
                <v-btn :disabled=megseStatus color="blue">Mégse</v-btn>
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
                        label="A 'DOMAIN' kódja"
                        filled
                        v-model="szamlavezeto.kod"
                    ></v-text-field>
                </v-col>
                <v-col cols="3" sm="6" md="3">
                    <v-text-field
                        :disabled="megnevStatus"
                        label="A 'DOMAIN' megnevezése"
                        placeholder="Kötelezően kitöltendő tetszőleges szöveg"
                        filled
                        v-model="szamlavezeto.megnevezes"
                    ></v-text-field>
                </v-col>
            </v-row>
        </v-form>
        <confirm 
            :title="confirmTitle" 
            :dialog="dialogOpen"
            @okeChoice="addSzamlavezeto" 
            @megseChoice="xxx">
        </confirm>
    </v-container>
</template>

<script>
//    import Vue from 'vue'
    import Confirm from '../utils/Confirm.vue';
//    var confirm = new Vue(Confirm);
    const joEzIgy = "JÓ Ez Így?";
    const valoban ="Valóban el akarja dobni a változásokat?";
    export default {
        components: {
            confirm: Confirm
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
                confirmTitle: joEzIgy,
                confirmDisabled: false,
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
        beforeCreate() {
//            alert('beforeCreate()');
        },
        created() {
//            alert('created()');
        },
        beforeMount() {
//            alert('beforeMount()');
        },
        mounted: function() {
            this.fetchItems();
//            alert('mounted()');
        },
        beforeUpdate: function() {
//            alert('beforeUpdate()');
        },
        updated: function() {
//            alert('updated()');
        },
        beforeDestroy: function() {
//            alert('beforeDestroy()');
        },
        destroyed: function() {
//            alert('destroyed()');
        },
        methods: {
            felvitel: function() {
                this.felvitelStatus = true;
                this.modositasStatus = true;
                this.torlesStatus = true;
                this.okStatus = false;
                this.megseStatus = false;
                this.kodStatus = false;
                this.megnevStatus = false;
            },
            modositas: function() {
                var len = this.selectedRows.length;
                if (len > 0) {
                    this.szamlavezeto.kod = this.selectedRows[0].kod;
                    this.szamlavezeto.megnevezes = this.selectedRows[0].megnevezes;
                    alert(this.selectedRows[0]._id + " " + this.selectedRows[0].kod + " " + this.selectedRows[0].megnevezes + " " + this.selectedRows[0].__v)
                }
            },
            addSzamlavezeto: function() {
                this.dialogOpen = false;
                let uri = 'http://localhost:4000/szamlavezetok/add';
                this.axios.post(uri, this.szamlavezeto).then((response) => {
                    alert(response)
                })
            },
            fetchItems: function() {
                this.confirmTitle = valoban;
              let uri = 'http://localhost:4000/szamlavezetok';
              this.axios.get(uri)
                .then((response) => {
                    this.adatok = response.data;
                })
                .catch(function (error) {
                    // handle error
                    alert(error);
                })
                .finally(function () {
//                    alert('finally method');
                    // always executed
                })
            },
            okeClick: function() {
                this.dialogOpen = true;
            },
            xxx: function() {
                this.dialogOpen = false;
            },
            getTableData: function() {
                return this.adatok
            }
        }
    }
</script>

<style>
</style>