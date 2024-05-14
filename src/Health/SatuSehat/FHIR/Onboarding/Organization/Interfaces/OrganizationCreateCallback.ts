/**
 * ApidogModel
 */
export interface OrganizationCreateCallbackModel {
    active: boolean;
    address: OrganizationCreateCallbackModelAddress[];
    id: string;
    identifier: OrganizationCreateCallbackModelIdentifier[];
    meta: OrganizationCreateCallbackModelMeta;
    name: string;
    partOf: OrganizationCreateCallbackModelPartOf;
    resourceType: string;
    telecom: OrganizationCreateCallbackModelTelecom[];
    type: OrganizationCreateCallbackModelType[];
}

export interface OrganizationCreateCallbackModelAddress {
    city?: string;
    country?: string;
    extension?: OrganizationCreateCallbackModelAddressExtension[];
    line?: string[];
    postalCode?: string;
    type?: string;
    use?: string;
}

export interface OrganizationCreateCallbackModelAddressExtension {
    extension?: OrganizationCreateCallbackModelExtensionExtension[];
    url?: string;
}

export interface OrganizationCreateCallbackModelExtensionExtension {
    url: string;
    valueCode: string;
}

export interface OrganizationCreateCallbackModelIdentifier {
    system?: string;
    use?: string;
    value?: string;
}

export interface OrganizationCreateCallbackModelMeta {
    lastUpdated: string;
    versionId: string;
}

export interface OrganizationCreateCallbackModelPartOf {
    reference: string;
}

export interface OrganizationCreateCallbackModelTelecom {
    system: string;
    use: string;
    value: string;
}

export interface OrganizationCreateCallbackModelType {
    coding?: OrganizationCreateCallbackModelCoding[];
}

export interface OrganizationCreateCallbackModelCoding {
    code?: string;
    display?: string;
    system?: string;
}
