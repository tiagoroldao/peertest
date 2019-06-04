<template>
    <div class="home">
        <ColorSyncMaster />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ColorSyncMaster from '@/components/ColorSyncMaster.vue';

@Component({
    components: {
        ColorSyncMaster,
    },
})
export default class Master extends Vue {}
</script>
