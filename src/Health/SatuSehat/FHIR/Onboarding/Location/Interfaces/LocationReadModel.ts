

export interface LocationReadModelAsById {
    type : "id";
    id : string;
}



export interface LocationReadModelAsIdentifier {
    type : "identifier";
    identifier : Array<string> | string;
}

export interface LocationReadModelAsOrgId {
    type : "orgId";
    orgId : string;
}

export interface LocationReadModelAsCustom {
    type : "custom";
    query : {
        name ?: string;
        organization ?: string;
    }
}

export type LocationReadModel = LocationReadModelAsIdentifier |LocationReadModelAsCustom | LocationReadModelAsOrgId | LocationReadModelAsById;