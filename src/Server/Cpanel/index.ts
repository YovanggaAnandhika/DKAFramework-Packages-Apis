import {CpanelConstructor} from "./Interfaces/CpanelConstructor";
import axios, {Axios} from "axios";
import Module from "./Module";


export class Cpanel {

    private config : CpanelConstructor;
    private axios : Axios;
    constructor(config : CpanelConstructor) {
        this.config = config;
        this.axios = axios.create({
            url : `${this.config.server.host}:${this.config.server.port}`
        })
    }

    Module() : Module{
        return new Module(this.config)
    }



}

export default Cpanel;