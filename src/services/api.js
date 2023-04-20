export async function getCategories() {
  const response = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const categories = await response.json();
  return categories;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  const products = await response.json();
  return products;
}

export async function getProductById(productId) {
  const response = await fetch(`https://api.mercadolibre.com/items/${productId}`);
  const products = await response.json();
  return products;
}

export async function getProductsByTerm(term) {
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${term}}`);
  const data = await response.json();
  const products = data.results;
  return products;
}

export async function getProductsByCategory(categoryId) {
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`);
  const data = await response.json();
  const categoryItems = data.results;
  return categoryItems;
}
