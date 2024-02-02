import { aws_events as events } from 'aws-cdk-lib'

import { EventBus } from 'aws-cdk-lib/aws-events'
import {
	Effect,
	PolicyDocument,
	PolicyStatement,
	Role,
	ServicePrincipal,
} from 'aws-cdk-lib/aws-iam'
import { Construct } from 'constructs'

type EventBridgeBusProps = {
	defaultBusArn: string
	appsyncApiArn: string
	appsyncEndpointArn: string
	graphQlOperation: string
	ruleName: string
	targetId: string
}
export const createEventBridge = (
	scope: Construct,
	props: EventBridgeBusProps
) => {
	const bus = EventBus.fromEventBusArn(scope, 'defaultBus', props.defaultBusArn)

	// Create the Policy Statement
	const policyStatement = new PolicyStatement({
		effect: Effect.ALLOW,
		actions: ['appsync:GraphQL'],
		resources: [`${props.appsyncApiArn}/types/Mutation/*`],
	})

	// Create the Role and attach the policy
	const ebRuleRole = new Role(scope, 'AppSyncInvokeRole', {
		assumedBy: new ServicePrincipal('events.amazonaws.com'),
		inlinePolicies: {
			PolicyStatement: new PolicyDocument({
				statements: [policyStatement],
			}),
		},
	})

	//  Sample Rule
	// {
	//   "source": ["aws.amplify"]
	//   "detail": {
	//     "appId": ["d3ihil90go3"],
	//     "branchName": ["main"],
	//     "jobStatus": ["SUCCEED", "FAILED", "STARTED", "RUNNING"],
	//   },
	//   "detail-type": ["Amplify Deployment Status Change"],
	// }
	const mybroadcastRule = new events.CfnRule(scope, 'cfnRule', {
		eventBusName: bus.eventBusName,
		name: props.ruleName,
		eventPattern: {
			source: ['aws.amplify'],
			detail: {
				jobStatus: ['SUCCEED', 'FAILED', 'STARTED'],
				branchName: ['main'],
			},
		},
		targets: [
			{
				id: props.targetId,
				arn: props.appsyncEndpointArn,
				roleArn: ebRuleRole.roleArn,
				appSyncParameters: {
					graphQlOperation: props.graphQlOperation,
				},
				//         Event Payload
				// {
				//     "version": "0",
				//     "id": "f5f22592-1ef9-83f7-6dff-d57ec89f6156",
				//     "detail-type": "Amplify Deployment Status Change",
				//     "source": "aws.amplify",
				//     "account": "842537737558",
				//     "time": "2024-02-02T06:53:05Z",
				//     "region": "us-east-1",
				//     "resources": [
				//         "arn:aws:amplify:us-east-1:842537737558:apps/d2ihil90go3azt/branches/main/jobs/0000000002"
				//     ],
				//     "detail": {
				//         "appId": "d2ihil90go3azt",
				//         "branchName": "main",
				//         "jobId": "2",
				//         "jobStatus": "SUCCEED"
				//         "jobStep" "DEPLOY" (NOT ALWAYS THERE)
				//     }
				// }
				inputTransformer: {
					inputPathsMap: {
						appId: '$.detail.appId',
						appArn: '$.resources[0]',
						status: '$.detail.jobStatus',
					},
					inputTemplate: JSON.stringify({
						input: {
							appId: '<appId>',
							appArn: '<appArn>',
							status: '<status>',
						},
					}),
				},
			},
		],
	})

	return { bus, mybroadcastRule }
}
