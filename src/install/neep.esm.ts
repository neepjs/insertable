export let encase: typeof import ('@neep/core').encase;
export let register: typeof import ('@neep/core').register;
export let Error: typeof import ('@neep/core').Error;
export let createElement: typeof import ('@neep/core').createElement;
export let Deliver: typeof import ('@neep/core').Deliver;

export let addContextConstructor: typeof import ('@neep/core').addContextConstructor;
export default function installNeep(Neep: typeof import ('@neep/core')) {
	({
		encase,
		register,
		createElement,
		Deliver,
		addContextConstructor,
	} = Neep);
}
