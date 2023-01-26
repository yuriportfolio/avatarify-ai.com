export function getLimitedQuantity(quantity: number, counter: number) {
	if (quantity > counter) {
		quantity = counter;
	}
	if (quantity > 20) {
		quantity = 20;
	}
	if (quantity < 0) {
		quantity = 0;
	}
	return quantity;
}
