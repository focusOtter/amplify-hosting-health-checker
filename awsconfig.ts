import cdkoutput from './backend/output.json'

const output = cdkoutput['AmplifyHealthcheckBackendStack']

export const config = {
	Auth: {
		Cognito: {
			userPoolId: output.UserPoolId,
			userPoolClientId: output.UserPoolClientId,
			identityPoolId: output.IdentityPoolId,
		},
	},
	API: {
		GraphQL: {
			endpoint: output.GraphQLAPIURL,
			region: output.Region,
			defaultAuthMode: 'userPool' as any,
		},
	},
}
