/**
 * ApidogModel
 */
export interface LocationUpdateModel {
    address?: LocationUpdateModelAddress;
    description?: string;
    id: string;
    identifier: LocationUpdateModelIdentifier[];
    managingOrganization?: LocationUpdateModelManagingOrganization;
    mode?: string;
    name?: string;
    physicalType?: LocationUpdateModelPhysicalType;
    position?: LocationUpdateModelPosition;
    resourceType: "Location";
    status?: string;
    telecom?: LocationUpdateModelTelecom[];
}

export interface LocationUpdateModelAddress {
    city: string;
    country: string;
    extension: LocationUpdateModelAddressExtension[];
    line: string[];
    postalCode: string;
    use: string;
}

export interface LocationUpdateModelAddressExtension {
    extension?: LocationUpdateModelExtensionExtension[];
    url?: string;
}

export interface LocationUpdateModelExtensionExtension {
    url: string;
    valueCode: string;
}

export interface LocationUpdateModelIdentifier {
    system?: string;
    value?: string;
}

export interface LocationUpdateModelManagingOrganization {
    reference: string;
}

export interface LocationUpdateModelPhysicalType {
    coding: LocationUpdateModelCoding[];
}

export interface LocationUpdateModelCoding {
    code?: string;
    display?: string;
    system?: string;
}

export interface LocationUpdateModelPosition {
    altitude: number;
    latitude: number;
    longitude: number;
}

export interface LocationUpdateModelTelecom {
    system: string;
    use: string;
    value: string;
}