import {
    VuexModule, mutation, action, getter, Module,
} from 'vuex-class-component';

@Module({ namespacedPath: 'settings/' })
export class SettingsModule extends VuexModule {
    @getter thing = '';

    @mutation setThing(thing: string) {
        this.thing = thing;
    }

    @action async onSetup() {
        return undefined;
    }
}
