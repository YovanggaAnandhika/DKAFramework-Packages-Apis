import SatuSehatHostType from "../../../Interfaces/SatuSehatHost.type";
import {SatuSehatConstructorConfig} from "../../../Interfaces/SatuSehatConstructor.type";
import {DefaultContructorConfig} from "../../../Config";
import {SatuSehatFunctionClassParsing} from "../../../Interfaces/SatuSehatFunctionClassParsing";
import {SatuSehatCallbackProduction} from "../../../Interfaces/SatuSehatCallback.type";
import {LocationCreateModel} from "./Interfaces/LocationCreateModel";
import {LocationCreateCallbackModel} from "./Interfaces/LocationCreateCallbackModel";
import axios from "axios";


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



}