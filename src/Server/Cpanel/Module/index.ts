import {CpanelConstructor} from "../Interfaces/CpanelConstructor";
import Email from "./Email";

export class Module {

    private config : CpanelConstructor;

    constructor(config : CpanelConstructor) {
        this.config = config
    }

    Email() : Email {
        return new Email(this.config);
    }
}

export default Module;