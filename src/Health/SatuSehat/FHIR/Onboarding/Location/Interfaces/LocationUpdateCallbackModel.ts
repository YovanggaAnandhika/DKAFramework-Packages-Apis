/**
 * ApidogModel
 */
export interface LocationUpdateCallback {
    address ?: LocationUpdateCallbackAddress;
    description?: string;
    id: string;
    identifier: LocationUpdateCallbackIdentifier[];
    managingOrganization?: LocationUpdateCallbackManagingOrganization;
    meta: LocationUpdateCallbackMeta;
    mode?: string;
    name?: string;
    physicalType?: LocationUpdateCallbackPhysicalType;
    position?: LocationUpdateCallbackPosition;
    resourceType: "Location";
    status?: string;
    telecom?: LocationUpdateCallbackTelecom[];
}

export interface LocationUpdateCallbackAddress {
    city: string;
    country: string;
    extension: LocationUpdateCallbackAddressExtension[];
    line: string[];
    postalCode: string;
    use: string;
}

export interface LocationUpdateCallbackAddressExtension {
    extension?: LocationUpdateCallbackExtensionExtension[];
    url?: string;
}

export interface LocationUpdateCallbackExtensionExtension {
    url: string;
    valueCode: string;
}

export interface LocationUpdateCallbackIdentifier {
    system?: string;
    value?: string;
}

export interface LocationUpdateCallbackManagingOrganization {
    reference: string;
}

export interface LocationUpdateCallbackMeta {
    lastUpdated: string;
    versionId: string;
}

export interface LocationUpdateCallbackPhysicalType {
    coding: LocationUpdateCallbackCoding[];
}

export interface LocationUpdateCallbackCoding {
    code?: string;
    display?: string;
    system?: string;
}

export interface LocationUpdateCallbackPosition {
    altitude: number;
    latitude: number;
    longitude: number;
}

export interface LocationUpdateCallbackTelecom {
    system: string;
    use: string;
    value: string;
}