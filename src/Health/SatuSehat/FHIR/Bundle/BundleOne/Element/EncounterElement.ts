


import SatuSehatHostType from "../../../../Interfaces/SatuSehatHost.type";
import {SatuSehatConstructorConfig} from "../../../../Interfaces/SatuSehatConstructor.type";
import {DefaultContructorConfig} from "../../../../Config";
import {SatuSehatFunctionClassParsing} from "../../../../Interfaces/SatuSehatFunctionClassParsing";
import {SatuSehatCallbackProduction} from "../../../../Interfaces/SatuSehatCallback.type";
import {
    FHIRBundleOneModelConfigDiagnosis,
    FHIRBundleOneModelConfigEncounter,
    FHIRBundleOneModelConfigEntryEncounter,
    FHIRBundleOneModelConfigLocation,
    FHIRBundleOneModelConfigParticipant,
    FHIRBundleOneModelConfigPeriod,
    FHIRBundleOneModelConfigSubject,
    FHIRBundleOneModelConfigType
} from "../Interfaces/FHIRBundleOneModelConfig";
import {merge} from "lodash";
import {BundleClasses} from "../../index";
import BundleOneConditionElementClasses from "./ConditionElement";
import {BundleOneClasses} from "../index";

interface SatuSehatFunctionClassParsingBundleEncounter extends SatuSehatFunctionClassParsing {
    model : FHIRBundleOneModelConfigEntryEncounter
}

export class BundleOneEncounterElementClasses {

    /**
     * @internal
     */
    static hostConfig: SatuSehatHostType | undefined;
    /**
     * @internal
     */
    static credential : SatuSehatCallbackProduction;

    static model : FHIRBundleOneModelConfigEntryEncounter;
    /**
     *
     * @internal
     */
    static finalConfig: SatuSehatConstructorConfig = DefaultContructorConfig;

    constructor(options: SatuSehatFunctionClassParsingBundleEncounter) {
        BundleOneEncounterElementClasses.finalConfig = options.config;
        BundleOneEncounterElementClasses.hostConfig = options.hostConfig;
        BundleOneEncounterElementClasses.credential = options.credential;
        BundleOneEncounterElementClasses.model = options.model;
    }

    addSubject(subject : FHIRBundleOneModelConfigSubject){
        BundleOneEncounterElementClasses.model.resource.subject = subject;
        return this;
    }

    addParticipant(participant : FHIRBundleOneModelConfigParticipant){
        if (BundleOneEncounterElementClasses.model.resource?.participant === undefined)
            BundleOneEncounterElementClasses.model.resource.participant = [];

        BundleOneEncounterElementClasses.model.resource?.participant?.push(
            merge({
                type : [
                    {
                        coding : [
                            {
                                system : "http://terminology.hl7.org/CodeSystem/v3-ParticipationType",
                                code : "ATND",
                                display : "attender"
                            }
                        ]
                    }
                ]
            } as FHIRBundleOneModelConfigParticipant, participant)
        )
        return this;
    }

    addPeriod(priod : FHIRBundleOneModelConfigPeriod) {
        BundleOneEncounterElementClasses.model.resource.period = priod;
        return this;
    }

    addDiagnosis(diagnosis : FHIRBundleOneModelConfigDiagnosis){
        if (BundleOneEncounterElementClasses.model.resource.diagnosis === undefined)
            BundleOneEncounterElementClasses.model.resource.diagnosis = [];

        BundleOneEncounterElementClasses.model.resource.diagnosis.push(diagnosis);
        return this;
    }

    addLocation(location : FHIRBundleOneModelConfigLocation){
        if (BundleOneEncounterElementClasses.model.resource.location === undefined)
            BundleOneEncounterElementClasses.model.resource.location = [];

        BundleOneEncounterElementClasses.model.resource.location.push(location)
        return this;
    }

    submit() : FHIRBundleOneModelConfigEntryEncounter {
        BundleOneClasses.EntryData.push(BundleOneEncounterElementClasses.model);
        return BundleOneEncounterElementClasses.model;
    }

}

export default BundleOneEncounterElementClasses;