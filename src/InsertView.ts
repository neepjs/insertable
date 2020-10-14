import Insertable from './Insertable';
import { mSimple, mName, Context } from '@neep/core';
import { createElement } from './install/neep';
import { InsertableDeliver } from './install/initDelivers';

export interface Props {
	name?: string;
	insertable?: Insertable;
	[key: string]: any;
}
export default function InsertView(
	props: Props,
	{ insertable: contextInsertable, childNodes }: Context,
) {
	const { name, insertable } = props;
	if (!name && insertable instanceof Insertable) {
		return createElement(InsertableDeliver, {
			value: insertable,
		}, ...childNodes);
	}
	if (!name) { return childNodes; }
	if (insertable instanceof Insertable) {
		const list = insertable.get(name);
		if (!list) { return null; }
		return createElement(InsertableDeliver, {
			value: insertable,
		}, list.map(t => createElement(t.component, props, ...childNodes)));
	}
	if (!(contextInsertable instanceof Insertable)) {
		return childNodes;
	}
	const list = contextInsertable.get(name);
	if (!list) { return null; }
	return list.map(t => createElement(t.component, props, ...childNodes));
}

mSimple(InsertView);
mName('InsertView', InsertView);
