import { c as create_ssr_component, v as validate_component } from "../../../../chunks/index.js";
import { B as Button } from "../../../../chunks/Button.js";
import { I as Input } from "../../../../chunks/Input.js";
import "../../../../chunks/db.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let email = "";
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<div class="${"w-full max-w-sm mx-auto my-16 px-2"}"><div class="${"w-full bg-white shadow rounded-lg divide-y divide-gray-200"}"><form class="${"px-5 py-7 flex flex-col gap-4"}">${validate_component(Input, "Input").$$render(
      $$result,
      {
        id: "email",
        label: "E-mail",
        block: true,
        value: email
      },
      {
        value: ($$value) => {
          email = $$value;
          $$settled = false;
        }
      },
      {}
    )}
			${``}
			${validate_component(Button, "Button").$$render(
      $$result,
      {
        endIcon: "arrow_forward",
        block: true,
        type: "submit"
      },
      {},
      {
        default: () => {
          return `Login with magic link`;
        }
      }
    )}</form>
		
		<div class="${"py-5"}"><div class="${"flex flex-row justify-between px-4"}">${validate_component(Button, "Button").$$render(
      $$result,
      {
        startIcon: "arrow_back",
        ghost: true,
        size: "tiny",
        link: "/",
        normalCase: true
      },
      {},
      {
        default: () => {
          return `Back to betteravatar.app`;
        }
      }
    )}
				${validate_component(Button, "Button").$$render(
      $$result,
      {
        startIcon: "contact_support",
        ghost: true,
        size: "tiny",
        link: "/contacts",
        normalCase: true
      },
      {},
      {
        default: () => {
          return `Help`;
        }
      }
    )}</div></div></div></div>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
