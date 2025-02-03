import {BRI_DEVELOPMENT, BRI_PRODUCTION} from "../Types/TypesBRIApis";


export interface BRIApisConfigGetToken {
    costumer_key : string,
    costumer_secret : string
}
export interface BRIApisConfig {
    state ?: BRI_PRODUCTION | BRI_DEVELOPMENT,
    host ?: string
}

export default BRIApisConfig;