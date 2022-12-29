import { c as create_ssr_component, f as compute_rest_props, d as add_attribute, e as escape, h as spread, i as escape_attribute_value, j as escape_object, v as validate_component } from "./index.js";
import cn from "classnames";
import { B as Button } from "./Button.js";
const Input = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "id",
    "label",
    "input",
    "value",
    "type",
    "inputClass",
    "containerClass",
    "labelButton",
    "block"
  ]);
  let { id } = $$props;
  let { label } = $$props;
  let { input = void 0 } = $$props;
  let { value = void 0 } = $$props;
  let { type = "text" } = $$props;
  let { inputClass = "" } = $$props;
  let { containerClass = "" } = $$props;
  let { labelButton = void 0 } = $$props;
  let { block = false } = $$props;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.input === void 0 && $$bindings.input && input !== void 0)
    $$bindings.input(input);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.inputClass === void 0 && $$bindings.inputClass && inputClass !== void 0)
    $$bindings.inputClass(inputClass);
  if ($$props.containerClass === void 0 && $$bindings.containerClass && containerClass !== void 0)
    $$bindings.containerClass(containerClass);
  if ($$props.labelButton === void 0 && $$bindings.labelButton && labelButton !== void 0)
    $$bindings.labelButton(labelButton);
  if ($$props.block === void 0 && $$bindings.block && block !== void 0)
    $$bindings.block(block);
  {
    {
      if (input && value && type !== "file") {
        input.value = value;
      }
    }
  }
  return `<div${add_attribute("class", cn("form-control w-full", containerClass), 0)}><label class="${"label"}"${add_attribute("for", id, 0)}><span class="${"label-text text-inherit"}">${escape(label)}</span></label>

	<div class="${"relative"}"><input${spread(
    [
      { id: escape_attribute_value(id) },
      { type: escape_attribute_value(type) },
      {
        class: escape_attribute_value(cn(
          " w-full",
          {
            "file-input file-input-bordered": type == "file",
            "input input-bordered": type != "file",
            "max-w-xs": !block
          },
          inputClass
        ))
      },
      escape_object($$restProps)
    ],
    {}
  )}${add_attribute("this", input, 0)}>
		${labelButton ? `${validate_component(Button, "Button").$$render(
    $$result,
    {
      class: "absolute top-0 right-0 rounded-l-none",
      primary: true
    },
    {},
    {
      default: () => {
        return `${escape(labelButton)}`;
      }
    }
  )}` : ``}</div></div>`;
});
export {
  Input as I
};
