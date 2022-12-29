import { c as create_ssr_component } from "../../../../chunks/index.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<article class="${"prose px-2 lg:prose-xl container max-w-3xl mx-auto my-16"}"><h2>Contact Us</h2>
	<p>Need to get in touch with us? Here are a few ways you can reach us:</p>
	<h3>Email</h3>
	<p>You can send us an email at <a href="${"mailto:info@company.com"}">pavanello.emanuele@gmail.com</a>.
	</p>
	
	<h3>Twitter</h3>
	<p>Follow us on Twitter at <a href="${"https://twitter.com/e_pavanello"}">@e_pavanello</a> to stay updated
		on our latest news and updates.
	</p></article>`;
});
export {
  Page as default
};
