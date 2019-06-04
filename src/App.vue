<template>
    <v-app>
        <v-toolbar
            app
            dark>
            <v-toolbar-title class="headline text-uppercase">
                <span>Color</span>
                <span class="font-weight-light">Sync</span>
            </v-toolbar-title>
            <v-spacer />
            <v-toolbar-items class="links">
                <v-btn flat>
                    <router-link to="/">
                        Master
                    </router-link>
                </v-btn>
                <v-btn flat>
                    <router-link to="/peer">
                        Peer
                    </router-link>
                </v-btn>
            </v-toolbar-items>
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

<style lang="scss" scoped>
    .links /deep/ a {
        text-decoration: none;
        color: #999;

        &.router-link-exact-active {
            color: white;
            font-weight: bold;
        }
    }
</style>
