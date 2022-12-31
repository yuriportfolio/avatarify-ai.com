import type { Themes } from './themes';

export function getPrompt(theme: keyof typeof Themes): [string, number | null] {
	switch (theme) {
		case 'cyberpunk':
			return [
				'ejxjo, a whirlwind inside the metaverse, guy, male, man, machine face, fashionable haircut, piercing, half body, neurochip, android, cyberpunk face, by loish, d & d, fantasy, intricate, elegant, highly detailed, colorful, digital painting, artstation, concept art, art by artgerm and greg rutkowski and alphonse mucha',
				null
			];
		case 'tinder':
			return [
				'photo of a gorgeous ejxjo in the style of stefan kostic, realistic, half body shot, sharp focus, 8 k high definition, insanely detailed, intricate, elegant, art by stanley lau and artgerm, extreme bokeh foliage',
				null
			];
		//return 'beautiful ejxjo, pretty, gorgeous, alluring';
		case 'anime':
			return [
				'a very beautiful anime of ejxjo, half body, short smile, mini jeans skirt, cute top, urban setting, cinematic lighting, medium shot, mid-shot, highly detailed, trending on Artstation, Unreal Engine 4k, cinematic wallpaper by Stanley Artgerm Lau, WLOP, Rossdraws, James Jean, Andrei Riabovitchev, Marc Simonetti, and Sakimichan',
				null
			];
		case 'cartoon':
			return ['image of ejxojo, like disney character, half body, realistic', null];
		case 'office':
			return [
				'photo of ejxojo in office, half body shot, realistic, sharp focus, 8 k high definition, insanely detailed',
				null
			];
		case 'superhero':
			return [
				'ejxojo as a superhero, super galactic background with neon gradient background and shooting stars, muscular, strong',
				null
			];
		default:
			return ['ejxjo', null];
	}
}
