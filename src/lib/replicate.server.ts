import {
	PRIVATE_REPLICATE_API_TOKEN,
	PRIVATE_REPLICATE_MAX_TRAIN_STEPS,
	PRIVATE_REPLICATE_USERNAME,
	PRIVATE_WEBHOOK_ROOT
} from '$env/static/private';
import { PUBLIC_REPLICATE_INSTANCE_TOKEN } from '$env/static/public';
import type { User } from '@supabase/supabase-js';

async function getClient<T extends object>(path: string, body: object, experimental: boolean) {
	const response = await fetch(
		`${
			experimental
				? 'https://dreambooth-api-experimental.replicate.com'
				: 'https://api.replicate.com'
		}${path}`,
		{
			body: JSON.stringify(body),
			method: 'POST',
			headers: {
				Authorization: `Token ${PRIVATE_REPLICATE_API_TOKEN}`,
				'Content-Type': 'application/json'
			}
		}
	);
	if (!response.ok) {
		throw new Error(await response.text());
	}
	return (await response.json()) as T;
}

export const getRefinedInstanceClass = (instanceClass: string) => {
	return instanceClass === 'man' || instanceClass === 'woman' ? 'person' : instanceClass;
};

export const replacePromptToken = (prompt: string, instanceClass: string) => {
	const refinedPrompt = prompt.replaceAll(
		'@me',
		`${PUBLIC_REPLICATE_INSTANCE_TOKEN} ${getRefinedInstanceClass(instanceClass)}`
	);

	return refinedPrompt;
};

export interface ReplicateTrainPayload {
	id: string;
	input: {
		instance_prompt: string;
		class_prompt: string;
		instance_data: string;
		max_train_steps: number;
	};
	model: string;
	status: string;
	trainer_version: string;
	webhook_completed: string;
	version: string;
}

export async function train(instanceClass: string, user: User) {
	return await getClient<ReplicateTrainPayload>(
		'/v1/trainings',
		{
			input: {
				instance_prompt: `a photo of a ${PUBLIC_REPLICATE_INSTANCE_TOKEN} ${instanceClass}`,
				class_prompt: `a photo of a ${instanceClass}`,
				instance_data: `${PRIVATE_WEBHOOK_ROOT}/api/webhooks/${user.id}/instance_data`,
				max_train_steps: Number(PRIVATE_REPLICATE_MAX_TRAIN_STEPS) || 2000,
				num_class_images: 200,
				learning_rate: 1e-6
			},
			model: `${PRIVATE_REPLICATE_USERNAME}/${user.id}`,
			webhook_completed: `${PRIVATE_WEBHOOK_ROOT}/api/webhooks/${user.id}/replicate_complete`
		},
		true
	);
}

export interface ReplicatePredictPayload {
	id: string;
	version: string;
	urls: {
		get: string;
		cancel: string;
	};
	created_at?: string;
	started_at?: string;
	completed_at?: string;
	status: 'starting' | 'processing' | 'succeeded' | 'failed' | 'failed';
	input: {
		text: string;
	};
	output?: string;
	error?: string;
	logs?: string;
	metrics: {};
}

export async function predict(
	version: string,
	prompt: string,
	negativePrompt: string,
	seed: string | undefined
) {
	return await getClient<ReplicatePredictPayload>(
		'/v1/predictions',
		{
			input: {
				prompt,
				negative_prompt: negativePrompt,
				seed
			},
			version
		},
		false
	);
}
