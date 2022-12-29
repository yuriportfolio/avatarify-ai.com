import { loadStripe } from '@stripe/stripe-js';
import { PUBLIC_STRIPE_PUBLISHABLE_KEY } from '$env/static/public';

export const getGtripe = async () => await loadStripe(PUBLIC_STRIPE_PUBLISHABLE_KEY);
