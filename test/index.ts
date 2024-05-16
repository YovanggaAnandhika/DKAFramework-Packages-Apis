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
            orgId : "0a9751d9-9197-4ba5-8778-14b8c1925e45",
            auth: {
                clientId: 'ngh5TnGNa25g3ADgSesZ2MNKlhGE02hGlAcwOV7LqwrsXIQt',
                clientSecret:  '6JAlC9rN49mOjWw93eQMUDKmfbAHlsW8OJgaQET0GxNXPYumvPr7cE36qohRcsFG',
            },

        }
    });
    /** Dapatkan Kode Token Dari Module **/
    const token = await SastuSehat.getAccessToken();
    SastuSehat
        .getResources(token)
        .FHIR()
        .Bundle()
        .One()
        .AddEncounter({
            resourceType: "Encounter",

        })


})();