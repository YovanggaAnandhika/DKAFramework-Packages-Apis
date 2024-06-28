import SatuSehatHostType from '../../Interfaces/SatuSehatHost.type';
import { SatuSehatConstructorConfig } from '../../Interfaces/SatuSehatConstructor.type';
import { DefaultContructorConfig } from '../../Config';
import { SatuSehatFunctionClassParsing } from '../../Interfaces/SatuSehatFunctionClassParsing';
import { SatuSehatCallbackProduction } from '../../Interfaces/SatuSehatCallback.type';

import axios from 'axios';
import {BundleOneClasses} from "./BundleOne";

export class BundleClasses {
    /**
     * @internal
     */
    static hostConfig: SatuSehatHostType | undefined;
    /**
     * @internal
     */
    static credential: SatuSehatCallbackProduction;

    /**
     *
     * @internal
     */

    static finalConfig: SatuSehatConstructorConfig = DefaultContructorConfig;

    constructor(options: SatuSehatFunctionClassParsing) {
        BundleClasses.finalConfig = options.config;
        BundleClasses.hostConfig = options.hostConfig;
        BundleClasses.credential = options.credential;
    }

    One() {
        return new BundleOneClasses({config: BundleClasses.finalConfig, credential: BundleClasses.credential, hostConfig: BundleClasses.hostConfig})
    }

}
