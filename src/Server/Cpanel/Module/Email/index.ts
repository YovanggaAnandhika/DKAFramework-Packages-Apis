import {CpanelConstructor} from "../../Interfaces/CpanelConstructor";
import { CreateEmailAccount } from "./index.model";
import axios from "axios";

export class Email {

    private config : CpanelConstructor;

    constructor(config : CpanelConstructor) {
        this.config = config
    }

    async Create(options : CreateEmailAccount){
        return new Promise((resolve, rejected) => {
            axios({
                url : `${this.config.server.host}:${this.config.server.port}/execute/Email/add_pop`,
                method : "POST",
                headers : {
                    "Authorization" : `cpanel ${this.config.credentials.username}:${this.config.credentials.password}`,
                    'Content-Type': 'application/json',
                },
                params : options
            }).then((response) => {
                const DataResponse = response.data;
                if (DataResponse.status){
                    resolve(DataResponse)
                }else{
                    rejected(DataResponse)
                }
            }).catch((error) => {
                rejected(error)
            })
        })
    }

    async ResetPassword(options : CreateEmailAccount){
        return new Promise((resolve, rejected) => {
            axios({
                url : `${this.config.server.host}:${this.config.server.port}/execute/Email/passwd_pop`,
                method : "POST",
                headers : {
                    "Authorization" : `cpanel ${this.config.credentials.username}:${this.config.credentials.password}`,
                    'Content-Type': 'application/json',
                },
                params : options
            }).then((response) => {
                const DataResponse = response.data;
                if (DataResponse.status){
                    return resolve(DataResponse)
                }else{
                    return rejected(DataResponse)
                }
            }).catch((error) => {
                return rejected(error)
            })
        })
    }
}

export default Email;