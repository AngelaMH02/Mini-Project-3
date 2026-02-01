async function fetchProducts(limit = 10) {
  const response = await fetch(`https://dummyjson.com/products?limit=${limit}`);
  if (!response.ok) {
    throw new Error('Failed to fetch products from external API');
  }
  const data = await response.json();
  return data.products;
}

module.exports = { fetchProducts };
