# FHIR Example Code Bundle


### CHAPTER BUNDLE 1 (Encounter, Condition)
* Author : Yovangga Anandhika
* corporation : PT. OXY Technology Indonesia


```typescript
(async () => {

    /***
     * API Bridge SatuSehat Mastery Patient Data
     * Created by : Yovangga Anandhika
     */
    const SastuSehat = new Apis.Health.satusehat({
        state: SatuSehatConfigConstructorState.STAGING,
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

    const encounterData = BundleOne.AddEncounter()
        .addSubject({ "reference": "Patient/100000030009", "display": "Budi Santoso" })
        .addParticipant({ individual : { reference : "Practitioner/N10000001", display : "Dokter Bronsig" }})
        .addLocation({ location : { reference : "Location/b017aa54-f1df-4ec2-9d84-8823815d7228", display : "Ruang 1A, Poliklinik Bedah Rawat Jalan Terpadu, Lantai 2, Gedung G"}})
        .addDiagnosis({
            condition: { display : "Dengue haemorrhagic fever" },
            use : { coding : [{ system : "http://terminology.hl7.org/CodeSystem/diagnosis-role", code : "DD", display : "Discharge diagnosis"}]},
            rank : 1
        })
        .addPeriod({start : "2022-12-18T14:00:00+00:00", end : "2022-12-18T16:00:00+00:00" })
        .submit();

    BundleOne.AddCondition()
        .addSubject({ "reference": "Patient/100000030009", "display": "Budi Santoso" })
        .linkEncounter(encounterData, 1)
        .addCategory({ coding : [{ system : "http://terminology.hl7.org/CodeSystem/condition-category", code : "encounter-diagnosis", display : "Encounter Diagnosis"}]})
        .submit()


    console.log(JSON.stringify(BundleOne.merge()));


})();
```