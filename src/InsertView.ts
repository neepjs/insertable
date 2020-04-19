import Insertable from './Insertable';
import { mSimple, mName, Context, Auxiliary } from '@neep/core';

export interface Props {
	name?: string;
	insertable?: Insertable;
	[key: string]: any;
}
export default function InsertView(
	props: Props,
	{ insertable: contextInsertable, childNodes }: Context,
	{ createElement, Deliver }: Auxiliary,
) {
	const { name, insertable } = props;
	if (!name && insertable instanceof Insertable) {
		return createElement(Deliver, {
			__NeepInsertable__: insertable,
		}, ...childNodes);
	}
	if (!name) { return childNodes; }
	if (insertable instanceof Insertable) {
		const list = insertable.get(name);
		if (!list) { return null; }
		return createElement(Deliver, {
			__NeepInsertable__: insertable,
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
