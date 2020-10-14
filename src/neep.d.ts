import Insertable from '.';
import { Props } from './InsertView';
declare module '@neep/core' {
	interface Context {
		readonly insertable?: Insertable;
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
