// A mock function to mimic making an async request for data
export function fetchAllProducts(amount = 1) {
  // TODO: we will not hard-code server url here
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductsByFilter(filter, sort, pagination) {
  // TODO: on server we will support multiple values
  let queryString = "";

  // filters by categories and brands
  // filter = {"category": ["smartphones", "laptops", etc]};
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length > 0) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }

  // filter by sort (rating wise, ascending by price , descending by price)
  // sort = {_sort: "price", _order: "asc"};
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  // products per page
  // pagination = {_page: 1, _limit: 10};
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch(
      `http://localhost:8080/products?${queryString}`
    );
    const data = await response.json();
    const totalItems = await response.headers.get("X-Total-Count");
    resolve({ data: { products: data, totalItems } });
  });
}
