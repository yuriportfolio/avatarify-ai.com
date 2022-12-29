import { c as create_ssr_component, v as validate_component } from "../../../chunks/index.js";
import { B as Button } from "../../../chunks/Button.js";
import { I as Input } from "../../../chunks/Input.js";
import "../../../chunks/db.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let email = "";
  let password = "";
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<h1 class="${"font-bold text-center text-2xl mb-5"}">BetterAvatar</h1>
<div class="${"bg-white shadow w-full rounded-lg divide-y divide-gray-200"}"><form class="${"px-5 py-7 flex flex-col gap-4"}">${validate_component(Input, "Input").$$render(
      $$result,
      {
        id: "email",
        label: "E-mail",
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
		${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "password",
        id: "password",
        label: "Password",
        value: password
      },
      {
        value: ($$value) => {
          password = $$value;
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
          return `Signup`;
        }
      }
    )}</form>
	<div class="${"p-5"}"><div class="${"grid grid-cols-3 gap-1"}">${validate_component(Button, "Button").$$render(
      $$result,
      {
        outline: true,
        size: "small",
        type: "button"
      },
      {},
      {
        default: () => {
          return `Google`;
        }
      }
    )}
			${validate_component(Button, "Button").$$render(
      $$result,
      {
        outline: true,
        size: "small",
        type: "button"
      },
      {},
      {
        default: () => {
          return `Facebook`;
        }
      }
    )}
			${validate_component(Button, "Button").$$render(
      $$result,
      {
        outline: true,
        size: "small",
        type: "button"
      },
      {},
      {
        default: () => {
          return `Twitter`;
        }
      }
    )}</div></div>
	<div class="${"py-5"}"><div class="${"text-center sm:text-left whitespace-nowrap px-4"}">${validate_component(Button, "Button").$$render(
      $$result,
      {
        startIcon: "login",
        ghost: true,
        size: "tiny",
        link: "/login"
      },
      {},
      {
        default: () => {
          return `Already registered?`;
        }
      }
    )}
			${validate_component(Button, "Button").$$render(
      $$result,
      {
        startIcon: "contact_support",
        class: "float-right",
        ghost: true,
        size: "tiny"
      },
      {},
      {
        default: () => {
          return `Help`;
        }
      }
    )}</div></div></div>
<div class="${"py-5"}"><div class="${"text-center sm:text-left whitespace-nowrap"}"><button class="${"btn btn-ghost btn-sm gap-2 text-xs"}" type="${"button"}"><span class="${"material-symbols-outlined text-sm"}">arrow_back </span>
			Back to betteravatar.app
		</button></div></div>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
