import Insertable from '.';
import { Props } from './InsertView';
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
