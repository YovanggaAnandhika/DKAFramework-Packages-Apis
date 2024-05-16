import Apis, { SatuSehatState } from "../dist";

(async () => {

    /***
     * API Bridge SatuSehat Mastery Patient Data
     * Created by : Yovangga Anandhika
     */
    const SastuSehat = new Apis.Health.satusehat({
        state: SatuSehatState.STAGING,
        credentials: {
            orgId : "<orgId>",
            auth: {
                clientId: '<token>',
                clientSecret:  '<token>',
            },

        }
    });
    /** Dapatkan Kode Token Dari Module **/
    let BundleOne = SastuSehat.getResources({}).FHIR().Bundle().One()

    const encounterData = BundleOne
        .AddEncounter()
        .addSubject({ reference : 100000030009, display : "Budi Santoso" })
        .addParticipant({ individual : { reference : "Practitioner/N10000001", display : "Dokter Bronsig" }})
        .addLocation({ location : { reference : "Location/b017aa54-f1df-4ec2-9d84-8823815d7228", display : "Ruang 1A, Poliklinik Bedah Rawat Jalan Terpadu, Lantai 2, Gedung G"}})
        .addIdentifier({
            system : 1000004,
            value : "P20240001"
        })
        .addDiagnosis({
            condition: { display : "Dengue haemorrhagic fever" },
            use : { coding : [{ system : "http://terminology.hl7.org/CodeSystem/diagnosis-role", code : "DD", display : "Discharge diagnosis"}]}
        })
        .addDiagnosis({
            condition: { display : "Dengue haemorrhagic fever" },
            use : { coding : [{ system : "http://terminology.hl7.org/CodeSystem/diagnosis-role", code : "DD", display : "Discharge diagnosis"}]}
        })
        .addPeriod({ start : "02:00:00 18-12-2022", end : "00:00:00 18-12-2022" })
        .submit();

    BundleOne
        .AddCondition(encounterData)
        .addSubject()
        .addClinicalStatus({ coding : [ { system : "http://terminology.hl7.org/CodeSystem/condition-clinical", code : "active", display : "Active" }]})
        .addCategory({ coding : [{ system : "http://terminology.hl7.org/CodeSystem/condition-category", code : "encounter-diagnosis", display : "Encounter Diagnosis"}]})
        .submit()

    BundleOne
        .AddCondition(encounterData)
        .addSubject()
        .addClinicalStatus({ coding : [ { system : "http://terminology.hl7.org/CodeSystem/condition-clinical", code : "active", display : "Active" }]})
        .addCategory({ coding : [{ system : "http://terminology.hl7.org/CodeSystem/condition-category", code : "encounter-diagnosis", display : "Encounter Diagnosis"}]})
        .submit()



    console.log(JSON.stringify(BundleOne.merge()));


})();