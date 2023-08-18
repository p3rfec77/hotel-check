import { useSelector } from "react-redux";

import dateFormatChanger from "../../utils/dateFormatChanger";
import {
  selectFormData,
  selectHotels,
  selectFavorites,
  selectIsLoading,
} from "../../store/hotels.slice";

import { HotelsSlider } from "../hotels-slider/hotels-slider.component";
import { HotelInfo } from "../hotel-info/hotel-info.component";

import { TailSpin } from "react-loader-spinner";

import { ReactComponent as Arrow } from "../../assets/SVG/arrow.svg";
import "./hotels-list.styles.scss";

export const HotelsList = () => {
  const { location, checkIn } = useSelector(selectFormData);
  const hotels = useSelector(selectHotels);
  const favorites = useSelector(selectFavorites);
  const isLoading = useSelector(selectIsLoading);

  return (
    <div className="hotels-list-wrapper">
      <div className="hotels-list-header">
        <h3 className="city-title">
          Отели
          <Arrow className="arrow" />
          {location}
        </h3>
        <p className="check-in-date">{dateFormatChanger(checkIn)}</p>
      </div>
      <HotelsSlider />

      <p className="favourites-counter">
        Добавлено в Избранное:
        <span className="count">{favorites.length}</span>
        отеля
      </p>

      <div className="hotels-info-container">
        {isLoading ? (
          <div className="spinner">
            <TailSpin
              wrapperClass="spinner"
              width={80}
              height={80}
              color="#000"
            />
          </div>
        ) : (
          hotels.map(({ hotelId, hotelName, priceAvg, stars, favorite }) => (
            <HotelInfo
              key={hotelId}
              name={hotelName}
              price={priceAvg}
              stars={stars}
              id={hotelId}
              favorite={favorite}
              type={"all"}
            />
          ))
        )}
      </div>
    </div>
  );
};
