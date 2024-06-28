/**
 * ApidogModel
 */
export interface OrganizationUpdateCallbackModel {
    active: boolean;
    address: OrganizationUpdateCallbackModelAddress[];
    id: string;
    identifier: OrganizationUpdateCallbackModelIdentifier[];
    meta: OrganizationUpdateCallbackModelMeta;
    name: string;
    partOf: OrganizationUpdateCallbackModelPartOf;
    resourceType: string;
    telecom: OrganizationUpdateCallbackModelTelecom[];
    type: OrganizationUpdateCallbackModelType[];
}

export interface OrganizationUpdateCallbackModelAddress {
    city?: string;
    country?: string;
    extension?: OrganizationUpdateCallbackModelAddressExtension[];
    line?: string[];
    postalCode?: string;
    type?: string;
    use?: string;
}

export interface OrganizationUpdateCallbackModelAddressExtension {
    extension?: OrganizationUpdateCallbackModelExtensionExtension[];
    url?: string;
}

export interface OrganizationUpdateCallbackModelExtensionExtension {
    url: string;
    valueCode: string;
}

export interface OrganizationUpdateCallbackModelIdentifier {
    system?: string;
    use?: string;
    value?: string;
}

export interface OrganizationUpdateCallbackModelMeta {
    lastUpdated: string;
    profile: string[];
    versionId: string;
}

export interface OrganizationUpdateCallbackModelPartOf {
    reference: string;
}

export interface OrganizationUpdateCallbackModelTelecom {
    system: string;
    use: string;
    value: string;
}

export interface OrganizationUpdateCallbackModelType {
    coding?: OrganizationUpdateCallbackModelCoding[];
}

export interface OrganizationUpdateCallbackModelCoding {
    code?: string;
    display?: string;
    system?: string;
}