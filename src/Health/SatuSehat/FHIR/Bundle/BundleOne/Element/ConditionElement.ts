import SatuSehatHostType from "../../../../Interfaces/SatuSehatHost.type";
import {SatuSehatConstructorConfig} from "../../../../Interfaces/SatuSehatConstructor.type";
import {DefaultContructorConfig} from "../../../../Config";
import {SatuSehatFunctionClassParsing} from "../../../../Interfaces/SatuSehatFunctionClassParsing";
import {SatuSehatCallbackProduction} from "../../../../Interfaces/SatuSehatCallback.type";
import {
    FHIRBundleOneModelConfigCategory, FHIRBundleOneModelConfigClinicalStatus,
    FHIRBundleOneModelConfigCode,
    FHIRBundleOneModelConfigEntryCondition, FHIRBundleOneModelConfigEntryEncounter,
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
    model : FHIRBundleOneModelConfigEntryCondition,
    encounter : FHIRBundleOneModelConfigEntryEncounter
}



type CheckSubject<T = FHIRBundleOneModelConfigSubject | FHIRBundleOneModelConfigEntryEncounter> = T extends FHIRBundleOneModelConfigSubject ? T : T extends FHIRBundleOneModelConfigEntryEncounter ? T : never;

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

    static encounter : FHIRBundleOneModelConfigEntryEncounter;

    constructor(options: SatuSehatFunctionClassParsingBundleCondition) {
        BundleOneConditionElementClasses.finalConfig = options.config;
        BundleOneConditionElementClasses.hostConfig = options.hostConfig;
        BundleOneConditionElementClasses.credential = options.credential;
        BundleOneConditionElementClasses.model = options.model;
        BundleOneConditionElementClasses.encounter = options.encounter;

        const namaPasien = (BundleOneConditionElementClasses.encounter.resource.subject !== undefined) ? BundleOneConditionElementClasses.encounter.resource.subject.display : "Pasien";
        const tanggalKunjunganTerakhir = (BundleOneConditionElementClasses.encounter.resource.period?.end !== undefined) ? moment(BundleOneConditionElementClasses.encounter.resource.period?.end).format("dddd, DD MMMM YYYY") : "";
        BundleOneConditionElementClasses.model.resource.encounter = {
            reference : `${BundleOneConditionElementClasses.encounter.fullUrl}`,
            display : `Kunjungan ${namaPasien} Pada ${tanggalKunjunganTerakhir}`
        };
    }

    addSubject(subject ?: FHIRBundleOneModelConfigSubject){
        if (subject === undefined){
            BundleOneConditionElementClasses.model.resource.subject = BundleOneConditionElementClasses.encounter.resource.subject;
        }else{
            subject.reference = (typeof subject.reference === "number") ? `Patient/${subject.reference}` : subject.reference;
            BundleOneConditionElementClasses.model.resource.subject = subject
        }

        return this;
    }

    addCategory(category : FHIRBundleOneModelConfigCategory){
        if (BundleOneConditionElementClasses.model.resource.category === undefined)
            BundleOneConditionElementClasses.model.resource.category = [];

        BundleOneConditionElementClasses.model.resource.category.push(category)
        return this;
    }

    addClinicalStatus(clinicalStatus : FHIRBundleOneModelConfigClinicalStatus){
        BundleOneConditionElementClasses.model.resource.clinicalStatus = clinicalStatus;
        return this;
    }

    submit(){
        BundleOneClasses.EntryData.push(BundleOneConditionElementClasses.model);
        const DiagnosaNum = BundleOneClasses.EntryData.filter((data) => data.resource.resourceType === "Condition").length;
        if(BundleOneConditionElementClasses.encounter.resource.diagnosis?.[DiagnosaNum - 1].condition.reference !== undefined){
            // @ts-ignore
            BundleOneConditionElementClasses.encounter.resource.diagnosis?.[DiagnosaNum - 1].condition.reference = `${BundleOneClasses.EntryData[DiagnosaNum].fullUrl}`;
        }
        return new BundleOneClasses({
            config: BundleOneConditionElementClasses.finalConfig,
            credential: BundleOneConditionElementClasses.credential,
            hostConfig: BundleOneConditionElementClasses.hostConfig
        });
    }

}

export default BundleOneConditionElementClasses;