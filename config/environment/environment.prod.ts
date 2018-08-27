import { LogLevel } from "../../src/app/core/enums";

export const environmentProd = {
    serverBaseUrl: "",
    logLevel: LogLevel.Trace,
    enableAAD: true,
    adalConfig: {
		tenant: "",
		clientId: "", //registered application's Id (GUID)
		postLogoutRedirectUri: "http://localhost:8060/logout",
	}
};