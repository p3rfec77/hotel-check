import { useDispatch } from "react-redux";

import { filterFavorites } from "../../store/hotels.slice";

import { ReactComponent as SelectUp } from "../../assets/SVG/arrow-up.svg";
import { ReactComponent as SelectDown } from "../../assets/SVG/arrow-down.svg";

import cn from "classnames";
import "./filter.styles.scss";

export const Filter = ({ title, type, status, isActive }) => {
  const dispatch = useDispatch();
  const filterFavoritesHotels = (type) => dispatch(filterFavorites(type));
  return (
    <button
      onClick={() =>
        status === "low-first"
          ? filterFavoritesHotels({ type, status: "heigh-first" })
          : filterFavoritesHotels({ type, status: "low-first" })
      }
      className="filter"
    >
      <span>{title}</span>
      <div className="arrows-container">
        <SelectUp
          className={cn("arrow", {
            ["field"]: status === "heigh-first" && isActive,
          })}
        />
        <SelectDown
          className={cn("arrow", {
            ["field"]: status === "low-first" && isActive,
          })}
        />
      </div>
    </button>
  );
};
