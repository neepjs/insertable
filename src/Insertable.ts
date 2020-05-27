import { Component, mName, mSimple } from '@neep/core';
import install from './install';
import { encase } from './install/neep';
import InsertView from './InsertView';

export type InsertableComponent = string | Component<any, any>;
export interface Info {
	component: InsertableComponent;
	order?: number;
}
export type Item = [InsertableComponent, Info];

class Insertable {
	readonly parent?: Insertable;
	private _groups: {[key: string]: Readonly<Info>[]} = encase(Object.create(null));
	constructor(parent?: Insertable) {
		if (parent instanceof Insertable) {
			this.parent = parent;
		}
	}
	add(
		name: string,
		components: InsertableComponent | InsertableComponent[],
		info: Omit<Info, 'component'> | number = {},
	) {
		if (typeof info === 'number') { info = { order: info }; }
		const groups = this._groups;
		if (!Array.isArray(components)) { components = [components]; }
		const list = groups[name] ? [...groups[name]] : [];
		list.push(...components.map(component => Object.freeze({
			...info as Omit<Info, 'component'>,
			component,
		}) as Info));
		list.sort(({order: a}, {order: b}) => (a || 0) - (b || 0));
		groups[name] = list;
	}
	remove(name: string): void;
	remove(
		name: string,
		component?: InsertableComponent,
	): void {
		const groups = this._groups;
		const oldList = groups[name];
		if (!oldList) { return; }
		if (!component) {
			groups[name] = [];
			return;
		}
		const k = oldList.findIndex((t) => t.component === component);
		if (k < 0) { return; }
		const list = [...oldList.slice(0, k), ...oldList.slice(k + 1)];
		groups[name] = list;
	}
	set(
		name: string,
		components: InsertableComponent | InsertableComponent[],
		info: Omit<Info, 'component'> | number = {},
	) {
		if (typeof info === 'number') { info = { order: info }; }
		const groups = this._groups;
		if (!Array.isArray(components)) { components = [components]; }
		const list = components.map(component => Object.freeze({
			...info as Omit<Info, 'component'>,
			component,
		}) as Info);
		groups[name] = list;
	}
	get(name: string, parent?: boolean | number): Readonly<Info>[] {
		const groups = this._groups;
		const list = groups[name] || [];
		if (!parent || !this.parent) { return [...list]; }
		const parentList = this.parent.get(
			name,
			typeof parent === 'number' ? parent - 1 : -1,
		);
		const allList = [...parentList, ...list];
		if (list.length && parentList.length) {
			allList.sort(({order: a}, {order: b}) => (a || 0) - (b || 0));
		}
		return allList;
	}
	get view() {
		const view: Component = (props: {
			name?: string;
			[key: string]: any;
		}, ...p) =>
		InsertView({...props, insertable: this}, ...p);
		mName('Insertable', view);
		mSimple(view);
		Reflect.defineProperty(this, 'view', {
			value: view,
			enumerable: true,
			configurable: true,
		});
		return view;
	}
	static get install() { return install; };
	static get View() { return InsertView; };
	static readonly version = '__VERSION__';
}
export default Insertable;
