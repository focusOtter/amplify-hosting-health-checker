import { Context, HTTPRequest } from '@aws-appsync/utils'
import { AmplifyApp } from '../codegen/API'

export function request(ctx: Context) {
	console.log('request', ctx)
	return {
		method: 'GET',
		resourcePath: '/apps',
	} as HTTPRequest
}

export function response(ctx: Context) {
	type appResponse = {
		appId: string
		appArn: string
		name: string
		repository: string
		defaultDomain: string
		productionBranch: {
			status: string
		}
	}
	const amplifyData = JSON.parse(ctx.result.body).apps as [appResponse]

	const result = amplifyData.map((app: appResponse) => {
		return {
			appId: app.appId,
			appArn: app.appArn,
			name: app.name,
			repository: app.repository,
			domain: app.defaultDomain,
			status: app.productionBranch.status,
		} as AmplifyApp
	})

	console.log('the formatted result', result)
	return result
}
