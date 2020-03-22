<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-item link @click="navigateToMain">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Fő panel</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="navigateToAlapAdatok">
          <v-list-item-action>
            <v-icon>mdi-contact-mail</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Alapadatok</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="navigateToDomainCsoportok">
          <v-list-item-action>
            <v-icon color="red">mdi-yin-yang</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>DOMAIN csoportok</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="navigateToSzamlavezetok">
          <v-list-item-action>
            <v-icon color="red">mdi-yin-yang</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Számlavezetők</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="navigateToDevizanemek">
          <v-list-item-action>
            <v-icon color="red">mdi-yin-yang</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Devizanemek</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="navigateToBefektetesek">
          <v-list-item-action>
            <v-icon color="red">mdi-yin-yang</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Befektetések</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="navigateToEredetiPelda">
          <v-list-item-action>
            <v-icon color="red">mdi-yin-yang</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Eredeti Példa</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="green"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Befektetés Nyilvántartó Rendszer</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container
        fluid
      >
            <router-view></router-view>
            <hr>
      </v-container>
    </v-content>
    <v-footer
      color="indigo"
      app
    >
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: true,
    }),
    methods: {
      navigateToMain () {
        this.$router.push('/');
      },
      navigateToAlapAdatok () {
        this.$router.push('/alapadatok');
      },
      navigateToDomainCsoportok () {
        this.$router.push('/alapadatok/domaincsoportok');
      },
      navigateToSzamlavezetok () {
        this.$router.push('/alapadatok/szamlavezetok');
      },
      navigateToDevizanemek () {
        this.$router.push('/alapadatok/devizanemek');
      },
      navigateToBefektetesek () {
        this.$router.push('/alapadatok/befektetesek');
      },
      navigateToEredetiPelda () {
        this.$router.push('/alapadatok/eredetipelda');
      }
    }
  }
</script>

<style>
</style>