import Neep from '@neep/core';
import { createDeliverComponent } from './neep';
import Insertable from '../Insertable';

export let InsertableDeliver: Neep.DeliverComponent<Insertable | undefined>;

export default function initDelivers() {
	InsertableDeliver = createDeliverComponent<Insertable>();
}
