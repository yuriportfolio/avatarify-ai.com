import { c as create_ssr_component, v as validate_component } from "../../../chunks/index.js";
import { H as Header, F as Footer } from "../../../chunks/Footer.js";
import "../../../chunks/db.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"min-h-screen bg-gray-100 flex flex-col"}"><div class="${"w-full flex-1"}">${validate_component(Header, "Header").$$render($$result, {}, {}, {})}

		<div class="${"h-full w-full flex flex-col justify-center sm:pt-4 pb-4"}">${slots.default ? slots.default({}) : ``}</div></div>
	${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</div>`;
});
export {
  Layout as default
};
