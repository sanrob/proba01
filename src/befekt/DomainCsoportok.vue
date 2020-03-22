<template>
    <v-data-table
        :headers="headers"
        :items="tetelek"
        sort-by="kod"
        class="elevation-5"
    >
        <template v-slot:top>
            <v-toolbar 
                dense 
                flat 
                color="yellow"
            >
                <v-toolbar-title>DOMAIN csoportok karbantartása</v-toolbar-title>
                <v-divider
                    class="mx-4"
                    inset
                    vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-dialog 
                    v-model="dialog"
                    max-width="500px"
                >
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark class="mb-2" v-on="on">Új tétel</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>
                        <v-card-subtitle>
                            <span class="caption">DOMAIN csoportok kezelése</span>
                        </v-card-subtitle>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.kod" 
                                            label="DOMAIN csoport kód">
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.megnevezes" 
                                            label="DOMAIN csoport megnevezés">
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn 
                                color="blue darken-1" 
                                text 
                                @click="close">
                                Mégse
                            </v-btn>
                            <v-btn 
                                color="blue darken-1" 
                                text 
                                @click="save">
                                OK
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
            <confirm
                :mode="confirmMode" 
                :dialog="confirmOpen"
                @igenChoiceElutasit="confirmElutasitIgen" 
                @nemChoiceElutasit="confirmElutasitNem" 
                @igenChoiceElfogad="confirmElfogadIgen" 
                @nemChoiceElfogad="confirmElfogadNem" 
                @igenChoiceTorol="confirmTorolIgen" 
                @nemChoiceTorol="confirmTorolNem">
            </confirm>
        </template>
        <template v-slot:item.action="{ item }">
            <v-icon
                small
                class="mr-2"
                @click="editItem(item)">
                mdi-pencil
            </v-icon>
            <v-icon
                small
                @click="deleteItem(item)">
                mdi-delete
            </v-icon>
        </template>
    </v-data-table>
</template>

<script>
    var Util = require('../utils/Util.js');
    import Confirm from '../utils/Confirm.vue';
    export default {
        components: {
            confirm: Confirm
        },
        data: () => ({
            headers: [
                {   text: 'DOMAIN csoport kód',
                    value: 'kod',
                    align: 'start',
                    sortable: true,
                },
                {   text: 'DOMAIN csoport megnevezés', 
                    value: 'megnevezes'
                },
                {   text: 'Actions',
                    value: 'action',
                    sortable: false
                },
            ],
            tetelek: [],
            editedItem: {
                kod: '',
                megnevezes: '',
            },
            defaultItem: {
                kod: '',
                megnevezes: '',
            },
            editedIndex: -1,
            dialog: false,
            confirmMode: 'F',
            confirmOpen: false,
            torlItem: ''
        }),
        created () {
            this.initialize();
        },
        methods: {
            initialize () {
                this.axios.get(Util.alkUri + '/domainCsoportok')
                    .then((response) => {
                        this.tetelek = response.data;
                    })
                    .catch(function (error) {
                        alert(error);
                    })
                    .finally(function () {
                    })
            },
            addDomainCsoport: function() {
                this.axios.post(Util.alkUri + '/domainCsoportok/add', this.editedItem)
                    .then(() => {
                        this.dialog = false;
                        this.editedItem = Object.assign({}, this.defaultItem)
                        this.initialize();
                    })
                    .catch(function (error) {
                        alert(error);
                    })
                    .finally(function () {
                    })
            },
            modifyDomainCsoport: function() {
                Object.assign(this.tetelek[this.editedIndex], this.editedItem)
                this.axios.put(Util.alkUri + '/domainCsoportok/update/' + this.tetelek[this.editedIndex]._id, this.tetelek[this.editedIndex])
                    .then(() => {
                        this.dialog = false;
                        this.editedItem = Object.assign({}, this.defaultItem)
                        this.initialize();
                    })
                    .catch(function (error) {
                        alert(error);
                    })
                    .finally(function () {
                    })
            },
            deleteDomainCsoport: function() {
                this.axios.delete(Util.alkUri + '/domainCsoportok/delete/' + this.torlItem._id)
                    .then(() => {
                        this.initialize();
                    })
                    .catch(function (error) {
                        alert(error);
                    })
                    .finally(function () {
                    })
            },
            confirmElutasitIgen() {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.confirmOpen = false;
                this.dialog = false;
            },
            confirmElutasitNem() {
                this.confirmBezar();
            },
            confirmElfogadIgen() {
                this.confirmBezar();
                if (this.editedIndex === -1) {
                    this.addDomainCsoport();
                } else {
                    this.modifyDomainCsoport();
                }
            },
            confirmElfogadNem() {
                this.confirmBezar();
            },
            confirmTorolIgen: function() {
                this.confirmBezar();
                this.deleteDomainCsoport();
            },
            confirmTorolNem: function() {
                this.confirmBezar();
            },
            save () {
                this.confirmMode = 'F';
                this.confirmOpen = true;
            },
            close () {
                this.confirmMode ='U';
                this.confirmOpen = true;
            },
            editItem (item) {
                this.editedIndex = this.tetelek.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },
            deleteItem (item) {
                this.torlItem = item
                this.confirmOpen = true
                this.confirmMode = 'T'
            },
            confirmBezar: function() {
                this.confirmOpen = false;
            },
        },
        computed: {
            formTitle () {
                return this.editedIndex === -1
                    ? 'Új tétel fölvitele' : 'Tétel adatainak módosítása';
            },
        },
        watch: {
/*        
            dialog (val) {
                val || this.close()
            },
*/
        },
    }
</script>

<style>
</style>
