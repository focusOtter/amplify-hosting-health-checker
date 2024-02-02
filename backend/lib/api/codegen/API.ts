/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type AmplifyEventInput = {
  appId: string,
  appArn: string,
  status: string,
};

export type AmplifyPublish = {
  __typename: "AmplifyPublish",
  appId: string,
  appArn: string,
  status: string,
};

export type AmplifyApp = {
  __typename: "AmplifyApp",
  appId: string,
  appArn: string,
  name: string,
  repository: string,
  domain: string,
  status: string,
};

export type PublishMsgFromEBMutationVariables = {
  input: AmplifyEventInput,
};

export type PublishMsgFromEBMutation = {
  publishMsgFromEB?:  {
    __typename: "AmplifyPublish",
    appId: string,
    appArn: string,
    status: string,
  } | null,
};

export type ListAmplifyAppsQueryVariables = {
};

export type ListAmplifyAppsQuery = {
  listAmplifyApps?:  Array< {
    __typename: "AmplifyApp",
    appId: string,
    appArn: string,
    name: string,
    repository: string,
    domain: string,
    status: string,
  } | null > | null,
};

export type OnPublishMsgFromEbSubscriptionVariables = {
};

export type OnPublishMsgFromEbSubscription = {
  onPublishMsgFromEb?:  {
    __typename: "AmplifyPublish",
    appId: string,
    appArn: string,
    status: string,
  } | null,
};
