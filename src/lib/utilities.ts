import { writable } from 'svelte/store';

export function getBaseUrl() {
	return window.location.protocol + '//' + window.location.host;
}

export const error = writable<string | null>(null);

export function showError(e: string | Error | unknown) {
	if (e instanceof Error) {
		error.set(e.message);
	} else if (typeof e == 'string') {
		error.set(e);
	} else if (typeof e === 'object' && e && 'message' in e && typeof e.message === 'string') {
		error.set(e.message);
	}
}

export function removeError() {
	error.set(null);
}
