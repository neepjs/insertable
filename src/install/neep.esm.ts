export let encase: typeof import ('@neep/core').encase;
export let register: typeof import ('@neep/core').register;
export let createElement: typeof import ('@neep/core').createElement;
export let createTemplateElement: typeof import ('@neep/core').createTemplateElement;
export let createDeliverComponent: typeof import ('@neep/core').createDeliverComponent;
export let createShellComponent: typeof import ('@neep/core').createShellComponent;
export let createWith: typeof import ('@neep/core').createWith;
export let withDelivered: typeof import ('@neep/core').withDelivered;

export default function installNeep(Neep: typeof import ('@neep/core')) {
	({
		encase,
		register,
		createElement,
		createTemplateElement,
		createDeliverComponent,
		createShellComponent,
		createWith,
		withDelivered,
	} = Neep);
}
