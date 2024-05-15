/**
 * ApidogModel
 */
export interface LocationReadCallbackModel {
    entry : LocationReadCallbackModelEntry[];
    resourceType: "Location";
    total: number;
    type: string;
}

export interface LocationReadCallbackModelEntry {
    fullUrl: string;
    resource: LocationReadCallbackModelResource;
    search: LocationReadCallbackModelSearch;
}

export interface LocationReadCallbackModelResource {
    address: LocationReadCallbackModelAddress;
    description: string;
    id: string;
    identifier: LocationReadCallbackModelIdentifier[];
    managingOrganization: LocationReadCallbackModelManagingOrganization;
    meta: LocationReadCallbackModelMeta;
    mode: string;
    name: string;
    physicalType: LocationReadCallbackModelPhysicalType;
    position: LocationReadCallbackModelPosition;
    resourceType: string;
    status: string;
    telecom: LocationReadCallbackModelTelecom[];
}

export interface LocationReadCallbackModelAddress {
    city: string;
    country: string;
    extension: LocationReadCallbackModelAddressExtension[];
    line: string[];
    postalCode: string;
    use: string;
}

export interface LocationReadCallbackModelAddressExtension {
    extension: LocationReadCallbackModelExtensionExtension[];
    url: string;
}

export interface LocationReadCallbackModelExtensionExtension {
    url: string;
    valueCode: string;
}

export interface LocationReadCallbackModelIdentifier {
    system: string;
    value: string;
}

export interface LocationReadCallbackModelManagingOrganization {
    reference: string;
}

export interface LocationReadCallbackModelMeta {
    lastUpdated: string;
    versionId: string;
}

export interface LocationReadCallbackModelPhysicalType {
    coding: LocationReadCallbackModelCoding[];
}

export interface LocationReadCallbackModelCoding {
    code: string;
    display: string;
    system: string;
}

export interface LocationReadCallbackModelPosition {
    altitude: number;
    latitude: number;
    longitude: number;
}

export interface LocationReadCallbackModelTelecom {
    system: string;
    use: string;
    value: string;
}

export interface LocationReadCallbackModelSearch {
    mode: string;
}