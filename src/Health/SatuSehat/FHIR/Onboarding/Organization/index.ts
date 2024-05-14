import SatuSehatHostType from "../../../Interfaces/SatuSehatHost.type";
import { SatuSehatConstructorConfig } from "../../../Interfaces/SatuSehatConstructor.type";
import { DefaultContructorConfig } from "../../../Config";
import { SatuSehatFunctionClassParsing } from "../../../Interfaces/SatuSehatFunctionClassParsing";
import { SatuSehatCallbackProduction } from "../../../Interfaces/SatuSehatCallback.type";
import {OrganizationCreateModel} from "./Interfaces/OrganizationCreateTypes";
import axios from "axios";
import {OrganizationGetModel} from "./Interfaces/OrganizationGetTypes";
import {merge} from "lodash";
import {OrganizationUpdateModel} from "./Interfaces/OrganizationUpdateTypes";
import {OrganizationCreateCallbackModel} from "./Interfaces/OrganizationCreateCallback";
import {OrganizationGetCallbackModel} from "./Interfaces/OrganizationGetCallback";


export class OrganizationClasses {

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
        OrganizationClasses.finalConfig = options.config;
        OrganizationClasses.hostConfig = options.hostConfig;
        OrganizationClasses.credential = options.credential;
    }

    Create(query : OrganizationCreateModel): Promise<OrganizationCreateCallbackModel> {
        return new Promise((resolve, rejected) => {
            //###########################################################
            if (OrganizationClasses.hostConfig === undefined)
                return rejected({status: false, code: 500, msg: `host config Fatal Error`});
            //###########################################################
            axios<OrganizationCreateCallbackModel>({
                url: `${OrganizationClasses.hostConfig.resources.fhir[OrganizationClasses.finalConfig.state]}/Organization`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${OrganizationClasses.credential.access_token}`,
                    "Content-Type": "application/json",
                    "Cache-Control" : "no-cache",
                },
                data: query,
            }).then((response) => {
                resolve(response.data)

            }).catch((error) => {
                rejected({
                    ...error
                });
            });
        });
    }

    Get(query : OrganizationGetModel) : Promise<OrganizationGetCallbackModel> {
        return new Promise((resolve, rejected) => {
            //###########################################################
            if (OrganizationClasses.hostConfig === undefined) return rejected({status: false, code: 500, msg: `host config Fatal Error`});
            //###########################################################
            switch (typeof query) {
                case "string":

                    axios<OrganizationGetCallbackModel>({
                        url: `${OrganizationClasses.hostConfig.resources.fhir[OrganizationClasses.finalConfig.state]}/Organization/${query}`,
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${OrganizationClasses.credential.access_token}`,
                            "Content-Type": "application/json",
                            "Cache-Control" : "no-cache",
                        }
                    }).then(async (response) => {
                        resolve(response.data)

                    }).catch((error) => {
                        rejected({
                            ...error
                        });
                    });
                    break;
                default :
                    axios<OrganizationCreateCallbackModel>({
                        url: `${OrganizationClasses.hostConfig.resources.fhir[OrganizationClasses.finalConfig.state]}/Organization`,
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${OrganizationClasses.credential.access_token}`,
                            "Content-Type": "application/json",
                            "Cache-Control" : "no-cache",
                        },
                        params : query
                    }).then(async (response) => {
                        resolve(response.data)
                    }).catch((error) => {
                        rejected({
                            ...error
                        });
                    });
                    break;
            }

        });
    }

    Update(id : string, query : OrganizationUpdateModel) {
        return new Promise((resolve, rejected) => {
            //###########################################################
            if (OrganizationClasses.hostConfig === undefined)
                return rejected({status: false, code: 500, msg: `host config Fatal Error`});
            //###########################################################
            query = merge({
                identifier : [
                    {
                        "system": `http://sys-ids.kemkes.go.id/organization/${OrganizationClasses.finalConfig.credentials?.orgId}`,
                    }
                ],
                partOf : {
                    reference : `Organization/${OrganizationClasses.finalConfig.credentials?.orgId}`
                }
            }, query);
            //###########################################################
            axios<OrganizationUpdateModel>({
                url: `${OrganizationClasses.hostConfig.resources.fhir[OrganizationClasses.finalConfig.state]}/Organization/${id}`,
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${OrganizationClasses.credential.access_token}`,
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
        });
    }



}