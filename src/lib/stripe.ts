import { loadStripe } from '@stripe/stripe-js';
import { env } from '$env/dynamic/public';

export const getGtripe = async () => await loadStripe(env.PUBLIC_STRIPE_PUBLISHABLE_KEY);
