import { VaultService } from './vault.service';
declare global {
    interface Window {
        GenesysSOL: GlobalObject;
    }
}

class SdkService {

    constructor() {
        this.extendGlobalObject();
    }

    init(key: string) {
        return new VaultService(key);
    }

    private extendGlobalObject(): void {
        window.GenesysSOL = window.GenesysSOL || {};
        window.GenesysSOL.vault = { init: this.init };
    }
}

export const Sdk = new SdkService();


interface GlobalObject {
    vault: { init?: (key: string) => VaultService; }
}