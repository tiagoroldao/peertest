<template>
    <div class="home">
        <ColorSyncPeer />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ColorSyncPeer from '@/components/ColorSyncPeer.vue';

@Component({
    components: {
        ColorSyncPeer,
    },
})
export default class Peer extends Vue {}
</script>
