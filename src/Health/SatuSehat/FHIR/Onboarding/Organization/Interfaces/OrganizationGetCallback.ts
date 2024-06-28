/**
 * ApidogModel
 */
export interface OrganizationGetCallbackModel {
    active: boolean;
    address: OrganizationGetCallbackModelAddress[];
    id: string;
    identifier: OrganizationGetCallbackModelIdentifier[];
    meta: OrganizationGetCallbackModelMeta;
    name: string;
    partOf: OrganizationGetCallbackModelPartOf;
    resourceType: string;
    telecom: OrganizationGetCallbackModelTelecom[];
    type: OrganizationGetCallbackModelType[];
}

export interface OrganizationGetCallbackModelAddress {
    city?: string;
    country?: string;
    extension?: OrganizationGetCallbackModelAddressExtension[];
    line?: string[];
    postalCode?: string;
    type?: string;
    use?: string;
}

export interface OrganizationGetCallbackModelAddressExtension {
    extension?: OrganizationGetCallbackModelExtensionExtension[];
    url?: string;
}

export interface OrganizationGetCallbackModelExtensionExtension {
    url: string;
    valueCode: string;
}

export interface OrganizationGetCallbackModelIdentifier {
    system?: string;
    use?: string;
    value?: string;
}

export interface OrganizationGetCallbackModelMeta {
    lastUpdated: string;
    versionId: string;
}

export interface OrganizationGetCallbackModelPartOf {
    reference: string;
}

export interface OrganizationGetCallbackModelTelecom {
    system: string;
    use: string;
    value: string;
}

export interface OrganizationGetCallbackModelType {
    coding?: OrganizationGetCallbackModelCoding[];
}

export interface OrganizationGetCallbackModelCoding {
    code?: string;
    display?: string;
    system?: string;
}
