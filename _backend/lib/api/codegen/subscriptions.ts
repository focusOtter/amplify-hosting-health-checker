/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onPublishMsgFromEb = /* GraphQL */ `subscription OnPublishMsgFromEb {
  onPublishMsgFromEb {
    appId
    appArn
    status
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnPublishMsgFromEbSubscriptionVariables,
  APITypes.OnPublishMsgFromEbSubscription
>;
