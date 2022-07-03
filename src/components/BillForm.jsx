import classNames from "classnames";
import { format } from "date-fns/esm";
import ptBR from "date-fns/locale/pt-BR";
import { ArrowCircleDown, ArrowCircleUp } from "phosphor-react";
import { useEffect, useState } from "react";
import api from "../api";
import { reverseString } from "../utils";
import { DatePicker } from "./DatePicker";

export function BillForm({ onSubmit, errors, bill }) {
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [maskedAmount, setMaskedAmount] = useState("");
  const [reference, setReference] = useState(new Date());
  const [due, setDue] = useState(new Date());
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [supplier, setSupplier] = useState("");

  useEffect(() => {
    api.get("/supplier?per_page=100").then(({ data }) => {
      setSuppliers(data.data);
    });

    api.get("/category?per_page=100").then(({ data }) => {
      setCategories(data.data);
    });
  }, []);

  function setBillType(billType) {
    setType(billType);
  }

  function handleSubmit(event) {
    event.preventDefault();

    let billData = {
      description,
      amount,
      reference_at: format(reference, "yyyy-MM-dd", { locale: ptBR }),
      due_at: format(due, "yyyy-MM-dd", { locale: ptBR }),
      original_due_at: format(due, "yyyy-MM-dd", { locale: ptBR }),
      type,
      category_id: category,
      supplier_id: supplier,
      is_paid: false,
      is_credit_card: false,
    };

    onSubmit(billData);
  }

  function handleAmountChange(value) {
    let maskedValue = reverseString(value.toString().replace(/[^\d]+/gi, ""));

    const mask = reverseString("###.###.###.###.###,##");

    let result = "";

    for (var x = 0, y = 0; x < mask.length && y < maskedValue.length; ) {
      if (mask.charAt(x) != "#") {
        result += mask.charAt(x);
        x++;
      } else {
        result += maskedValue.charAt(y);
        y++;
        x++;
      }
    }

    result = reverseString(result);

    setAmount(parseFloat(result.replace(".", "").replace(",", ".")));

    setMaskedAmount(`R$ ${result}`);
  }

  return (
    <form
      className="w-full max-w-full mt-8 flex flex-col items-center gap-2"
      onSubmit={handleSubmit}
    >
      <input
        className={classNames("bg-ice rounded-md py-5 pl-6 w-full border", {
          "border-zinc-300": !errors["description"],
          "placeholder-zinc-500": !errors["description"],
          "border-danger-500": errors["description"],
          "placeholder-danger-500": errors["description"],
        })}
        type="text"
        value={bill ? bill.description : description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Descrição"
      />
      <input
        className={classNames("bg-ice rounded-md py-5 pl-6 w-full border", {
          "border-zinc-300": !errors["amount"],
          "placeholder-zinc-500": !errors["amount"],
          "border-danger-500": errors["amount"],
          "placeholder-danger-500": errors["amount"],
        })}
        type="text"
        value={maskedAmount}
        onChange={(event) => handleAmountChange(event.target.value)}
        placeholder="Preço"
      />
      <div className="flex sm:flex-row flex-col gap-2">
        <DatePicker
          placeholder="Referência"
          setDate={setReference}
          value={reference}
        />
        <DatePicker placeholder="Vencimento" setDate={setDue} value={due} />
      </div>
      <div className="flex gap-2 sm:flex-row flex-col">
        <button
          className={classNames(
            "w-[17rem] max-w-[17rem] justify-center py-5 gap-7 flex-1 flex bg-ice rounded-md placeholder-zinc-500 border",
            {
              "bg-green-300 bg-opacity-30": type == "receive",
              "border-zinc-300": !errors["type"],
              "border-danger-500": errors["type"],
            }
          )}
          type="button"
          placeholder="Refêrencia"
          onClick={() => setBillType("receive")}
        >
          <ArrowCircleUp color="#33cc95" size={24} />
          Entrada
        </button>

        <button
          className={classNames(
            "w-[17rem] max-w-[17rem] justify-center py-5 gap-7 flex-1 flex bg-ice rounded-md placeholder-zinc-500 border",
            {
              "bg-danger-500 bg-opacity-30": type == "pay",
              "border-zinc-300": !errors["type"],
              "border-danger-500": errors["type"],
            }
          )}
          type="button"
          placeholder="Refêrencia"
          onClick={() => setBillType("pay")}
        >
          <ArrowCircleDown color="#e52e4d" size={24} />
          Saída
        </button>
      </div>
      <select
        className={classNames(
          "form-select text-zinc-500 bg-ice appearance-none rounded-md py-5 pl-6 w-full placeholder-zinc-500 border",
          {
            "border-zinc-300": !errors["category_id"],
            "border-danger-500": errors["category_id"],
          }
        )}
        type="text"
        onChange={(event) => setCategory(event.target.value)}
        value={bill !== null ? bill.category.id : category}
      >
        <option value="">Categoria</option>
        {categories.map((category) => {
          return (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          );
        })}
      </select>
      <select
        className={classNames(
          "form-select text-zinc-500 bg-ice appearance-none rounded-md py-5 pl-6 w-full placeholder-zinc-500 border",
          {
            "border-zinc-300": !errors["supplier_id"],
            "border-danger-500": errors["supplier_id"],
          }
        )}
        type="text"
        onChange={(event) => setSupplier(event.target.value)}
        value={bill !== null ? bill.supplier.id : supplier}
      >
        <option value="">Fornecedor</option>
        {suppliers.map((supplier) => {
          return (
            <option key={supplier.id} value={supplier.id}>
              {supplier.name}
            </option>
          );
        })}
      </select>
      <button
        className="text-white font-bold text-base bg-green-500 py-3 w-full rounded-md hover:bg-green-900 transition-colors"
        type="submit"
      >
        {bill !== null ? "Salvar" : "Cadastrar"}
      </button>
    </form>
  );
}
