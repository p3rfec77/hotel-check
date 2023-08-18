import { useSelector, useDispatch } from "react-redux";

import { selectHotels, changeFavorites } from "../../store/hotels.slice";

import { ReactComponent as HeartIcon } from "../../assets/SVG/heart.svg";

import cn from "classnames";
import "./heart.styles.scss";

export const Heart = ({ id, favorite }) => {
  const dispatch = useDispatch();
  const hotels = useSelector(selectHotels);
  const addFavorites = (id) => dispatch(changeFavorites({ id }));
  return (
    <>
      <HeartIcon
        onClick={() => addFavorites(id)}
        className={cn("heart", { ["favorite"]: favorite })}
      />
    </>
  );
};
