/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const listAmplifyApps = /* GraphQL */ `query ListAmplifyApps {
  listAmplifyApps {
    appId
    appArn
    name
    repository
    domain
    status
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListAmplifyAppsQueryVariables,
  APITypes.ListAmplifyAppsQuery
>;
