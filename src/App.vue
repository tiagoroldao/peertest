<template>
    <v-app>
        <v-toolbar
            app
            dark>
            <v-toolbar-title class="headline text-uppercase">
                <span>Vuetify</span>
                <span class="font-weight-light">MATERIAL DESIGN</span>
            </v-toolbar-title>
        </v-toolbar>

        <v-content>
            <router-view />
        </v-content>
    </v-app>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {}
</script>
