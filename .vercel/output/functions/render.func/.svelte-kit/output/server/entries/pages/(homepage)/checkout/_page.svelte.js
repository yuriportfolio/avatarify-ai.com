import { c as create_ssr_component, b as subscribe } from "../../../../chunks/index.js";
import "@stripe/stripe-js";
import { p as page } from "../../../../chunks/stores.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
  $$unsubscribe_page();
  return `<article class="${"prose px-2 lg:prose-xl container max-w-3xl mx-auto text-center my-16"}"><h2>Start the payment process</h2>
	<p>Please wait while we redirect you to Stripe for payment...</p>
	<progress class="${"progress"}"></progress></article>`;
});
export {
  Page as default
};
