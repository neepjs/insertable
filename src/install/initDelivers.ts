import { Deliver } from '@neep/core';
import { createDeliver } from './neep';
import Insertable from '../Insertable';

export let InsertableDeliver: Deliver<Insertable | undefined>;

export default function initDelivers() {
	InsertableDeliver = createDeliver<Insertable>();
}
