import { Context, NONERequest } from '@aws-appsync/utils'
import { PublishMsgFromEBMutationVariables } from '../codegen/API'

export function request(ctx: Context<PublishMsgFromEBMutationVariables>) {
	console.log('the context', ctx)
	return {
		payload: {
			input: ctx.args.input,
		},
	} as NONERequest
}

export function response(ctx: Context) {
	console.log(ctx.result.input)
	return ctx.result.input
}
