/**
 * ApidogModel
 */
export interface LocationCreateModel {
    address: LocationCreateModelAddress;
    description: string;
    identifier: LocationCreateModelIdentifier[];
    managingOrganization: LocationCreateModelManagingOrganization;
    mode: string;
    name: string;
    physicalType: LocationCreateModelPhysicalType;
    position: LocationCreateModelPosition;
    resourceType: string;
    status: string;
    telecom: LocationCreateModelTelecom[];
}

export interface LocationCreateModelAddress {
    city: string;
    country: string;
    extension: LocationCreateModelAddressExtension[];
    line: string[];
    postalCode: string;
    use: string;
}

export interface LocationCreateModelAddressExtension {
    extension?: LocationCreateModelExtensionExtension[];
    url?: string;
}

export interface LocationCreateModelExtensionExtension {
    url: string;
    valueCode: string;
}

export interface LocationCreateModelIdentifier {
    system?: string;
    value?: string;
}

export interface LocationCreateModelManagingOrganization {
    reference: string;
}

export interface LocationCreateModelPhysicalType {
    coding: LocationCreateModelCoding[];
}

export interface LocationCreateModelCoding {
    code?: string;
    display?: string;
    system?: string;
}

export interface LocationCreateModelPosition {
    altitude: number;
    latitude: number;
    longitude: number;
}

export interface LocationCreateModelTelecom {
    system: string;
    use: string;
    value: string;
}
