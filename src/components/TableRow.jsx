import classNames from "classnames";
import NumberFormat from "react-number-format";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { CheckCircle } from "phosphor-react";

export function TableRow({
  id,
  variant,
  isPaid,
  description,
  supplier,
  category,
  dueAt,
  amount,
  onSelect,
  isSelected,
  onRowClick,
}) {
  function handleRowClick(type) {
    if (type === 'select') {
      onSelect(id);
    } else {
      onRowClick(id);
    }
  }

  return (
    <div className={classNames("relative group cursor-pointer group hover:bg-zinc-200 rounded-md shadow transition-colors", {
      "bg-slate-200": isSelected
    })}>
      <div 
        className={classNames("opacity-100 group-hover:opacity-100 transition-opacity absolute left-2 top-4", {
          "opacity-100": isSelected,
          "sm:opacity-0": !isSelected
        })}
        onClick={() => handleRowClick('select')}
      >
        <CheckCircle size={36} color={isSelected ? "#18b84e" : "#a1a1a1"}/>
      </div>
      <div
        className={classNames(
          "mt-1 ml-10 flex text-slate-600 justify-between items-center sm:px-3 px-1 py-3",
          {
            "line-through": isPaid,
            "bg-slate-200": isSelected,
          }
        )}
        onClick={() => handleRowClick('row')}
      >
        <div className="flex sm:w-[50px]">
          <div className="flex items-center">
            <div>
              <div className="sm:hidden">
                <p className="text-sm">{description}</p>
              </div>
              <p className="md:text-base text-xs text-zinc-400 sm:text-zinc-900">
                {format(new Date(`${dueAt}T00:00:00`), "dd/MM/yyyy", {
                  locale: ptBR,
                })}
              </p>
              <p className="md:text-sm text-xs text-zinc-400 hidden sm:block">
                {category.name}
              </p>
            </div>
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
    </div>

  );
}
