import { Context } from '@neep/core';
import { addContextConstructor } from './neep';
import { InsertableDeliver } from './initDelivers';

function contextConstructor(context: Context) {
	Reflect.defineProperty(context, 'insertable', {
		value: context.delivered(InsertableDeliver),
		enumerable: true,
		configurable: true,
	});
}

export default function installContextConstructor() {
	addContextConstructor(contextConstructor);
}
