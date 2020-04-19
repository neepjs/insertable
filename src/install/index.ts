import contextConstructor from './context';
import InsertView from '../InsertView';

export let Neep: typeof import('@neep/core');
export default function install(neep: typeof Neep) {
	Neep = neep;
	Neep.addContextConstructor(contextConstructor);
	Neep.register('InsertView', InsertView as any);
	Neep.register('insert-view', InsertView as any);
}
