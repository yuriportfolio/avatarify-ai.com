import { PUBLIC_ENV } from '$env/static/public';

export enum Themes {
	'cyberpunk' = 'Cyberpunk',
	'tinder' = 'Tinder',
	'cartoon' = 'Cartoon',
	'anime' = 'Anime',
	'office' = 'Office',
	'superhero' = 'Superhero',
	'art' = 'Art',
	'debug' = 'Debug'
}

export function themesMap() {
	return (Object.keys(Themes) as (keyof typeof Themes)[])
		.filter((theme) => {
			if (PUBLIC_ENV === 'PRODUCTION') {
				return theme !== 'debug';
			}
			return true;
		})
		.map((key) => [key, Themes[key]]);
}
