/**
 * ApidogModel
 */
export interface LocationCreateCallbackModel {
    address: LocationCreateCallbackModelAddress;
    description: string;
    id: string;
    identifier: LocationCreateCallbackModelIdentifier[];
    managingOrganization: LocationCreateCallbackModelManagingOrganization;
    meta: LocationCreateCallbackModelMeta;
    mode: string;
    name: string;
    physicalType: LocationCreateCallbackModelPhysicalType;
    position: LocationCreateCallbackModelPosition;
    resourceType: string;
    status: string;
    telecom: LocationCreateCallbackModelTelecom[];
}

export interface LocationCreateCallbackModelAddress {
    city: string;
    country: string;
    extension: LocationCreateCallbackModelAddressExtension[];
    line: string[];
    postalCode: string;
    use: string;
}

export interface LocationCreateCallbackModelAddressExtension {
    extension?: LocationCreateCallbackModelExtensionExtension[];
    url?: string;
}

export interface LocationCreateCallbackModelExtensionExtension {
    url: string;
    valueCode: string;
}

export interface LocationCreateCallbackModelIdentifier {
    system?: string;
    value?: string;
}

export interface LocationCreateCallbackModelManagingOrganization {
    reference: string;
}

export interface LocationCreateCallbackModelMeta {
    lastUpdated: string;
    versionId: string;
}

export interface LocationCreateCallbackModelPhysicalType {
    coding: LocationCreateCallbackModelCoding[];
}

export interface LocationCreateCallbackModelCoding {
    code?: string;
    display?: string;
    system?: string;
}

export interface LocationCreateCallbackModelPosition {
    altitude: number;
    latitude: number;
    longitude: number;
}

export interface LocationCreateCallbackModelTelecom {
    system: string;
    use: string;
    value: string;
}
