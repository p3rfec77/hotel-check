import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { selectUser } from "../../store/user.slice";
import {
  selectFormData,
  selectError,
  fetchHotelsAsync,
} from "../../store/hotels.slice";

import {
  HotelsHeader,
  HotelsList,
  SearchForm,
  FavoritesList,
} from "../../components";

import "./hotels.styles.scss";

export const Hotels = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectUser);
  const formData = useSelector(selectFormData);
  const error = useSelector(selectError);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/Auth");
    } else {
      dispatch(fetchHotelsAsync(formData));
    }
  }, []);

  return (
    <section className="hotels-container">
      <HotelsHeader />
      {error ? (
        <p className="error">Кажется что-то пошло не так...</p>
      ) : (
        <main className="hotels-main">
          <SearchForm />
          <HotelsList />
          <FavoritesList />
        </main>
      )}
    </section>
  );
};
