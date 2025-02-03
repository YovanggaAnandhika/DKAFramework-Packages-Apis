import axios from "axios";
import BRiApisConfig, {BRIApisConfigGetToken} from "./Interfaces/BRiApisConfig";


export class BRI {

    private config : BRiApisConfig;
    constructor(config : BRiApisConfig) {
        this.config = config;
    }

    async getToken(configGetToken : BRIApisConfigGetToken) : Promise<any> {
        let refactorHost = `${this.config.host}/oauth/client_credential/accesstoken`;
        return new Promise(async (resolve, rejected) => {
            await axios({
                url : refactorHost,
                method : "POST",
                headers : {
                    "Content-Type" : "application/x-www-form-urlencoded"
                },
                params : {
                    grant_type : "client_credentials"
                },
                data : {
                    client_id : configGetToken.costumer_key,
                    client_secret : configGetToken.costumer_secret
                }
            }).then(async (res) => {
                return resolve({
                    status: true,
                    code: res.status,
                    msg: `successfully generated access token`,
                    data: res.data
                })
            }).catch(async (error) => {
                return rejected({
                    status: false,
                    code: error.status,
                    msg: `failed to get token`,
                    error: error
                })
            })
        })
    }

}

export default BRI;