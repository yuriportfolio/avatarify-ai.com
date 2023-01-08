import {
	PRIVATE_AWS_ACCESS_KEY_ID,
	PRIVATE_AWS_SECRET_ACCESS_KEY,
	PRIVATE_EC2_GENERATOR_INSTANCE_ID,
	PRIVATE_EC2_REGION
} from '$env/static/private';
import AWS from 'aws-sdk';

AWS.config.update({
	region: PRIVATE_EC2_REGION,
	accessKeyId: PRIVATE_AWS_ACCESS_KEY_ID,
	secretAccessKey: PRIVATE_AWS_SECRET_ACCESS_KEY
});

export function startGenerator() {
	return new Promise<boolean>((resolve, reject) => {
		const ec2 = new AWS.EC2();
		ec2.startInstances(
			{
				InstanceIds: [PRIVATE_EC2_GENERATOR_INSTANCE_ID]
			},
			(err, data) => {
				if (err) {
					reject(err);
				} else {
					resolve(data.StartingInstances!.length > 0);
				}
			}
		);
	});
}

export function generatorIsAwake() {
	return new Promise<boolean>((resolve, reject) => {
		const ec2 = new AWS.EC2();
		ec2.describeInstances(
			{
				InstanceIds: [PRIVATE_EC2_GENERATOR_INSTANCE_ID]
			},
			(err, data) => {
				if (err) {
					reject(err);
				} else if (
					data.Reservations &&
					data.Reservations.length > 0 &&
					data.Reservations[0].Instances &&
					data.Reservations[0].Instances.length > 0
				) {
					resolve(data.Reservations[0].Instances[0].State?.Name == 'running');
				} else {
					reject(new Error('No instances'));
				}
			}
		);
	});
}
