import { c as create_ssr_component, l as each, v as validate_component, d as add_attribute } from "../../../chunks/index.js";
import { B as Button } from "../../../chunks/Button.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ":root{--color-text:navy;--color-bg:papayawhip;--color-bg-accent:#ecdcc0;--duration:60s;--scroll-start:0;--scroll-end:calc(-100% + 100vw)}.marquee.svelte-rlmcj5.svelte-rlmcj5{display:flex;overflow:hidden;user-select:none}.marquee__group.svelte-rlmcj5.svelte-rlmcj5{flex-shrink:0;display:flex;align-items:center;justify-content:space-around;min-width:100%;animation:svelte-rlmcj5-scroll-x var(--duration) linear infinite}.marquee--reverse.svelte-rlmcj5 .marquee__group.svelte-rlmcj5{animation-direction:reverse;animation-delay:-3s}@media(prefers-reduced-motion: reduce){.marquee__group.svelte-rlmcj5.svelte-rlmcj5{animation-play-state:paused}}@keyframes svelte-rlmcj5-scroll-x{from{transform:translateX(var(--scroll-start))}to{transform:translateX(var(--scroll-end))}}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const avatars = Array.from({ length: 19 }, (_, index) => `avatars/me_${index + 1}.jpg`);
  const first = avatars.slice(0, 10);
  const second = avatars.slice(10);
  $$result.css.add(css);
  return `<div class="${"prose px-2 lg:prose-xl text-center py-16 min-w-full"}"><h2>Some generated avatars</h2>
	<p>Tag us on social media and use our hashtag to share your AI-generated images and get noticed
	</p></div>
<div class="${"marquee w-full svelte-rlmcj5"}"><div class="${"carousel carousel-center p-4 space-x-4 bg-neutral marquee__group svelte-rlmcj5"}">${each(first, (image, i) => {
    return `<div class="${"carousel-item"}"><img${add_attribute("src", image, 0)} loading="${"eager"}" alt="${"Demo avatar"}" class="${"rounded-box aspect-square h-[30vh]"}">
			</div>`;
  })}</div></div>
<div class="${"marquee marquee--reverse w-full -mt-4 svelte-rlmcj5"}"><div class="${"carousel carousel-center p-4 space-x-4 bg-neutral marquee__group svelte-rlmcj5"}">${each(second, (image) => {
    return `<div class="${"carousel-item"}"><img${add_attribute("src", image, 0)} loading="${"eager"}" alt="${"Demo avatar"}" class="${"rounded-box aspect-square h-[30vh]"}">
			</div>`;
  })}</div></div>
<div class="${"prose px-2 lg:prose-xl text-center pt-16 min-w-full"}"><h2>How it works</h2>
	<ol class="${"max-w-xl mx-auto text-left"}"><li>💸 Make a payment with Stripe</li>
		<li>🔓 Activate your account using the confirmation link sent to your email</li>
		<li>📸 Upload your photos</li>
		<li>👩🏽‍🏫 Start the AI training process (this may take up to 24 hours)</li>
		<li>⚙️ Generate unlimited high-definition photos from a wide range of available themes</li></ol></div>

<div class="${"prose px-2 lg:prose-xl text-center pt-16 min-w-full"}"><h2>Who is behind this project?</h2>
	<p class="${"max-w-2xl mx-auto"}">I am the sole creator of this service. As an independent Developer, I own and operate all of my
		sites. Your data is safe with me as I have no outside influence or agendas. Trust in the quality
		and care put into this service.
	</p></div>

<div class="${"prose px-2 lg:prose-xl text-center py-16 min-w-full"}"><h2 class="${"max-w-2xl mx-auto"}">Build a unique and personalized <span class="${"text-gradient"}">Avatar</span> with the help of AI
	</h2>
	<div class="${"gap-4"}">${validate_component(Button, "Button").$$render(
    $$result,
    {
      type: "button",
      link: "/checkout",
      gradient: true,
      endIcon: "arrow_right"
    },
    {},
    {
      default: () => {
        return `Start now`;
      }
    }
  )}
		${validate_component(Button, "Button").$$render(
    $$result,
    {
      type: "button",
      link: "/login",
      ghost: true
    },
    {},
    {
      default: () => {
        return `Login`;
      }
    }
  )}</div>
</div>`;
});
export {
  Page as default
};
