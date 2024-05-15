import SatuSehatHostType from "../../../Interfaces/SatuSehatHost.type";
import {SatuSehatConstructorConfig} from "../../../Interfaces/SatuSehatConstructor.type";
import {DefaultContructorConfig} from "../../../Config";
import {SatuSehatFunctionClassParsing} from "../../../Interfaces/SatuSehatFunctionClassParsing";
import {SatuSehatCallbackProduction} from "../../../Interfaces/SatuSehatCallback.type";
import {LocationCreateModel} from "./Interfaces/LocationCreateModel";
import {LocationCreateCallbackModel} from "./Interfaces/LocationCreateCallbackModel";
import axios from "axios";
import {LocationReadCallbackModel} from "./Interfaces/LocationReadCallbackModel";
import {LocationReadModel} from "./Interfaces/LocationReadModel";
import {LocationUpdateModel} from "./Interfaces/LocationUpdateModel";
import {LocationUpdateCallback} from "./Interfaces/LocationUpdateCallbackModel";


export class LocationClasses {

    /**
     * @internal
     */
    static hostConfig: SatuSehatHostType | undefined;
    /**
     * @internal
     */
    static credential : SatuSehatCallbackProduction;

    /**
     *
     * @internal
     */

    static finalConfig: SatuSehatConstructorConfig = DefaultContructorConfig;

    constructor(options: SatuSehatFunctionClassParsing) {
        LocationClasses.finalConfig = options.config;
        LocationClasses.hostConfig = options.hostConfig;
        LocationClasses.credential = options.credential;
    }

    Create(query : LocationCreateModel) : Promise<LocationCreateCallbackModel> {
        return new Promise((resolve, rejected) => {
            //###########################################################
            if (LocationClasses.hostConfig === undefined)
                return rejected({status: false, code: 500, msg: `host config Fatal Error`});
            //###########################################################
            //###########################################################
            axios<LocationCreateCallbackModel>({
                url: `${LocationClasses.hostConfig.resources.fhir[LocationClasses.finalConfig.state]}/Location`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${LocationClasses.credential.access_token}`,
                    "Content-Type": "application/json",
                    "Cache-Control" : "no-cache",
                },
                data : query,
            }).then(async (response) => {
                resolve(response.data)
            }).catch((error) => {
                rejected({
                    ...error
                });
            });
        })
    }

    Read(query : LocationReadModel) : Promise<LocationReadCallbackModel> {
        return new Promise((resolve, rejected) => {
            //###########################################################
            if (LocationClasses.hostConfig === undefined)
                return rejected({status: false, code: 500, msg: `host config Fatal Error`});
            //###########################################################
            switch (query.type) {
                case "id":
                    //###########################################################
                    axios<LocationReadCallbackModel>({
                        url: `${LocationClasses.hostConfig.resources.fhir[LocationClasses.finalConfig.state]}/Location/${query.id}`,
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${LocationClasses.credential.access_token}`,
                            "Content-Type": "application/json",
                            "Cache-Control" : "no-cache",
                        }
                    }).then((response) => {
                        resolve(response.data)
                    }).catch((error) => {
                        rejected({
                            ...error
                        });
                    });
                    break;
                case "identifier":
                    //###########################################################
                    let mQuery = "";
                    if (typeof query.identifier === "string") {
                        mQuery += `http://sys-ids.kemkes.go.id/location/${query.identifier}`;
                    } else {
                        let ArrayToString = query.identifier.join("|");
                        mQuery += `http://sys-ids.kemkes.go.id/location/${ArrayToString}`;
                    }
                    axios<LocationReadCallbackModel>({
                        url: `${LocationClasses.hostConfig.resources.fhir[LocationClasses.finalConfig.state]}/Location`,
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${LocationClasses.credential.access_token}`,
                            "Content-Type": "application/json",
                            "Cache-Control" : "no-cache",
                        },
                        params : {
                            identifier : mQuery
                        }
                    }).then((response) => {
                        resolve(response.data)
                    }).catch((error) => {
                        rejected({
                            ...error
                        });
                    });
                    break;
                case "custom":
                    //###########################################################
                    query.type = "custom";
                    //###########################################################
                    axios<LocationReadCallbackModel>({
                        url: `${LocationClasses.hostConfig.resources.fhir[LocationClasses.finalConfig.state]}/Location`,
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${LocationClasses.credential.access_token}`,
                            "Content-Type": "application/json",
                            "Cache-Control" : "no-cache",
                        },
                        params : {
                            name : query
                        }
                    }).then((response) => {
                        resolve(response.data)
                    }).catch((error) => {
                        rejected({
                            ...error
                        });
                    });
                    break;
            }

        })
    }


    Update(query : LocationUpdateModel) : Promise<LocationUpdateCallback> {
        return new Promise((resolve, rejected) => {
            //###########################################################
            if (LocationClasses.hostConfig === undefined)
                return rejected({status: false, code: 500, msg: `host config Fatal Error`});
            //###########################################################
            axios<LocationUpdateCallback>({
                url: `${LocationClasses.hostConfig.resources.fhir[LocationClasses.finalConfig.state]}/Location`,
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${LocationClasses.credential.access_token}`,
                    "Content-Type": "application/json",
                    "Cache-Control" : "no-cache",
                },
                data : query
            }).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                rejected({
                    ...error
                });
            });

        })
    }

}