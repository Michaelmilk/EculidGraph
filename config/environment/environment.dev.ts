import { LogLevel } from "../../src/app/core/enums";

export const environmentDev = {
    serverBaseUrl: "",
    logLevel: LogLevel.Trace,
    enableAAD: true,
    adalConfig: {
		tenant: "microsoft.onmicrosoft.com",
		clientId: "22a51da2-31d6-4f27-96d6-6501a970d824", //registered application's Id (GUID)
        postLogoutRedirectUri: "http://localhost:8060/logout",
        endpoints: {
            'https://graph.microsoft.com': '00000003-0000-0000-c000-000000000000'//the value is the "resourceAppId" in "requiredResourceAccess"
          }
	}
};