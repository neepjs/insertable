import { createWith, withDelivered } from './neep';
import { InsertableDeliver } from './initDelivers';
import Insertable from '../Insertable';


export let withInsertable: (() => Insertable | undefined);
export default function initWith() {
	withInsertable = createWith({
		name: 'withInsertable',
		create() {
			return withDelivered(InsertableDeliver);
		},
	});
}
