import InsertView from '../InsertView';
import { register } from './neep';

export default function installComponents() {
	register('InsertView', InsertView);
	register('insert-view', InsertView);
}
