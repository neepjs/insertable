import Insertable from './Insertable';
import { mark, mName, Context, Auxiliary } from '@neep/core';

function InsertView(
	props: { name: string; },
	{ insertable, childNodes }: Context,
	{ createElement }: Auxiliary,
) {
	if (!insertable){ return null; }
	const { name } = props;
	const list = (insertable as any as Insertable).get(name);
	if (!list) { return []; }
	return list.map(t => createElement(t.component, props, childNodes));
}

export default mark(InsertView, mName('InsertView'));
