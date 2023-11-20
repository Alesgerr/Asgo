import { createSlice } from "@reduxjs/toolkit";

const initialCartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const initialState = {
  cartItems: initialCartItems,
  totalAmount: calculateTotalAmount(initialCartItems),
  totalQuantity: calculateTotalQuantity(initialCartItems),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === newItem.id);

      if (!existingItem) {
        state.cartItems.push({
          id: newItem.id,
          title: newItem.title,
          image: newItem.images,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
        state.totalQuantity++;
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }
      state.totalAmount = calculateTotalAmount(state.cartItems);
      state.totalQuantity = calculateTotalQuantity(state.cartItems);

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    incrementItem: (state, action) => {
      const itemId = action.payload;
      const itemToIncrement = state.cartItems.find((item) => item.id === itemId);
      if (itemToIncrement) {
        itemToIncrement.quantity++;
        itemToIncrement.totalPrice += itemToIncrement.price;
        state.totalAmount = calculateTotalAmount(state.cartItems);
        state.totalQuantity = calculateTotalQuantity(state.cartItems);
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
    decrementItem: (state, action) => {
      const itemId = action.payload;
      const itemToDecrement = state.cartItems.find((item) => item.id === itemId);
      if (itemToDecrement) {
        if (itemToDecrement.quantity > 1) {
          itemToDecrement.quantity--;
          itemToDecrement.totalPrice -= itemToDecrement.price;
        } else {
          // Eğer miktar 1'den küçükse, öğeyi kaldır
          state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
        }
        state.totalAmount = calculateTotalAmount(state.cartItems);
        state.totalQuantity = calculateTotalQuantity(state.cartItems);
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
      state.totalAmount = calculateTotalAmount(state.cartItems);
      state.totalQuantity = calculateTotalQuantity(state.cartItems);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;

function calculateTotalAmount(cartItems) {
  return cartItems.reduce((total, item) => {
    const price = parseFloat(item.price);
    const quantity = parseInt(item.quantity);
    if (!isNaN(price) && !isNaN(quantity)) {
      return total + price * quantity;
    } else {
      console.error(`Invalid price or quantity for item with ID: ${item.id}`);
      return total;
    }
  }, 0);
}

function calculateTotalQuantity(cartItems) {
  return cartItems.reduce((total, item) => total + item.quantity, 0);
}
