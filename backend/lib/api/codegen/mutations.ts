/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const publishMsgFromEB = /* GraphQL */ `mutation PublishMsgFromEB($input: AmplifyEventInput!) {
  publishMsgFromEB(input: $input) {
    appId
    appArn
    status
    __typename
  }
}
` as GeneratedMutation<
  APITypes.PublishMsgFromEBMutationVariables,
  APITypes.PublishMsgFromEBMutation
>;
