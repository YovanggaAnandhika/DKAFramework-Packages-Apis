

export interface CpanelConstructorServer {
    host : string;
    port : number;
}


export interface CpanelConstructorCredentials {
    username : string;
    password : string;
}
export interface CpanelConstructor {
    server : CpanelConstructorServer;
    credentials : CpanelConstructorCredentials
}