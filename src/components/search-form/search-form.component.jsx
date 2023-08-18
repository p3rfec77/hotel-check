import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { fetchHotelsAsync, selectFormData } from "../../store/hotels.slice";

import { Button } from "../button/button.component";
import { FormWrap } from "../form-wrap/form-wrap.component";

import "./search-form.styles.scss";

export const SearchForm = () => {
  const formData = useSelector(selectFormData);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: formData,
  });

  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(fetchHotelsAsync(data));
  };

  return (
    <FormWrap className="form-container-search">
      <form className="form" id="search-form" onSubmit={handleSubmit(onSubmit)}>
        <label className="form-label form-label-search">
          Локация
          <input
            className="form-input"
            {...register("location", { required: "Заполните поле" })}
          />
          {errors?.location && (
            <span className="error">{errors.location.message}</span>
          )}
        </label>

        <label className="form-label form-label-search">
          Дата заселения
          <input className="form-input" type="date" {...register("checkIn")} />
        </label>

        <label className="form-label form-label-search">
          Количество дней
          <input
            className="form-input"
            {...register("checkOut", { required: "Заполните поле" })}
          />
          {errors?.checkOut && (
            <span className="error">{errors.checkOut.message}</span>
          )}
        </label>
      </form>

      <Button type="submit" form="search-form">
        Найти
      </Button>
    </FormWrap>
  );
};
