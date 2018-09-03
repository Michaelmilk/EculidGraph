import { environmentDev } from "./environment.dev"
import { environmentProd } from "./environment.prod"
import { environmentEculid } from "./environment.eculid"


const commonEnv = {

}

export const environment = Object.assign(commonEnv, environmentEculid);
