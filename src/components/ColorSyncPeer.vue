<template>
    <div
        class="wrapper"
        :style="{ 'background-color': color }">
        <v-container>
            <v-layout
                justify-center
                text-xs-center
                wrap>
                <v-flex
                    v-if="connection"
                    xs12>
                    <v-btn
                        :disabled="!connection"
                        @click="randomColor">
                        Toggle Color
                    </v-btn>
                </v-flex>
                <v-flex
                    v-if="!connection && !isScanning"
                    xs12
                    sm6
                    md3>
                    <v-text-field
                        v-model="connectToID"
                        label="Connect to?"
                        solo />
                </v-flex>
                <v-flex
                    v-if="!isScanning"
                    xs12>
                    <v-btn
                        :color="connection ? 'success' : 'error'"
                        @click="toggleConnection">
                        {{ !connection ? 'Connect' : 'Disconnect' }}
                    </v-btn>
                </v-flex>
                <v-flex
                    v-if="!connection"
                    xs12>
                    <v-btn
                        @click="toggleScan">
                        {{ !isScanning ? 'Scan' : 'Stop Scanning' }}
                    </v-btn>
                </v-flex>
                <v-flex v-if="!connection && isScanning">
                    <QrReader @qrData="onQrData" />
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator';
import { getRandomColor } from '@/helpers/color';
import Peer from 'peerjs';
import QrReader from './qrReader.vue';

@Component({
    components: {
        QrReader,
    },
})
export default class ColorSyncPeer extends Vue {
    @Provide() public color: string = '#333333';

    @Provide() public peerId: string = '';

    @Provide() public connectToID: string = '';

    @Provide() public isScanning = false;

    @Provide() public connection: Peer.DataConnection | null = null;

    private peer!: Peer;

    private mounted() {
        this.peer = new Peer();
        this.peer.on('open', (id) => {
            this.peerId = id;
        });
    }

    private beforeDestroy() {
        if (this.connection) {
            this.connection.close();
            this.connection = null;
        }
    }

    private randomColor() {
        if (this.connection) {
            this.connection.send({ color: getRandomColor() });
        }
    }

    private toggleConnection() {
        if (!this.connection) {
            this.setupConnection(this.peer.connect(this.connectToID));
        } else {
            this.connection.close();
            this.connection = null;
        }
    }

    private toggleScan() {
        this.isScanning = !this.isScanning;
    }

    private onQrData(data: string) {
        this.isScanning = false;
        this.setupConnection(this.peer.connect(data));
    }

    private setupConnection(connection: Peer.DataConnection) {
        this.connection = connection;

        connection.on('error', () => {
            this.connection = null;
        });

        connection.on('close', () => {
            this.connection = null;
        });

        connection.on('data', (data) => {
            if (data.color) {
                this.color = data.color;
            }
        });
    }
}
</script>

<style scoped>
.wrapper {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
}

.peer-id {
    color: white;
}
</style>
