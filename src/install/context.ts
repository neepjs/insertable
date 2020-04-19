import { Context } from '@neep/core';

export default function contextConstructor(context: Context) {
	Reflect.defineProperty(context, 'insertable', {
		value: context.delivered.__NeepInsertable__,
		enumerable: true,
		configurable: true,
	});
}
