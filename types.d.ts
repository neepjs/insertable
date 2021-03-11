/*!
 * NeepInsertable v0.1.0-alpha.3
 * (c) 2020-2021 Fierflame
 * @license MIT
 */
import * as Neep from '@neep/core';
import Neep$1 from '@neep/core';

declare function install(Neep: typeof Neep): void;

declare let withInsertable: (() => Insertable | undefined);

declare namespace InsertView {
    interface Props {
        name?: string;
        insertable?: Insertable;
        [key: string]: any;
    }
}
declare let InsertView: Neep$1.ShellComponent<InsertView.Props, any>;

declare type InsertableComponent = string | Neep$1.Component<any>;
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
    get view(): Neep$1.ShellComponent<InsertView.Props, any>;
    static get install(): typeof install;
    static get View(): Neep$1.ShellComponent<InsertView.Props, any>;
    static get version(): string;
}

declare const version: string;

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'InsertView': InsertView.Props;
            'insert-view': InsertView.Props;
        }
    }
}

export default Insertable;
export { InsertView, InsertView as View, install, version, withInsertable };
