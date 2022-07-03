import { useState, useEffect } from "react";
import {
  format,
  subMonths,
  addMonths,
  subYears,
  addYears,
  isEqual,
  getDaysInMonth,
  getDay,
} from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

export function DatePicker({ placeholder, setDate, value }) {
  const DAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
  const [dayCount, setDayCount] = useState([]);
  const [blankDays, setBlankDays] = useState([]);
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [datepickerHeaderDate, setDatepickerHeaderDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(value);
  const [type, setType] = useState("date");

  const decrement = () => {
    switch (type) {
      case "date":
        setDatepickerHeaderDate((prev) => subMonths(prev, 1));
        break;
      case "month":
        setDatepickerHeaderDate((prev) => subYears(prev, 1));
        break;
      case "year":
        setDatepickerHeaderDate((prev) => subMonths(prev, 1));
        break;
    }
  };

  const increment = () => {
    switch (type) {
      case "date":
        setDatepickerHeaderDate((prev) => addMonths(prev, 1));
        break;
      case "month":
        setDatepickerHeaderDate((prev) => addYears(prev, 1));
        break;
      case "year":
        setDatepickerHeaderDate((prev) => subMonths(prev, 1));
        break;
    }
  };

  const isToday = (date) =>
    isEqual(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth(), date),
      selectedDate
    );

  const setDateValue = (date) => () => {
    setSelectedDate(
      new Date(
        datepickerHeaderDate.getFullYear(),
        datepickerHeaderDate.getMonth(),
        date
      )
    );
    setDate(
      new Date(
        datepickerHeaderDate.getFullYear(),
        datepickerHeaderDate.getMonth(),
        date
      )
    );
    // setShowDatepicker(false);
  };

  const getDayCount = (date) => {
    let daysInMonth = getDaysInMonth(date);

    // find where to start calendar day of week
    let dayOfWeek = getDay(new Date(date.getFullYear(), date.getMonth(), 1));

    let blankdaysArray = [];

    for (let i = 1; i <= dayOfWeek; i++) {
      blankdaysArray.push(i);
    }

    let daysArray = [];

    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    setBlankDays(blankdaysArray);

    setDayCount(daysArray);
  };

  const isSelectedMonth = (month) =>
    isEqual(
      new Date(selectedDate.getFullYear(), month, selectedDate.getDate()),
      selectedDate
    );

  const setMonthValue = (month) => () => {
    setDatepickerHeaderDate(
      new Date(
        datepickerHeaderDate.getFullYear(),
        month,
        datepickerHeaderDate.getDate()
      )
    );
    setType("date");
  };

  const toggleDatepicker = () => setShowDatepicker((prev) => !prev);

  const showMonthPicker = () => setType("month");

  const showYearPicker = () => setType("date");

  useEffect(() => {
    getDayCount(datepickerHeaderDate);
  }, [datepickerHeaderDate]);

  return (
    <div className="w-[17rem]   relative bg-ice border border-zinc-300 py-5 gap-2 flex justify-center items-center rounded-md">
      <input type="hidden" name="date" />
      <div
        className="gap-2 flex justify-center items-center cursor-pointer"
        onClick={toggleDatepicker}
      >
        <div>
          <p className="text-sm text-zinc-500">{placeholder}</p>
        </div>
        <div>
          <input
            type="text"
            readOnly
            className="w-24 leading-none focus:outline-none text-zinc-500 bg-ice"
            placeholder={placeholder}
            value={format(selectedDate, "dd/MM/yyyy", { locale: ptBR })}
          />
        </div>
      </div>
      {showDatepicker && (
        <div className="bg-white mt-12 rounded-lg p-4 absolute top-0 left-0 w-[17rem] z-50">
          <div className="flex justify-between items-center mb-2">
            <div>
              <button
                type="button"
                className="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full"
                onClick={decrement}
              >
                <svg
                  className="h-6 w-6 text-gray-500 inline-flex"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            </div>
            {type === "date" && (
              <div
                onClick={showMonthPicker}
                className="flex-grow p-1 text-lg font-bold text-gray-800 cursor-pointer hover:bg-gray-200 rounded-lg"
              >
                <p className="text-center">
                  {format(datepickerHeaderDate, "MMMM", { locale: ptBR })}
                </p>
              </div>
            )}
            <div
              onClick={showYearPicker}
              className="flex-grow p-1 text-lg font-bold text-gray-800 cursor-pointer hover:bg-gray-200 rounded-lg"
            >
              <p className="text-center">
                {format(datepickerHeaderDate, "yyyy", { locale: ptBR })}
              </p>
            </div>
            <div>
              <button
                type="button"
                className="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full"
                onClick={increment}
              >
                <svg
                  className="h-6 w-6 text-gray-500 inline-flex"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
          {type === "date" && (
            <>
              <div className="flex flex-wrap mb-3 -mx-1">
                {DAYS.map((day, i) => (
                  <div key={i} className="px-1 w-[14.26%]">
                    <div className="text-gray-800 font-medium text-center text-xs">
                      {day}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap -mx-1" onClick={toggleDatepicker}>
                {blankDays.map((_, i) => (
                  <div
                    key={i}
                    style={{ width: "14.26%" }}
                    className="text-center border p-1 border-transparent text-sm"
                  ></div>
                ))}
                {dayCount.map((d, i) => (
                  <div
                    key={i}
                    style={{ width: "14.26%" }}
                    className="px-1 mb-1"
                  >
                    <div
                      onClick={setDateValue(d)}
                      className={`cursor-pointer text-center text-sm rounded-full leading-loose transition ease-in-out duration-100 ${
                        isToday(d)
                          ? "bg-blue-500 text-white"
                          : "text-gray-700 hover:bg-blue-200"
                      }`}
                    >
                      {d}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {type === "month" && (
            <div className="flex flex-wrap -mx-1">
              {Array(12)
                .fill(null)
                .map((_, i) => (
                  <div
                    key={i}
                    onClick={setMonthValue(i)}
                    style={{ width: "25%" }}
                  >
                    <div
                      className={`cursor-pointer p-5 font-semibold text-center text-sm rounded-lg hover:bg-gray-200 ${
                        isSelectedMonth(i)
                          ? "bg-blue-500 text-white"
                          : "text-gray-700 hover:bg-blue-200"
                      }`}
                    >
                      {format(
                        new Date(
                          datepickerHeaderDate.getFullYear(),
                          i,
                          datepickerHeaderDate.getDate()
                        ),
                        "MMM",
                        {
                          locale: ptBR,
                        }
                      )}
                    </div>
                  </div>
                ))}
            </div>
          )}{" "}
          {type === "year" && (
            <Datepicker
              datepickerHeaderDate={datepickerHeaderDate}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              closeDatepicker={() => setShowDatepicker(false)}
            />
          )}
        </div>
      )}
    </div>
  );
}
