import { c as create_ssr_component, b as subscribe, v as validate_component, l as each, d as add_attribute } from "../../../../chunks/index.js";
import { p as page } from "../../../../chunks/stores.js";
import { B as Button } from "../../../../chunks/Button.js";
import { I as Input } from "../../../../chunks/Input.js";
import "../../../../chunks/db.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
  let inputFiles;
  let imagesForTrain = [];
  let imagesGenerated = [];
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<div class="${"w-full max-w-sm mx-auto my-16 px-2 flex flex-col gap-4"}"><div class="${"w-full bg-white shadow rounded-lg divide-y divide-gray-200"}"><form class="${"px-5 py-7 flex flex-col items-center gap-4"}">${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "file",
        label: "Photos",
        id: "photos",
        multiple: true,
        input: inputFiles
      },
      {
        input: ($$value) => {
          inputFiles = $$value;
          $$settled = false;
        }
      },
      {}
    )}
			${validate_component(Button, "Button").$$render($$result, { size: "small", type: "submit" }, {}, {
      default: () => {
        return `Invia`;
      }
    })}
			${validate_component(Button, "Button").$$render(
      $$result,
      {
        size: "small",
        type: "button",
        disabled: true
      },
      {},
      {
        default: () => {
          return `Addestra`;
        }
      }
    )}
			${validate_component(Button, "Button").$$render(
      $$result,
      {
        size: "small",
        type: "button",
        disabled: true
      },
      {},
      {
        default: () => {
          return `Genera`;
        }
      }
    )}</form></div>
	<div class="${"w-full bg-white shadow rounded-lg divide-y divide-gray-200 p-6"}"><article class="${"prose"}"><h1>Photos for training</h1></article>
		<div class="${"carousel carousel-center p-4 space-x-4 bg-neutral"}">${each(imagesForTrain, (image, i) => {
      return `<div class="${"carousel-item"}"><img${add_attribute("src", image.url, 0)} loading="${"eager"}"${add_attribute("alt", image.name, 0)} class="${"rounded-box aspect-square h-[30vh]"}">
				</div>`;
    })}</div></div>
	<div class="${"w-full bg-white shadow rounded-lg divide-y divide-gray-200 p-6"}"><article class="${"prose"}"><h1>Photos generated</h1></article>
		${each(imagesGenerated, (image) => {
      return `<img${add_attribute("src", image.url, 0)}${add_attribute("alt", image.name, 0)}>`;
    })}</div></div>`;
  } while (!$$settled);
  $$unsubscribe_page();
  return $$rendered;
});
export {
  Page as default
};
