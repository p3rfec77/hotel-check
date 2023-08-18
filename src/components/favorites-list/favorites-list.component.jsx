import { useSelector } from "react-redux";
import {
  selectFavorites,
  selectRatingFilter,
  selectPriceFilter,
  selectIsLoading,
} from "../../store/hotels.slice";

import { HotelInfo } from "../hotel-info/hotel-info.component";
import { Filter } from "../filter/filter.component";

import { TailSpin } from "react-loader-spinner";

import "./favorites-list.styles.scss";

export const FavoritesList = () => {
  const favorites = useSelector(selectFavorites);
  const ratingFilter = useSelector(selectRatingFilter);
  const priceFilter = useSelector(selectPriceFilter);
  const isLoading = useSelector(selectIsLoading);

  return (
    <div className="favorites-list-wrapper">
      <h5 className="favorites-title">Избранное</h5>
      <div className="filters">
        <Filter
          title={"Рейтинг"}
          type={ratingFilter.type}
          status={ratingFilter.status}
          isActive={ratingFilter.isActive}
        />
        <Filter
          title={"Цена"}
          type={priceFilter.type}
          status={priceFilter.status}
          isActive={priceFilter.isActive}
        />
      </div>
      <div className="container">
        {isLoading && favorites.length > 0 ? (
          <div className="spinner">
            <TailSpin
              wrapperClass="spinner"
              width={80}
              height={80}
              color="#000"
            />
          </div>
        ) : (
          favorites.map(({ hotelId, hotelName, priceAvg, stars, favorite }) => (
            <HotelInfo
              key={hotelId}
              name={hotelName}
              price={priceAvg}
              stars={stars}
              favorite={favorite}
              id={hotelId}
              type={"favorite"}
            />
          ))
        )}
      </div>
    </div>
  );
};
