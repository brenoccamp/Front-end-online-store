export async function getCategories() {
  const FETCH_CATEGORIES = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const REQUEST_JSON = await FETCH_CATEGORIES.json();
  return REQUEST_JSON;
}
export async function getProductsFromCategoryAndQuery(categoryId, query, id) {
  if (categoryId) {
    // query = false;
    const FETCH_PRODUCTS = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`);
    const PRODUCT_JSON = await FETCH_PRODUCTS.json();
    return PRODUCT_JSON;
  }
  if (id) {
    const FETCH_ITEM = await fetch(`https://api.mercadolibre.com/items/${id}`);
    const ITEM_JSON = await FETCH_ITEM.json();
    return ITEM_JSON;
  }
  const FETCH_PRODUCTS = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
  const PRODUCT_JSON = await FETCH_PRODUCTS.json();
  return PRODUCT_JSON;
}
