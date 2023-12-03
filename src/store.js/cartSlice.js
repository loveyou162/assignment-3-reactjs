import { createSlice } from "@reduxjs/toolkit";

function updateTotalAmount(state) {
  state.totalAmount = state.items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
  localStorage.setItem("totalAmount", JSON.stringify(state.totalAmount));
}

const updateLocalStorage = (items) => {
  localStorage.setItem("cartItem", JSON.stringify(items));
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
    cartItemData: JSON.parse(localStorage.getItem("cartItem")) || [],
  },
  reducers: {
    updateCart(state, action) {
      const { totalQuantity, items } = action.payload;
      state.totalQuantity = totalQuantity;
      state.items = items;
      updateLocalStorage(items);
      updateTotalAmount(state);
    },
    addCart(state, action) {
      const itemId = action.payload;
      console.log(itemId);
      const existingItem = state.items.find((item) => item.id === itemId);
      console.log(existingItem);
      state.totalQuantity++;
      //nếu sản phẩm chưa tồn tại trong giỏ hàng , thêm sản phẩm mới vào
      if (!existingItem) {
        state.items.push({
          id: itemId,
          image: itemId.image,
          product: itemId.product,
          price: 1,
          quantity: itemId.quantity,
          total: itemId.price,
        });
      } else {
        //nếu sản phẩm đã tồn tại tăng số lượng và cập nhật tổng giá tiền
        existingItem.quantity++;
        existingItem.total = existingItem.total + itemId.price;
      }
      updateTotalAmount(state);
      updateLocalStorage(state.items);
    },
    decrement(state, action) {
      const itemId = action.payload;
      const existingItem = state.items.find((item) => item.id === itemId);
      // giảm tổng số lượng trong giỏ hàng
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== itemId);
      } else {
        existingItem.quantity--;
        existingItem.total -= existingItem.price;
      }
      updateTotalAmount(state);
      updateLocalStorage(state.items);
    },
    remove_cart(state, action) {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
      updateTotalAmount(state);
      updateLocalStorage(state.items);
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
