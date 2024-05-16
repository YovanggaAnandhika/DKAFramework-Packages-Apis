


export interface FHIRBundleOneModelConfig {
    resourceType: "Bundle"
    type: "transaction"
    entry: Array<FHIRBundleOneModelConfigEntryCondition | FHIRBundleOneModelConfigEntryEncounter>
}

export type FHIRBundleOneModelConfigEntry = Array<FHIRBundleOneModelConfigEntryCondition | FHIRBundleOneModelConfigEntryEncounter>

export interface FHIRBundleOneModelConfigEntryCondition {
    fullUrl ?: string
    resource : FHIRBundleOneModelConfigResourceCondition
    request ?: FHIRBundleOneModelConfigRequest
}

export interface FHIRBundleOneModelConfigEntryEncounter {
    fullUrl ?: string
    resource : FHIRBundleOneModelConfigResourceEncounter
    request ?: FHIRBundleOneModelConfigRequest
}


export interface FHIRBundleOneModelConfigResourceEncounter {
    resourceType: "Encounter"
    status?: "arrived" | "finished"
    class?: FHIRBundleOneModelConfigClass
    subject ?: FHIRBundleOneModelConfigSubject
    participant : FHIRBundleOneModelConfigParticipant[]
    period?: FHIRBundleOneModelConfigPeriod
    location ?: FHIRBundleOneModelConfigLocation[]
    diagnosis?: FHIRBundleOneModelConfigDiagnosis[]
    statusHistory?: FHIRBundleOneModelConfigStatusHistory[]
    serviceProvider?: FHIRBundleOneModelConfigServiceProvider
    identifier?: FHIRBundleOneModelConfigIdentifier[]
    code?: FHIRBundleOneModelConfigCode
}

export interface FHIRBundleOneModelConfigResourceCondition {
    resourceType: "Condition"
    class?: FHIRBundleOneModelConfigClass
    subject ?: FHIRBundleOneModelConfigSubject
    participant : FHIRBundleOneModelConfigParticipant[]
    period?: FHIRBundleOneModelConfigPeriod
    location ?: FHIRBundleOneModelConfigLocation[]
    identifier?: FHIRBundleOneModelConfigIdentifier[]
    clinicalStatus?: FHIRBundleOneModelConfigClinicalStatus
    category?: FHIRBundleOneModelConfigCategory[]
    code?: FHIRBundleOneModelConfigCode
    encounter?: FHIRBundleOneModelConfigEncounter
}

export interface FHIRBundleOneModelConfigClass {
    system: string
    code: string
    display: string
}

export interface FHIRBundleOneModelConfigSubject {
    reference: string
    display: string
}

export interface FHIRBundleOneModelConfigParticipant {
    type ?: FHIRBundleOneModelConfigType[]
    individual ?: FHIRBundleOneModelConfigIndividual
}

export interface FHIRBundleOneModelConfigType {
    coding: FHIRBundleOneModelConfigCoding[]
}

export interface FHIRBundleOneModelConfigCoding {
    system: string
    code: string
    display: string
}

export interface FHIRBundleOneModelConfigIndividual {
    reference: string
    display: string
}

export interface FHIRBundleOneModelConfigPeriod {
    start: string
    end: string
}

export interface FHIRBundleOneModelConfigLocation {
    location ?: FHIRBundleOneModelConfigLocation2
}

export interface FHIRBundleOneModelConfigLocation2 {
    reference: string
    display: string
}

export interface FHIRBundleOneModelConfigDiagnosis {
    condition: FHIRBundleOneModelConfigCondition
    use: FHIRBundleOneModelConfigUse
    rank: number
}

export interface FHIRBundleOneModelConfigCondition {
    reference ?: string
    display: string
}

export interface FHIRBundleOneModelConfigUse {
    coding: FHIRBundleOneModelConfigCoding2[]
}

export interface FHIRBundleOneModelConfigCoding2 {
    system: string
    code: string
    display: string
}

export interface FHIRBundleOneModelConfigStatusHistory {
    status: string
    period: FHIRBundleOneModelConfigPeriod2
}

export interface FHIRBundleOneModelConfigPeriod2 {
    start: string
    end: string
}

export interface FHIRBundleOneModelConfigServiceProvider {
    reference: string
}

export interface FHIRBundleOneModelConfigIdentifier {
    system: string
    value: string
}

export interface FHIRBundleOneModelConfigClinicalStatus {
    coding: FHIRBundleOneModelConfigCoding3[]
}

export interface FHIRBundleOneModelConfigCoding3 {
    system: string
    code: string
    display: string
}

export interface FHIRBundleOneModelConfigCategory {
    coding: FHIRBundleOneModelConfigCoding4[]
}

export interface FHIRBundleOneModelConfigCoding4 {
    system: string
    code: string
    display: string
}

export interface FHIRBundleOneModelConfigCode {
    coding: FHIRBundleOneModelConfigCoding5[]
}

export interface FHIRBundleOneModelConfigCoding5 {
    system: string
    code: string
    display: string
}

export interface FHIRBundleOneModelConfigEncounter {
    reference: string
    display: string
}

export interface FHIRBundleOneModelConfigRequest {
    method: string
    url: string
}
