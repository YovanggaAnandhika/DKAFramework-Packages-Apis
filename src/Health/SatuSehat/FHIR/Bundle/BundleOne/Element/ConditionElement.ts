import SatuSehatHostType from "../../../../Interfaces/SatuSehatHost.type";
import {SatuSehatConstructorConfig} from "../../../../Interfaces/SatuSehatConstructor.type";
import {DefaultContructorConfig} from "../../../../Config";
import {SatuSehatFunctionClassParsing} from "../../../../Interfaces/SatuSehatFunctionClassParsing";
import {SatuSehatCallbackProduction} from "../../../../Interfaces/SatuSehatCallback.type";
import {
    FHIRBundleOneModelConfigCategory,
    FHIRBundleOneModelConfigCode,
    FHIRBundleOneModelConfigEncounter,
    FHIRBundleOneModelConfigEntry, FHIRBundleOneModelConfigEntryCondition, FHIRBundleOneModelConfigEntryEncounter,
    FHIRBundleOneModelConfigLocation,
    FHIRBundleOneModelConfigParticipant,
    FHIRBundleOneModelConfigPeriod,
    FHIRBundleOneModelConfigSubject,
    FHIRBundleOneModelConfigType
} from "../Interfaces/FHIRBundleOneModelConfig";
import {merge} from "lodash";
import {v4 as uuidV4} from "uuid";
import {BundleOneClasses} from "../index";
import moment from "moment-timezone";

interface SatuSehatFunctionClassParsingBundleCondition extends SatuSehatFunctionClassParsing {
    model : FHIRBundleOneModelConfigEntryCondition
}

export class BundleOneConditionElementClasses {

    /**
     * @internal
     */
    static hostConfig: SatuSehatHostType | undefined;
    /**
     * @internal
     */
    static credential : SatuSehatCallbackProduction;

    static model : FHIRBundleOneModelConfigEntryCondition;

    static EntryDataEncounter : FHIRBundleOneModelConfigEntryEncounter;
    /**
     *
     * @internal
     */
    static finalConfig: SatuSehatConstructorConfig = DefaultContructorConfig;

    private DataEncounter : FHIRBundleOneModelConfigEntryEncounter | undefined = undefined;

    constructor(options: SatuSehatFunctionClassParsingBundleCondition) {
        BundleOneConditionElementClasses.finalConfig = options.config;
        BundleOneConditionElementClasses.hostConfig = options.hostConfig;
        BundleOneConditionElementClasses.credential = options.credential;
        BundleOneConditionElementClasses.model = options.model;
    }

    addSubject(subject : FHIRBundleOneModelConfigSubject){
        BundleOneConditionElementClasses.model.resource.subject = subject;
        return this;
    }

    addCategory(category : FHIRBundleOneModelConfigCategory){
        if (BundleOneConditionElementClasses.model.resource.category === undefined)
            BundleOneConditionElementClasses.model.resource.category = [];

        BundleOneConditionElementClasses.model.resource.category.push(category)
        return this;
    }

    linkEncounter(encounter : FHIRBundleOneModelConfigEntryEncounter, rank : number){
        const namaPasien = (encounter.resource.subject !== undefined) ? encounter.resource.subject.display : "Pasien";
        const tanggalKunjunganTerakhir = (encounter.resource.period?.end !== undefined) ? moment(encounter.resource.period?.end).format("dddd, DD MMMM YYYY") : "";
        BundleOneConditionElementClasses.model.resource.encounter = {
            reference : `${encounter.fullUrl}`,
            display : `Kunjungan ${namaPasien} Pada ${tanggalKunjunganTerakhir}`
        };

        const MatchingDiagnosis = encounter.resource.diagnosis?.find((data) => data.rank === rank);
        if (MatchingDiagnosis !== undefined) MatchingDiagnosis.condition.reference = BundleOneConditionElementClasses.model.fullUrl;
        return this;
    }

    submit(){
        BundleOneClasses.EntryData.push(BundleOneConditionElementClasses.model);
        return new BundleOneClasses({
            config: BundleOneConditionElementClasses.finalConfig,
            credential: BundleOneConditionElementClasses.credential,
            hostConfig: BundleOneConditionElementClasses.hostConfig
        });
    }

}

export default BundleOneConditionElementClasses;