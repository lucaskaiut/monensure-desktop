import classNames from "classnames";
import NumberFormat from "react-number-format";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

export function TableRow({
  id,
  variant,
  isPaid,
  description,
  supplier,
  category,
  dueAt,
  amount,
  onRowClick,
  isSelected,
  longPress,
}) {
  const { onMouseDown, onTouchStart, onMouseUp, onMouseLeave, onTouchEnd } =
    longPress;

  return (
    <div
      onMouseDown={(event) => onMouseDown(event, { billId: id })}
      onTouchStart={(event) => onTouchStart(event, { billId: id })}
      onMouseUp={(event) => onMouseUp(event, { billId: id })}
      onMouseLeave={(event) => onMouseLeave(event, { billId: id })}
      onTouchEnd={(event) => onTouchEnd(event, { billId: id })}
      className={classNames(
        "mt-1 cursor-pointer hover:bg-zinc-200 transition-colors flex text-slate-600 justify-between items-center bg-white sm:px-3 px-1 py-3 rounded-md shadow",
        {
          "line-through": isPaid,
          "bg-slate-200": isSelected,
        }
      )}
    >
      <div className="flex sm:w-[50px]">
        <div>
          <div className="sm:hidden">
            <p className="text-sm">{description}</p>
          </div>
          <p className="md:text-base text-xs text-zinc-400 sm:text-zinc-900">
            {format(new Date(dueAt), "dd/MM/yyyy", {
              locale: ptBR,
            })}
          </p>
          <p className="md:text-sm text-xs text-zinc-400 hidden sm:block">
            {category.name}
          </p>
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-col sm:items-start sm:w-[300px]">
        <p>{description}</p>
        <p className="text-sm text-zinc-400">{supplier}</p>
      </div>
      <div className="flex flex-col items-end sm:w-[100px]">
        <p
          className={classNames("", {
            "text-green-300": variant == "receive",
            "text-danger-500": variant == "pay",
          })}
        >
          {
            <NumberFormat
              value={amount}
              fixedDecimalScale
              decimalScale={2}
              displayType="text"
              decimalSeparator=","
              thousandSeparator="."
              prefix="R$ "
            />
          }
        </p>
        <p className="md:text-sm text-xs text-zinc-400 sm:hidden block">
          {category.name}
        </p>
      </div>
    </div>
  );
}
