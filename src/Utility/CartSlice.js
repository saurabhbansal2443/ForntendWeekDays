import { createSlice } from "@reduxjs/toolkit";
let cart = createSlice({
  name: "cart",
  initialState: {
    items: [],
    ids: [],
    totalProducts: 0,
    totalPrice: 0,
  },
  reducers: {
    addCart: (state, action) => {
      let obj = action.payload;
      let objId = obj.id;

      state.totalProducts = state.totalProducts + 1;
      state.totalPrice = state.totalPrice + obj.price;

      let cartObj = { obj: obj, quantity: 1 };

      let presentObj = state.items.find((ele) => ele.obj.id == objId);

      if (presentObj) {
        presentObj.quantity = presentObj.quantity + 1;
      } else {
        state.ids.push(objId);
        state.items.push(cartObj);
      }
    },
    removeCart: (state, action) => {
      let id = action.payload;

      state.totalProducts = state.totalProducts - 1;

      let price = state.items.find((cartObj) => cartObj.obj.id == id).obj.price;
      state.totalPrice = state.totalPrice - price;

      state.items = state.items.filter((cartObj) => {
        return cartObj.obj.id != id;
      });

      state.ids = state.ids.filter((objid) => {
        return objid != id;
      });
    },
    clearCart: (state) => {
      state.items.length = 0;
      state.ids.length = 0;
      state.totalProducts = 0;
      state.totalPrice = 0;
    },
    incQuantity: (state, action) => {
      let objId = action.payload;
      let presentObj = state.items.find((ele) => ele.obj.id == objId);
      presentObj.quantity = presentObj.quantity + 1;
      state.totalProducts = state.totalProducts + 1;
      state.totalPrice = state.totalPrice + presentObj.obj.price;
    },
    decQuantity: (state, action) => {
      let objId = action.payload;
      let presentObj = state.items.find((ele) => ele.obj.id == objId);
      presentObj.quantity = presentObj.quantity - 1;

      state.totalProducts = state.totalProducts - 1;
      state.totalPrice = state.totalPrice - presentObj.obj.price;

      if (presentObj.quantity == 0) {
        state.items = state.items.filter((cartObj) => cartObj.obj.id != objId);
        state.ids = state.ids.filter((id) => id != objId);
      }
    },
  },
});

export const { addCart, removeCart, clearCart, decQuantity, incQuantity } =
  cart.actions;

export default cart.reducer;
