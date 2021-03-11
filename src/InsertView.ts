import Insertable from './Insertable';
import Neep from '@neep/core';
import {
	createElement,
	createTemplateElement,
	createShellComponent,
} from './install/neep';
import { InsertableDeliver } from './install/initDelivers';
import { withInsertable } from './install';

export function InsertViewFn(
	props: InsertView.Props,
	{ childNodes }: Neep.ShellContext<any>
): Neep.Node {
	const { name } = props;
	if (typeof name !== 'string') {
		const { insertable } = props;
		if (insertable instanceof Insertable) {
			return createElement(InsertableDeliver, {
				value: insertable,
			}, ...childNodes());
		}
		return createTemplateElement(childNodes());
	}
	const { insertable } = props;
	if (insertable instanceof Insertable) {
		const list = insertable.get(name);
		if (!list) { return null; }
		return createElement(InsertableDeliver, {
			value: insertable,
		}, list.map(t => createElement(t.component, props, ...childNodes())));
	}
	const contextInsertable = withInsertable();
	if (!contextInsertable) {
		return createTemplateElement(childNodes);
	}
	const list = contextInsertable.get(name);
	if (!list) { return null; }
	return createTemplateElement(list.map(t => createElement(t.component, props, ...childNodes())));
}
declare namespace InsertView {
	export interface Props {
		name?: string;
		insertable?: Insertable;
		[key: string]: any;
	}

}
let InsertView: Neep.ShellComponent<InsertView.Props, any>;
export function initComponents() {
	InsertView = createShellComponent<any, any>(InsertViewFn, { name: 'InsertView'});
}
export {
	InsertView as default,
};
