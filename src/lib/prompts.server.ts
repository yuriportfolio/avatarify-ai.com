import type { Themes } from './themes';

export function getPrompt(theme: keyof typeof Themes) {
	return [...subject(), getPromptTokens(theme)].join(', ');
}

export function getNegativePrompt(_theme: keyof typeof Themes) {
	return '(disfigured), (bad art), (deformed), (poorly drawn), (extra limbs), strange colours, blurry, boring, sketch, lacklustre, repetitive, cropped, hands';
}

export function getSubjectName() {
	return 'ojwxwjo';
}

function subject() {
	// ojwxwjo
	// ejxjo
	return [getSubjectName(), 'half body'];
}

function realistic() {
	return ['realistic, sharp focus, 8 k high definition, highly detailed'];
}

export function getPromptTokens(theme: keyof typeof Themes): string[] {
	switch (theme) {
		case 'cyberpunk':
			return [
				'inside the metaverse, machine face, piercing, neurochip, cyberpunk face, colorful'
			];
		case 'tinder':
			return [
				'in the style of stefan kostic, intricate, elegant, art by stanley lau and artgerm, extreme bokeh foliage',
				...realistic()
			];
		case 'anime': // Più o meno ok
			return ['digital painting, cinematic, photorealistic, makoto shinkai, andy warhol'];
		case 'cartoon': // Più o meno ok
			return ['disney character, cartoon', ...realistic()];
		case 'office':
			return ['office location', ...realistic()];

		case 'superhero': // Più o meno ok
			return ['superhero, universe background', ...realistic()];
		case 'art':
			return [
				'highly detailed portrait, sunglasses, blue eyes, tartan scarf, white hair by atey ghailan, by greg rutkowski, by greg tocchini, by james gilleard, by joe fenton, by kaethe butcher, gradient yellow, black, brown and magenta color scheme, grunge aesthetic!!! graffiti tag wall background'
			];
			//case 'gothic':
			return [
				'close up film photo, portrait of a winter gothic woman, leather, gothic jewellery, flowing cloak, elegant pose, atmospheric lighting, cinematic composition, detailed, art by daniela uhlig and brad rigney and adam hughe'
			];

		default:
			return [];
	}
}
