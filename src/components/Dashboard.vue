<template>
  <v-app dark>
    <v-content v-if="available === true">
      <v-navigation-drawer
        v-model="drawer"
        clipped
        fixed
        app
      >
        <v-list dense>
          <v-list-tile @click="''">
            <v-list-tile-action>
              <v-icon>dashboard</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title @click="setSection('home')">Dashboard</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="''">
            <v-list-tile-action>
              <v-icon>settings</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title @click="setSection('settings')">Settings</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar app fixed clipped-left>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>Application</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu bottom left>
          <template v-slot:activator="{ on }">
            <v-btn
              dark
              icon
              v-on="on"
            >
              <v-icon>more_vert</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-tile
              v-for="(item, i) in menuItems"
              :key="i"
              @click="item.action"
            >
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar>
      <v-content class="content">
        <Home v-show="section === 'home'" />
        <Settings v-show="section === 'settings'" />
      </v-content>
    </v-content>

    <v-content v-else>
      <v-container fill-height>
        <v-layout justify-center align-center>
          <v-flex shrink>
            <div>
              <span>Service unavailable</span>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <v-footer app fixed v-if="available === false">
      <v-layout
        justify-center
        row
        wrap
      >
        <span class="caption" v-html="footerText"></span>
      </v-layout>
    </v-footer>
    <v-footer app fixed v-else>
      <span class="caption" style="padding-left: 10px" v-html="footerText"></span>
    </v-footer>

  </v-app>
</template>

<style scoped>
  .content {
    padding: 0 0 0 0 !important;
    height: 100%;
  }
</style>

<script>
import common from '@/helpers/common'
// import api from '@/service/api'
import auth from '@/auth'
import Home from '@/components/Home'
import Settings from '@/components/Settings'

export default {
  data: (inst) => ({
    available: true,
    drawer: null,
    section: 'home',
    footerText: "&copy; " + 
      common.getFullYear() + 
      " ALL RIGHTS RESERVED",
    menuItems: [
      { title: 'Sign in', action: auth.signin },
      { title: 'Sign out', action: inst.signout }
    ]
  }),
  components: {
    Home,
    Settings
  },
  /*
  mounted: function () {
    const inst = this
    api.serviceStatus(function (response) {
      if (response.data) {
        if (response.data === 200) {
          inst.available = true
        }
      }
    })
  },
  */
  methods: {
    signout: function () {
      auth.signout()
      this.$router.push('/signin')
    },
    setSection: function (s) {
      this.section = s
    }
  }
}
</script>
