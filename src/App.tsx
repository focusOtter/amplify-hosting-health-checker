import { withAuthenticator } from '@aws-amplify/ui-react'
import { generateClient } from 'aws-amplify/api'
import { useEffect, useState } from 'react'
import { listAmplifyApps } from '../backend/lib/api/codegen/queries'
import { onPublishMsgFromEb } from '../backend/lib/api/codegen/subscriptions'
import { AmplifyApp } from '../backend/lib/api/codegen/API'
import { clsx } from 'clsx'

const client = generateClient()
function App() {
	const [apps, setApps] = useState<[] | AmplifyApp[]>([])

	useEffect(() => {
		client
			.graphql({
				query: listAmplifyApps,
			})
			.then((res) => {
				console.log(res.data.listAmplifyApps)
				setApps(res.data.listAmplifyApps as AmplifyApp[])
			})
	}, [])

	useEffect(() => {
		const subscription = client
			.graphql({
				query: onPublishMsgFromEb,
			})
			.subscribe({
				next: ({ data }) => {
					console.log('incoming data', data.onPublishMsgFromEb)
					let updatedApps: AmplifyApp[] = []
					apps.forEach((app) => {
						console.log('in loop')
						if (app.appId === data.onPublishMsgFromEb.appId) {
							updatedApps.push({
								...app,
								status: data.onPublishMsgFromEb.status,
							})
						} else {
							updatedApps.push(app)
						}
					})
					console.log('the updated apps', updatedApps)
					setApps(updatedApps)
				},
				error: (error) => console.warn(error),
			})

		return () => {
			subscription.unsubscribe()
		}
	}, [apps])
	return (
		<>
			<h1 className="text-5xl text-center my-8">Amplify Healthcheck 🌡️</h1>
			{apps.length === 0 ? (
				<div className="flex justify-center">
					<span className="loading loading-spinner loading-lg text-secondary" />
				</div>
			) : (
				<div className="flex flex-wrap justify-around">
					{apps.map((app) => {
						console.log(app.domain)
						return (
							<div
								key={app.appId}
								className={clsx(
									'card w-96 bg-neutral border-4 text-neutral-content my-4',
									{
										'border-yellow-500': app.status === 'STARTED',
										'border-green-500': app.status === 'SUCCEED',
										'border-red-500': app.status === 'FAILED',
									}
								)}
							>
								<div className="card-body items-center text-center">
									<h2 className="card-title">{app.name}</h2>
									<p className="mb-2">{app.appArn}</p>
									<div className="card-actions justify-end">
										<a
											target="_blank"
											href={`https://main.${app.domain}`}
											className="btn btn-primary"
										>
											View Domain
										</a>
										<a
											target="_blank"
											href={app.repository}
											className="btn btn-ghost"
										>
											View Repo
										</a>
									</div>
								</div>
							</div>
						)
					})}
				</div>
			)}
		</>
	)
}

export default withAuthenticator(App, { signUpAttributes: ['email'] })
