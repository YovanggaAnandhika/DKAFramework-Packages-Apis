

/**
 * Request
 */
export interface SatuSehatFHIREncounterCreateRequest {
    class: SatuSehatFHIREncounterCreateClass;
    id: string;
    identifier: SatuSehatFHIREncounterCreateIdentifier[];
    location: SatuSehatFHIREncounterCreateLocationElement[];
    meta: SatuSehatFHIREncounterCreateMeta;
    participant: SatuSehatFHIREncounterCreateParticipant[];
    period: SatuSehatFHIREncounterCreateRequestPeriod;
    resourceType: string;
    serviceProvider: SatuSehatFHIREncounterCreateServiceProvider;
    status: string;
    statusHistory: SatuSehatFHIREncounterCreateStatusHistory[];
    subject: SatuSehatFHIREncounterCreateSubject;
}

export interface SatuSehatFHIREncounterCreateClass {
    code: string;
    display: string;
    system: string;
}

export interface SatuSehatFHIREncounterCreateIdentifier {
    system?: string;
    value?: string;
}

export interface SatuSehatFHIREncounterCreateLocationElement {
    location?: SatuSehatFHIREncounterCreateLocationLocation;
}

export interface SatuSehatFHIREncounterCreateLocationLocation {
    display: string;
    reference: string;
}

export interface SatuSehatFHIREncounterCreateMeta {
    lastUpdated: string;
    versionId: string;
}

export interface SatuSehatFHIREncounterCreateParticipant {
    individual?: SatuSehatFHIREncounterCreateIndividual;
    type?: SatuSehatFHIREncounterCreateType[];
}

export interface SatuSehatFHIREncounterCreateIndividual {
    display: string;
    reference: string;
}

export interface SatuSehatFHIREncounterCreateType {
    coding?: SatuSehatFHIREncounterCreateCoding[];
}

export interface SatuSehatFHIREncounterCreateCoding {
    code?: string;
    display?: string;
    system?: string;
}

export interface SatuSehatFHIREncounterCreateRequestPeriod {
    start: string;
}

export interface SatuSehatFHIREncounterCreateServiceProvider {
    reference: string;
}

export interface SatuSehatFHIREncounterCreateStatusHistory {
    period?: SatuSehatFHIREncounterCreateStatusHistoryPeriod;
    status?: string;
}

export interface SatuSehatFHIREncounterCreateStatusHistoryPeriod {
    start: string;
}

export interface SatuSehatFHIREncounterCreateSubject {
    display: string;
    reference: string;
}
