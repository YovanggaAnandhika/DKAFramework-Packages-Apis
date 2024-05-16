


import SatuSehatHostType from "../../../../Interfaces/SatuSehatHost.type";
import {SatuSehatConstructorConfig} from "../../../../Interfaces/SatuSehatConstructor.type";
import {DefaultContructorConfig} from "../../../../Config";
import {SatuSehatFunctionClassParsing} from "../../../../Interfaces/SatuSehatFunctionClassParsing";
import {SatuSehatCallbackProduction} from "../../../../Interfaces/SatuSehatCallback.type";
import {
    FHIRBundleOneModelConfigDiagnosis,
    FHIRBundleOneModelConfigEncounter,
    FHIRBundleOneModelConfigEntryEncounter, FHIRBundleOneModelConfigIdentifier,
    FHIRBundleOneModelConfigLocation,
    FHIRBundleOneModelConfigParticipant,
    FHIRBundleOneModelConfigPeriod, FHIRBundleOneModelConfigServiceProvider,
    FHIRBundleOneModelConfigSubject,
    FHIRBundleOneModelConfigType
} from "../Interfaces/FHIRBundleOneModelConfig";
import {merge} from "lodash";
import {BundleClasses} from "../../index";
import BundleOneConditionElementClasses from "./ConditionElement";
import {BundleOneClasses} from "../index";
import moment from "moment-timezone";

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
        moment.locale("id")
    }

    addSubject(subject : FHIRBundleOneModelConfigSubject){
        subject.reference = (typeof subject.reference === "number") ? `Patient/${subject.reference}` : subject.reference;
        BundleOneEncounterElementClasses.model.resource.subject = subject;
        return this;
    }

    addParticipant(participant : FHIRBundleOneModelConfigParticipant){
        if (BundleOneEncounterElementClasses.model.resource?.participant === undefined)
            BundleOneEncounterElementClasses.model.resource.participant = [];

        if (participant.individual?.reference === undefined) throw new Error("Individu harus diisi");
        participant.individual.reference = (typeof participant.individual.reference === "number") ? `Practitioner/${participant.individual.reference}` : `${participant.individual.reference}`;
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

    /**
     *
     * @param { FHIRBundleOneModelConfigPeriod } priod
     * @param { "HH:mm:ss DD-MM-YYYY" } priod.start
     * @param { "HH:mm:ss DD-MM-YYYY" } priod.end
     */
    addPeriod(priod : FHIRBundleOneModelConfigPeriod) {
        const start = moment(priod.start,"HH:mm:ss DD-MM-YYYY",true);
        const end = moment(priod.end,"HH:mm:ss DD-MM-YYYY",true);
        if (!start.isValid()) throw Error("Encounter period start date is not valid");
        if (!end.isValid()) throw Error("Encounter period end date is not valid");
        priod.start = start.toISOString(true);
        priod.end = end.toISOString(true);
        BundleOneEncounterElementClasses.model.resource.period = priod;
        return this;
    }


    addIdentifier(identifier : FHIRBundleOneModelConfigIdentifier){
        if (BundleOneEncounterElementClasses.model.resource.identifier === undefined)
            BundleOneEncounterElementClasses.model.resource.identifier = [];
        identifier.system = (typeof identifier.system === "number") ? `http://sys-ids.kemkes.go.id/encounter/${identifier.system}` : identifier.system;
        BundleOneEncounterElementClasses.model.resource.identifier.push(identifier);
        return this;
    }
    addServiceProvider(serviceProvider : FHIRBundleOneModelConfigServiceProvider){
        serviceProvider.reference = (typeof serviceProvider.reference === "number") ? `Organization/${serviceProvider.reference}` : serviceProvider.reference;
        BundleOneEncounterElementClasses.model.resource.serviceProvider = serviceProvider
        return this;
    }

    addDiagnosis(diagnosis : FHIRBundleOneModelConfigDiagnosis){
        if (BundleOneEncounterElementClasses.model.resource.diagnosis === undefined)
            BundleOneEncounterElementClasses.model.resource.diagnosis = [];

        if (diagnosis.rank === undefined) diagnosis.rank = BundleOneEncounterElementClasses.model.resource.diagnosis.length + 1;
        BundleOneEncounterElementClasses.model.resource.diagnosis.push(diagnosis);
        return this;
    }

    addLocation(location : FHIRBundleOneModelConfigLocation){
        if (BundleOneEncounterElementClasses.model.resource.location === undefined)
            BundleOneEncounterElementClasses.model.resource.location = [];

        if (location.location?.reference === undefined) throw new Error("Lokasi harus diisi");
        location.location.reference = (typeof location.location.reference === "number") ? `Location/${location.location.reference}` : `${location.location.reference}`;
        BundleOneEncounterElementClasses.model.resource.location.push(location)
        return this;
    }

    submit() : FHIRBundleOneModelConfigEntryEncounter {
        BundleOneClasses.EntryData.push(BundleOneEncounterElementClasses.model);
        return BundleOneEncounterElementClasses.model;
    }

}

export default BundleOneEncounterElementClasses;