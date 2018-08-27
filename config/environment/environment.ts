import { environmentDev } from "./environment.dev"
import { environmentProd } from "./environment.prod"


const commonEnv = {

}

export const environment = Object.assign(commonEnv, environmentDev);
