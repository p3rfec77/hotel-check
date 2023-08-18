import { format, parse } from "date-fns";
import { ru } from "date-fns/locale";

const parserOfDates = (date) => parse(date, "yyyy-MM-dd", new Date());

const dateFormatChanger = (date) =>
  format(parserOfDates(date), "dd MMMM yyyy", { locale: ru });

export default dateFormatChanger;
