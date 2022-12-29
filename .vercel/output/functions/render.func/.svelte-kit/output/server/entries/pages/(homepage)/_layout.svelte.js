import { c as create_ssr_component, b as subscribe, v as validate_component } from "../../../chunks/index.js";
import { H as Header, F as Footer } from "../../../chunks/Footer.js";
import "../../../chunks/db.js";
import { p as page } from "../../../chunks/stores.js";
import { B as Button } from "../../../chunks/Button.js";
const Hero = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `<div class="${"hero h-[40vh] w-full"}" style="${"background-image: url(/avatars/me_1.jpg); background-position: center 50%;"}"><div class="${"hero-overlay bg-opacity-60"}"></div>
	<div class="${"hero-content text-center text-neutral-content"}"><div class="${"max-w-md flex flex-col gap-4 items-center"}">
			<h1 class="${"mb-5 text-3xl font-bold"}">AI-generated <span class="${""}">avatars</span>.</h1>
			<p class="${"mb-5"}">Elevate your visual content with our AI-powered image generation service.
				</p>
			
			${$page.data.session ? `${validate_component(Button, "Button").$$render(
    $$result,
    {
      type: "button",
      link: "/app",
      gradient: true
    },
    {},
    {
      default: () => {
        return `Go to the app`;
      }
    }
  )}` : `
				${validate_component(Button, "Button").$$render(
    $$result,
    {
      type: "button",
      link: "/checkout",
      gradient: true
    },
    {},
    {
      default: () => {
        return `Start generating images`;
      }
    }
  )}`}</div></div></div>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"min-h-screen bg-gray-100 flex flex-col"}"><div class="${"w-full flex-1"}">${validate_component(Header, "Header").$$render($$result, {}, {}, {})}

		<div class="${"h-full w-full flex flex-col justify-center sm:pt-4 pb-4"}">${validate_component(Hero, "Hero").$$render($$result, {}, {}, {})}
			${slots.default ? slots.default({}) : ``}</div></div>
	${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</div>`;
});
export {
  Layout as default
};
