<template>
    <v-container>
        <v-layout
            text-xs-center
            wrap>
            <v-flex xs12>
                <v-btn>
                    Toggle Color
                </v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component()
export default class ColorSync extends Vue {}
</script>

<style>

</style>
