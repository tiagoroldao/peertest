import Vue from 'vue';
import Vuex, { StoreOptions, Store } from 'vuex';
import VuexPersistence from 'vuex-persist';
import { SettingsModule } from './vuex/settingsModule';

Vue.use(Vuex);

const vuexPersist = new VuexPersistence({
    strictMode: true,
    storage: window.localStorage,
});

const vuexPersistEmitter = () => (store: Store<any>) => {
    store.subscribe((mutation) => {
        if (mutation.type === 'RESTORE_MUTATION') {
            // eslint-disable-next-line no-underscore-dangle
            const setupActions = Object.keys((store as any)._actions)
                .filter(k => k.endsWith('/onSetup'));
            for (let i = 0; i < setupActions.length; i += 1) {
                store.dispatch(setupActions[i]);
            }
        }
    });
};

const options: StoreOptions<any> = {
    modules: {
        settings: SettingsModule.ExtractVuexModule(SettingsModule),
    },
    mutations: {
        RESTORE_MUTATION: vuexPersist.RESTORE_MUTATION,
    },
    plugins: [vuexPersistEmitter(), vuexPersist.plugin],
};

export default new Vuex.Store(options);
