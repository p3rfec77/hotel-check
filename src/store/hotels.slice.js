import { createSlice } from "@reduxjs/toolkit";
import { persistor } from "./store";

import { format, addDays } from "date-fns";

const initialState = {
  formData: {
    location: "Москва",
    checkIn: format(new Date(), "yyyy-MM-dd"),
    checkOut: "1",
  },
  hotels: [],
  favorites: [],
  pics: [
    { id: "1", img: "/hotels/hotel-1.jpg" },
    { id: "2", img: "/hotels/hotel-2.jpg" },
    { id: "3", img: "/hotels/hotel-3.jpg" },
    { id: "4", img: "/hotels/hotel-1.jpg" },
    { id: "5", img: "/hotels/hotel-2.jpg" },
    { id: "6", img: "/hotels/hotel-3.jpg" },
    { id: "7", img: "/hotels/hotel-1.jpg" },
    { id: "8", img: "/hotels/hotel-2.jpg" },
    { id: "9", img: "/hotels/hotel-3.jpg" },
  ],
  isLoading: false,
  error: null,
  ratingFilter: {
    type: "rating",
    status: "low-first",
    isActive: false,
  },
  priceFilter: {
    type: "price",
    status: "high-first",
    isActive: false,
  },
};

const hotelsSlice = createSlice({
  name: "hotels",
  initialState,
  reducers: {
    fetchHotelsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchHotelsSucess: (state, action) => {
      state.isLoading = false;
      state.hotels = action.payload.data;
      state.hotels.forEach((hotel) => (hotel.favorite = false));
    },
    fetchHotelsFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
    setFormData: (state, action) => {
      state.formData = action.payload.data;
    },
    changeFavorites: (state, action) => {
      const favoriteHotel = state.hotels.find(
        (hotel) => hotel.hotelId === action.payload.id
      );
      if (favoriteHotel) {
        if (favoriteHotel.favorite === false) {
          favoriteHotel.favorite = true;
          state.favorites.push(favoriteHotel);
        } else {
          const hotelForRemove = state.favorites.find(
            (fav) => fav.hotelId === favoriteHotel.hotelId
          );

          favoriteHotel.favorite = false;
          hotelForRemove.favorite = false;

          state.favorites = state.favorites.filter(
            (hotel) => hotel.favorite !== false
          );
        }
      } else {
        const hotelForRemove = state.favorites.find(
          (fav) => fav.hotelId === action.payload.id
        );

        hotelForRemove.favorite = false;
        state.favorites = state.favorites.filter(
          (hotel) => hotel.favorite !== false
        );
      }
    },
    updateFavorites: (state) => {
      state.hotels.forEach((hotel) => {
        state.favorites.forEach((fav) => {
          if (hotel.hotelId === fav.hotelId) {
            hotel.favorite = true;
            state.favorites = state.favorites.filter(
              (old) => old.hotelId !== hotel.hotelId
            );
            state.favorites.push(hotel);
          }
        });
      });
    },
    filterFavorites: (state, action) => {
      if (action.payload.type === "rating") {
        state.ratingFilter = action.payload;
      } else {
        state.priceFilter = action.payload;
      }

      const ByField = (fieldName, status) => (a, b) => {
        if (status === "low-first") {
          return a[fieldName] > b[fieldName] ? 1 : -1;
        } else {
          return a[fieldName] > b[fieldName] ? -1 : b > a ? 1 : 0;
        }
      };

      if (action.payload.type === "rating") {
        state.ratingFilter.isActive = true;
        state.priceFilter.isActive = false;
        state.favorites = state.favorites.sort(
          ByField("stars", action.payload.status)
        );
      } else {
        state.ratingFilter.isActive = false;
        state.priceFilter.isActive = true;
        state.favorites = state.favorites.sort(
          ByField("priceAvg", action.payload.status)
        );
      }
    },
    clearState: (state) => {
      state.formData = initialState.formData;
      state.favorites = initialState.favorites;
      state.hotels = initialState.hotels;
    },
  },
});

export const {
  fetchHotelsStart,
  fetchHotelsFail,
  fetchHotelsSucess,
  setFormData,
  changeFavorites,
  updateFavorites,
  clearState,
  filterFavorites,
} = hotelsSlice.actions;

export const fetchHotelsAsync = (data) => async (dispatch) => {
  dispatch(fetchHotelsStart());
  dispatch(setFormData({ data }));

  const url = new URL(
    `https://engine.hotellook.com/api/v2/cache.json?currency=rub&limit=15&lang=ru`
  );
  const params = url.searchParams;
  params.set("location", data.location);
  params.set("checkIn", data.checkIn);
  params.set(
    "checkOut",
    format(addDays(new Date(data.checkIn), Number(data.checkOut)), "yyyy-MM-dd")
  );

  const HOTELS_URL = url.toString();

  try {
    const response = await fetch(HOTELS_URL);
    const data = await response.json();

    dispatch(fetchHotelsSucess({ data }));
    dispatch(updateFavorites());
  } catch (error) {
    dispatch(fetchHotelsFail({ error }));
  }
};

export const selectFormData = (state) => state.hotels.formData;
export const selectIsLoading = (state) => state.hotels.isLoading;
export const selectError = (state) => state.hotels.error;
export const selectHotels = (state) => state.hotels.hotels;
export const selectFavorites = (state) => state.hotels.favorites;
export const selectPics = (state) => state.hotels.pics;
export const selectRatingFilter = (state) => state.hotels.ratingFilter;
export const selectPriceFilter = (state) => state.hotels.priceFilter;

export default hotelsSlice.reducer;
