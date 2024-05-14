import Apis from "../src";
import {SatuSehatConfigConstructorState} from "../src/Health/SatuSehat/Types/SatuSehatConfigConstructor";


(async () => {

    /***
     * API Bridge SatuSehat Mastery Patient Data
     * Created by : Yovangga Anandhika
     */
    const SastuSehat = new Apis.Health.satusehat({
        state: SatuSehatConfigConstructorState.STAGING,
        credentials: {
            auth: {
                clientId: "<token here>",
                clientSecret: "<token here>"
            }
        }
    });
    /** Dapatkan Kode Token Dari Module **/
    const token = await SastuSehat.getAccessToken();
    SastuSehat
        .getResources(token)
        .MPI()
        .Read("personal",{ identifier : 9271060312000001 })
        .then((response) => {

            console.log(JSON.stringify(response))

            })
            .catch((error) => {
                console.error("DKA", JSON.stringify(error))
            })

})();