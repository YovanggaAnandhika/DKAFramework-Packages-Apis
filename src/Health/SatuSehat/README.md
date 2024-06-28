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
        .submit(); // Sending To Store Data Model

    /** Execution Add Action Model **/
    BundleOne.AddCondition()
        .addSubject({ "reference": "Patient/100000030009", "display": "Budi Santoso" })
        .linkEncounter(encounterData, 1)
        .addCategory({ coding : [{ system : "http://terminology.hl7.org/CodeSystem/condition-category", code : "encounter-diagnosis", display : "Encounter Diagnosis"}]})
        .submit() // Sending To Store Data Model


    /** @todo Print Valid Format **/
    console.log(JSON.stringify(BundleOne.merge()));
    
})();
```
Example Result : 
```json
{
  "resourceType": "Bundle",
  "type": "transaction",
  "entry": [
    {
      "fullUrl": "urn:uuid:c0631ec6-e49f-447a-abd4-00a1fb6e9b70",
      "resource": {
        "resourceType": "Encounter",
        "status": "arrived",
        "class": {
          "system": "http://terminology.hl7.org/CodeSystem/v3-ActCode",
          "code": "AMB",
          "display": "ambulatory"
        },
        "subject": {
          "reference": "Patient/100000030009",
          "display": "Budi Santoso"
        },
        "participant": [
          {
            "type": [
              {
                "coding": [
                  {
                    "system": "http://terminology.hl7.org/CodeSystem/v3-ParticipationType",
                    "code": "ATND",
                    "display": "attender"
                  }
                ]
              }
            ],
            "individual": {
              "reference": "Practitioner/N10000001",
              "display": "Dokter Bronsig"
            }
          }
        ],
        "location": [
          {
            "location": {
              "reference": "Location/b017aa54-f1df-4ec2-9d84-8823815d7228",
              "display": "Ruang 1A, Poliklinik Bedah Rawat Jalan Terpadu, Lantai 2, Gedung G"
            }
          }
        ],
        "diagnosis": [
          {
            "condition": {
              "display": "Dengue haemorrhagic fever",
              "reference": "urn:uuid:8eefe4d1-b770-4713-ad2f-dee47599c603"
            },
            "use": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/diagnosis-role",
                  "code": "DD",
                  "display": "Discharge diagnosis"
                }
              ]
            },
            "rank": 1
          }
        ],
        "period": {
          "start": "2022-12-18T14:00:00+00:00",
          "end": "2022-12-18T16:00:00+00:00"
        }
      },
      "request": {
        "method": "POST",
        "url": "Encounter"
      }
    },
    {
      "fullUrl": "urn:uuid:8eefe4d1-b770-4713-ad2f-dee47599c603",
      "resource": {
        "resourceType": "Condition",
        "subject": {
          "reference": "Patient/100000030009",
          "display": "Budi Santoso"
        },
        "encounter": {
          "reference": "urn:uuid:c0631ec6-e49f-447a-abd4-00a1fb6e9b70",
          "display": "Kunjungan Budi Santoso Pada Monday, 19 December 2022"
        },
        "category": [
          {
            "coding": [
              {
                "system": "http://terminology.hl7.org/CodeSystem/condition-category",
                "code": "encounter-diagnosis",
                "display": "Encounter Diagnosis"
              }
            ]
          }
        ]
      },
      "request": {
        "method": "POST",
        "url": "Condition"
      }
    }
  ]
}    
```