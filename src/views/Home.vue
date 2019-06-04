<template>
    <div class="home">
        <ColorSync />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ColorSync from '@/components/ColorSync.vue';

@Component({
    components: {
        ColorSync,
    },
})
export default class Home extends Vue {}
</script>
