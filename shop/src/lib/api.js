/**
 * Types:
 *
 * Product = {
 *  id: string,
 *  category: string,
 *  image: string,
 *  title: string,
 *  price: number,
 *  comment?: string,
 * }
 *
 * Cart = Array<{ product: Product, qty: number }>
 */

////////////////
// PUBLIC API //
////////////////

/**
 * @return Promise<Array<string>>
 */
export const getCategories = async () => {
  await lag();
  return [...new Set(products.map(p => p.category))];
};

/**
 * @param {string} category
 * @return Promise<Array<Product>>
 */
export const getProducts = async category => {
  await lag();
  return products.filter(p => p.category === category);
};

/**
 * @return Promise<Cart>
 */
export const getCart = async () => {
  if (typeof window === "undefined" || !window.localStorage) {
    // Server-side? Ignore
    return [];
  }

  await lag();
  const data = loadCartData();
  return (
    data
      // Convert from [id, qty] to {product, qty}
      .map(([id, qty]) => ({
        product: products.find(p => p.id === id),
        qty
      }))
      // Exclude non-existing products
      .filter(row => !!row.product)
  );
};

/**
 * @param Product product
 * @param number qty
 * @return Promise<Cart>
 */
export const addToCart = async (productId, qty = 1) => {
  if (typeof window === "undefined" || !window.localStorage) {
    // Server-side? Ignore
    return [];
  }

  let data = loadCartData();
  let found = data.find(([id]) => id === productId);
  if (found) {
    found[1] += qty;
    if (found[1] <= 0) {
      // negative quantity: remove from cart
      data = data.filter(row => row !== found);
    }
  } else {
    data.push([productId, qty]);
  }

  saveCartData(data);

  return getCart();
};

//////////////
// PRIVATES //
//////////////

/**
 * Products database
 */
const products = [
  {
    id: "f7ebb06d-005e-473b-ae3f-fa0b677086d5",
    category: "kitten",
    image: "http://placekitten.com/200/200?image=1",
    title: "First kitten",
    price: 30
  },
  {
    id: "f29bfb53-c101-44f9-9f68-9bce0a785bab",
    category: "kitten",
    image: "http://placekitten.com/200/200?image=2",
    title: "Second kitten",
    price: 50
  },
  {
    id: "d8f58d83-2331-41ed-9bf8-6152138941c4",
    category: "kitten",
    image: "http://placekitten.com/200/200?image=3",
    title: "Third kitten",
    price: 4000
  },
  {
    id: "81823788-dca6-4e9d-92f3-faa3446baa2f",
    category: "kitten",
    image: "http://placekitten.com/200/200?image=4",
    title: "Fourth kitten",
    price: 10
  },
  {
    id: "fa75b33a-67e5-4618-84a6-f7b8467ec790",
    category: "kitten",
    image: "http://placekitten.com/200/200?image=5",
    title: "Fifth kitten",
    price: 200
  },
  {
    id: "c0f537d7-1610-457c-89ce-86c6e07fb708",
    category: "kitten",
    image: "http://placekitten.com/200/200?image=6",
    title: "Sixth kitten",
    price: 100
  },
  {
    id: "9213b67c-a513-4043-aac4-a9b99405f599",
    category: "doggo",
    image:
      "https://steamuserimages-a.akamaihd.net/ugc/168157445636207244/C7BFD071BFF3D9CA14E38C7E29EE2D399BF64AE5/",
    title: "Swimming Doggo",
    price: 899
  },
  {
    id: "2e81b291-660d-475f-ac2f-55ef3d43057f",
    category: "doggo",
    image:
      "https://pbs.twimg.com/profile_images/775392995805835264/POFd8zgX_400x400.jpg",
    title: "Diving Doggo",
    price: 899
  },
  {
    id: "6bde7b9f-c605-4fd0-a275-870f3769e14c",
    category: "doggo",
    image:
      "https://i.pinimg.com/736x/72/ff/72/72ff721662bfec536762cc2d7c925b46.jpg",
    title: "Winking Doggo",
    price: 999
  },
  {
    id: "cbb2023e-0a38-4375-8530-acbc7c078b49",
    category: "doggo",
    image:
      "https://pics.me.me/thumb_sea-camera-stretchy-chubb-doggo-twat-dankmemes-dancemoms-dancemoms2-emo-2434251.png",
    title: "Trying Doggo",
    price: 899
  },
  {
    id: "4e2d8d67-9ab1-43ad-ac14-a96c31d3b926",
    category: "doggo",
    image:
      "https://pics.me.me/thumb_sea-camera-stretchy-chubb-doggo-twat-dankmemes-dancemoms-dancemoms2-emo-2434251.png",
    title: "Cocky Doggo",
    price: 899
  },
  {
    id: "5177ce14-61d3-450d-8650-b9a9c555a604",
    category: "doggo",
    image:
      "https://steamuserimages-a.akamaihd.net/ugc/158027122741764361/88B4ADCE427803C8BBE6016169CA0F4349D1A70F/?imw=200&imh=200&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
    title: "Weirdo Doggo",
    price: 499
  },
  {
    id: "40c9667b-f8c5-4357-8c61-824f8756badb",
    category: "bear",
    image:
      "https://www.gannett-cdn.com/-mm-/72cbef2ace1265eb70a0d046e9dcfc749e99566c/c=200-0-800-600/local/-/media/2018/08/10/USATODAY/usatsports/grizzly-bear.jpg?width=200&height=200&fit=crop",
    title: "Basic Bear",
    price: 9999
  },
  {
    id: "6681f378-90fc-42c0-a0c7-5c9a7dbcf424",
    category: "bear",
    image:
      "https://image.shutterstock.com/image-photo/angry-grizzly-bear-260nw-590795585.jpg",
    title: "Last Bear you’ll see",
    price: 14385
  },
  {
    id: "9d0b42fe-44d7-44df-aa20-83195219d1ee",
    category: "bear",
    image:
      "https://investorplace.com/wp-content/uploads/2014/09/bear-market-corrections.jpg",
    title: "Sleeping Bear",
    price: 8995
  },
  {
    id: "f2d294bb-81f2-49a2-b89f-90263b85fdee",
    category: "bear",
    image:
      "https://www.zoo-mulhouse.com/wp-content/uploads/2018/04/ours-polaire-200x200.jpg",
    title: "Polar Bear",
    price: 12345
  }
];

/**
 * Resolves within a random delay
 *
 * @return Promise<?>
 */
const lag = (min = 0, max = 1000) =>
  new Promise(resolve =>
    setTimeout(resolve, min + Math.random() * (max - min))
  );

/**
 * @return Array<[productId, qty]>
 */
const loadCartData = () => {
  if (typeof window === "undefined" || !window.localStorage) {
    // Server-side? Ignore
    return [];
  }

  return JSON.parse(window.localStorage.getItem("cart") || "[]");
};

/**
 * @param Array<[productId, qty]> data
 */
const saveCartData = data => {
  if (typeof window === "undefined" || !window.localStorage) {
    // Server-side? Ignore
    return;
  }

  window.localStorage.setItem("cart", JSON.stringify(data));
};
