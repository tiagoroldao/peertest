<template>
    <div>
        <canvas
            ref="canvas"
            class="outputVideo" />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator';
import { getRandomColor } from '@/helpers/color';
import Peer from 'peerjs';
import jsQR from 'jsqr';

@Component({})
export default class QrReader extends Vue {
    private video!: HTMLVideoElement;

    private stream!: MediaStream;

    private playing = true;

    private mounted() {
        this.scan();
    }

    private beforeDestroy() {
        this.playing = false;
        this.stream.getTracks().forEach(t => t.stop());
    }

    private scan() {
        this.video = document.createElement('video');
        const canvasElement = (this.$refs.canvas as HTMLCanvasElement);
        const canvas = canvasElement ? canvasElement.getContext('2d') : null;

        if (canvas) {
            const tick = () => {
                if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
                    canvasElement.height = this.video.videoHeight;
                    canvasElement.width = this.video.videoWidth;
                    canvas.drawImage(this.video, 0, 0, canvasElement.width, canvasElement.height);
                    const imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
                    const code = jsQR(imageData.data, imageData.width, imageData.height, {
                        inversionAttempts: 'dontInvert',
                    });
                    if (code) {
                        this.$emit('qrData', code.data);
                    }
                }
                if (this.playing) {
                    requestAnimationFrame(tick);
                }
            };

            navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }).then((stream) => {
                this.stream = stream;
                this.video.srcObject = stream;
                this.video.setAttribute('playsinline', true as any);
                this.video.play();
                if (this.playing) {
                    requestAnimationFrame(tick);
                }
            });
        }
    }
}
</script>

<style scoped>
    .outputVideo {
      max-width: 100%;
    }
</style>
