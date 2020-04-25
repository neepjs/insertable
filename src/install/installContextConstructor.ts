import { Context } from '@neep/core';
import { addContextConstructor } from './neep';

function contextConstructor(context: Context) {
	Reflect.defineProperty(context, 'insertable', {
		value: context.delivered.__NeepInsertable__,
		enumerable: true,
		configurable: true,
	});
}

export default function installContextConstructor() {
	addContextConstructor(contextConstructor);
}
