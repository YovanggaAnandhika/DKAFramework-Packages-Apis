import SatuSehatHostType from '../../../Interfaces/SatuSehatHost.type';
import { SatuSehatConstructorConfig } from '../../../Interfaces/SatuSehatConstructor.type';
import { DefaultContructorConfig } from '../../../Config';
import { SatuSehatFunctionClassParsing } from '../../../Interfaces/SatuSehatFunctionClassParsing';
import { SatuSehatCallbackProduction } from '../../../Interfaces/SatuSehatCallback.type';

import axios from 'axios';
import {
    SatuSehatFHIREncounterCreateModel
} from "../../Introperability/Encounter/Model/SatuSehatFHIREncounterCreateModel";

export class BundleOneClasses {
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
        BundleOneClasses.finalConfig = options.config;
        BundleOneClasses.hostConfig = options.hostConfig;
        BundleOneClasses.credential = options.credential;
    }

    AddEncounter(enconter : SatuSehatFHIREncounterCreateModel){

    }

}
