<template>
    <div
        class="wrapper"
        :style="{ 'background-color': color }">
        <v-container>
            <v-layout
                justify-center
                text-xs-center
                wrap>
                <v-flex xs12>
                    <v-btn
                        @click="randomColor">
                        Toggle Color
                    </v-btn>
                </v-flex>
                <v-flex
                    v-if="peerId.length"
                    xs12
                    class="peer-id">
                    Peer ID: {{ peerId }} <br><br>
                    Connections: {{ connections.length }}
                </v-flex>
                <v-flex xs12>
                    <canvas ref="qrcode" />
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator';
import { getRandomColor } from '@/helpers/color';
import Peer from 'peerjs';
import QRCode from 'qrcode';

@Component({})
export default class ColorSyncMaster extends Vue {
    @Provide() public color: string = '#333333';

    @Provide() public peerId: string = '';

    @Provide() public connectToID: string = '';

    @Provide() public connections: Peer.DataConnection[] = [];

    private peer!: Peer;

    private mounted() {
        this.peer = new Peer();
        this.peer.on('open', (id) => {
            this.peerId = id;
            QRCode.toCanvas(this.$refs.qrcode, id);
        });

        this.peer.on('connection', (connection) => {
            this.setupConnection(connection);
        });
    }

    private beforeDestroy() {
        this.connections.forEach(c => c.close());
    }

    private randomColor() {
        this.color = getRandomColor();
        if (this.connections) {
            this.connections.forEach(c => c.send({ color: this.color }));
        }
    }

    private connect() {
        this.setupConnection(this.peer.connect(this.connectToID));
    }

    private setupConnection(connection: Peer.DataConnection) {
        this.connections.push(connection);

        connection.on('open', () => {
            connection.send({ color: this.color });
        });

        connection.on('error', (e) => {
            console.error(e);
            const index = this.connections.indexOf(connection);
            if (index > -1) {
                this.connections.splice(index, 1);
            }
        });

        connection.on('close', () => {
            const index = this.connections.indexOf(connection);
            if (index > -1) {
                this.connections.splice(index, 1);
            }
        });

        connection.on('data', (data) => {
            if (data.color) {
                this.color = data.color;
                if (this.connections) {
                    this.connections.forEach(c => c.send({ color: this.color }));
                }
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
