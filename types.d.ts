/*!
 * NeepInsertable v0.1.0-alpha.0
 * (c) 2020 Fierflame
 * @license MIT
 */
import * as _mp_rt1__neep_core__ from '@neep/core';
import { Component, Context, Auxiliary, NeepElement } from '@neep/core';

declare function install(Neep: typeof _mp_rt1__neep_core__): void;

declare type InsertableComponent = string | Component<any, any>;
interface Info {
    component: InsertableComponent;
    order?: number;
}
declare class Insertable {
    readonly parent?: Insertable;
    private _groups;
    constructor(parent?: Insertable);
    add(name: string, components: InsertableComponent | InsertableComponent[], info?: Omit<Info, 'component'> | number): void;
    remove(name: string): void;
    set(name: string, components: InsertableComponent | InsertableComponent[], info?: Omit<Info, 'component'> | number): void;
    get(name: string, parent?: boolean | number): Readonly<Info>[];
    get view(): Component<object, object>;
    static get install(): typeof install;
    static get View(): typeof InsertView;
    static readonly version = "__VERSION__";
}

interface Props {
    name?: string;
    insertable?: Insertable;
    [key: string]: any;
}
declare function InsertView(props: Props, { insertable: contextInsertable, childNodes }: Context, { createElement, Deliver }: Auxiliary): any[] | NeepElement | null;

declare module '@neep/core' {
	interface Context {
		readonly insertable?: Insertable;
	}
	interface Delivered {
		readonly __NeepInsertable__?: Insertable;
	}
}

declare global {
	namespace JSX {
		interface IntrinsicElements {
			'InsertView': Props;
			'insert-view': Props;
		}
	}
}

export default Insertable;
