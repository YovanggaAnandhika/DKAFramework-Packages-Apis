import SatuSehatHostType from '../../../Interfaces/SatuSehatHost.type';
import { SatuSehatConstructorConfig } from '../../../Interfaces/SatuSehatConstructor.type';
import { DefaultContructorConfig } from '../../../Config';
import { SatuSehatFunctionClassParsing } from '../../../Interfaces/SatuSehatFunctionClassParsing';
import { SatuSehatCallbackProduction } from '../../../Interfaces/SatuSehatCallback.type';
import { v4 as uuidV4 } from "uuid";
import axios from 'axios';
import {
    SatuSehatFHIREncounterCreateModel
} from "../../Introperability/Encounter/Model/SatuSehatFHIREncounterCreateModel";
import {
    FHIRBundleOneModelConfig,
    FHIRBundleOneModelConfigEntry, FHIRBundleOneModelConfigEntryCondition,
    FHIRBundleOneModelConfigEntryEncounter
} from "./Interfaces/FHIRBundleOneModelConfig";
import {merge} from "lodash";
import EncounterElement from "./Element/EncounterElement";
import ConditionElement from "./Element/ConditionElement";

export class BundleOneClasses {

    static get EntryData(): FHIRBundleOneModelConfigEntry {
        return this._EntryData;
    }

    static set EntryData(value: FHIRBundleOneModelConfigEntry) {
        this._EntryData = value;
    }
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

    static BundleOneModel : FHIRBundleOneModelConfig = {
        resourceType : "Bundle",
        type : "transaction",
        entry : []
    };

    private static _EntryData : FHIRBundleOneModelConfigEntry = [];

    constructor(options: SatuSehatFunctionClassParsing) {
        BundleOneClasses.finalConfig = options.config;
        BundleOneClasses.hostConfig = options.hostConfig;
        BundleOneClasses.credential = options.credential;
    }


    AddEncounter(enconter ?: FHIRBundleOneModelConfigEntryEncounter){
        enconter = merge({
            fullUrl : `urn:uuid:${uuidV4()}`,
            resource : {
                resourceType : "Encounter",
                status : "arrived",
                class : {
                    system : "http://terminology.hl7.org/CodeSystem/v3-ActCode",
                    code : "AMB",
                    display : "ambulatory"
                }
            },
            request : {
                method : "POST",
                url : "Encounter"
            }
        } as FHIRBundleOneModelConfigEntryEncounter, enconter);

        return new EncounterElement({
            config: BundleOneClasses.finalConfig,
            credential: BundleOneClasses.credential,
            hostConfig: BundleOneClasses.hostConfig,
            model : enconter
        });
    }

    AddCondition(encounter : FHIRBundleOneModelConfigEntryEncounter, condition ?: FHIRBundleOneModelConfigEntryCondition){
        condition = merge({
            fullUrl : `urn:uuid:${uuidV4()}`,
            resource : {
                resourceType : "Condition"
            },
            request : {
                method : "POST",
                url : "Condition"
            }
        } as FHIRBundleOneModelConfigEntryCondition, condition);

        return new ConditionElement({
            config: BundleOneClasses.finalConfig,
            credential: BundleOneClasses.credential,
            hostConfig: BundleOneClasses.hostConfig,
            model : condition,
            encounter : encounter
        });
    }

    merge(){
        BundleOneClasses.BundleOneModel.entry = BundleOneClasses.EntryData;
        return BundleOneClasses.BundleOneModel;
    }



}
