export { default } from './Insertable';
export { version } from './constants';
export { default as install, withInsertable } from './install';
export { default as InsertView, default as View } from './InsertView';

import InsertView from './InsertView';
declare global {
	namespace JSX {
		interface IntrinsicElements {
			'InsertView': InsertView.Props;
			'insert-view': InsertView.Props;
		}
	}
}
