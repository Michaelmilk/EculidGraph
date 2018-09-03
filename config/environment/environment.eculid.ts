import { LogLevel } from "../../src/app/core/enums";

export const environmentEculid = {
  serverBaseUrl: "http://satoriextraction:8805/api/Connection/",
  logLevel: LogLevel.Trace,
  enableAAD: true,
  adalConfig: {
    tenant: "M365x342201.onmicrosoft.com",
    clientId: "38917741-a378-4ada-97f7-fa41a67f078f", //registered application's Id (GUID)
    postLogoutRedirectUri: "http://eculid.azurewebsites.net/logout",
    endpoints: {
      'https://graph.microsoft.com': '00000003-0000-0000-c000-000000000000'//the value is the "resourceAppId" in "requiredResourceAccess"
    }
  }
};