import { useState } from "react";
import { useSelector } from "react-redux";

import { selectFormData } from "../../store/hotels.slice";

import dateFormatChanger from "../../utils/dateFormatChanger";

import { Heart } from "../heart/heart.component";

import { ReactComponent as House } from "../../assets/SVG/house.svg";
import { ReactComponent as Round } from "../../assets/SVG/round.svg";
import { ReactComponent as Star } from "../../assets/SVG/star.svg";

import cn from "classnames";
import "./hotel-info.styles.scss";

export const HotelInfo = ({ name, price, stars, id, favorite, type }) => {
  const [starsArray, setStarsArray] = useState(new Array(5).fill(<></>));

  const { checkIn, checkOut } = useSelector(selectFormData);
  return (
    <div className="hotel-info-container">
      <div className="main">
        {type === "all" && (
          <div className="pic-container">
            <Round />
            <House className="house" />
          </div>
        )}

        <div className="info">
          <h5 className="header">{name}</h5>
          <p className="date">
            <span>{dateFormatChanger(checkIn)}</span>
            <span>-</span>
            <span>{checkOut} день</span>
          </p>
          <div className="rating">
            {starsArray.map((star, i) => (
              <Star
                key={i}
                className={cn("star", {
                  ["filled"]: i < stars,
                })}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="price-container">
        <Heart id={id} favorite={favorite} />
        <p className="price">
          Price:
          <span className="count">
            {Math.round(price).toLocaleString("ru")}₽
          </span>
        </p>
      </div>
    </div>
  );
};
