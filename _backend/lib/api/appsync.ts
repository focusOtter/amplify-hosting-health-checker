import { Construct } from 'constructs'
import * as path from 'path'
import {
	AuthorizationType,
	Definition,
	GraphqlApi,
	FieldLogLevel,
	FunctionRuntime,
	Code,
} from 'aws-cdk-lib/aws-appsync'
import { UserPool } from 'aws-cdk-lib/aws-cognito'
import { PolicyStatement } from 'aws-cdk-lib/aws-iam'

type AppSyncAPIProps = {
	appName: string
	userpool: UserPool
}

export const createAppSyncAPI = (scope: Construct, props: AppSyncAPIProps) => {
	const api = new GraphqlApi(scope, `${props.appName}`, {
		name: props.appName,
		definition: Definition.fromFile(path.join(__dirname, 'schema.graphql')),
		authorizationConfig: {
			defaultAuthorization: {
				authorizationType: AuthorizationType.USER_POOL,
				userPoolConfig: { userPool: props.userpool },
			},
			additionalAuthorizationModes: [
				{
					authorizationType: AuthorizationType.IAM,
				},
			],
		},
		logConfig: {
			fieldLogLevel: FieldLogLevel.ALL,
		},
	})

	const noneDS = api.addNoneDataSource('noneDS')

	const amplifyHttpDS = api.addHttpDataSource(
		'amplifyHttpDS',
		'https://amplify.us-east-1.amazonaws.com',
		{
			authorizationConfig: {
				signingRegion: 'us-east-1',
				signingServiceName: 'amplify',
			},
		}
	)
	const amplifyPolicyStatement = new PolicyStatement({
		actions: ['amplify:ListApps'],
		resources: ['*'],
	})
	amplifyHttpDS.grantPrincipal.addToPrincipalPolicy(amplifyPolicyStatement)

	noneDS.createResolver('pushMsgResolver', {
		typeName: 'Mutation',
		fieldName: 'publishMsgFromEB',
		code: Code.fromAsset(path.join(__dirname, 'JS_Functions/publishMsg.js')),
		runtime: FunctionRuntime.JS_1_0_0,
	})

	amplifyHttpDS.createResolver('listAmplifyAppsResolver', {
		typeName: 'Query',
		fieldName: 'listAmplifyApps',
		code: Code.fromAsset(
			path.join(__dirname, 'JS_Functions/listAmplifyApps.js')
		),
		runtime: FunctionRuntime.JS_1_0_0,
	})

	return api
}
