import Insertable from '.';
declare module '@neep/core' {
	interface Context {
		readonly insertable?: Insertable;
	}
	interface Delivered {
		readonly __NeepInsertable__?: Insertable;
	}
}
