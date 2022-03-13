export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const removeItemFromCart = (cartItems, cartItemIdToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemIdToRemove
  );

  if (existingCartItem) {
    if (existingCartItem.quantity === 1) {
      return cartItems.filter((cartItem) => cartItem.id !== cartItemIdToRemove);
    }

    return cartItems.map((cartItem) =>
      cartItem.id === cartItemIdToRemove && cartItem.quantity > 1
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  }

  return [...cartItems];
};

export const deleteItemFromCart = (cartItems, cartItemIdToDelete) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemIdToDelete);
};
