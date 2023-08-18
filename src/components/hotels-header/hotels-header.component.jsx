import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logOut } from "../../store/user.slice";
import { clearState } from "../../store/hotels.slice";

import { ReactComponent as Logout } from "../../assets/SVG/logout.svg";

import "./hotels-header.styles.scss";

export const HotelsHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const backToAuth = () => {
    navigate("/Auth");
    dispatch(logOut());
    dispatch(clearState());
  };
  return (
    <header className="hotels-header">
      <h1 className="hotels-title">Simple Hotel Check</h1>
      <button className="logout-button" onClick={backToAuth}>
        Выйти
        <Logout className="logout-pic" />
      </button>
    </header>
  );
};
