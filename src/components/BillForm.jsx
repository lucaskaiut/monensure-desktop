import classNames from "classnames";
import { format } from "date-fns/esm";
import ptBR from "date-fns/locale/pt-BR";
import { ArrowCircleDown, ArrowCircleUp } from "phosphor-react";
import { useEffect, useState } from "react";
import api from "../api";
import { reverseString } from "../utils";
import { DatePicker } from "./DatePicker";
import CreatableSelect from 'react-select/creatable';

export function BillForm({ onSubmit, errors, bill }) {
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [maskedAmount, setMaskedAmount] = useState("");
  const [reference, setReference] = useState(null);
  const [due, setDue] = useState(null);
  const [type, setType] = useState("");
  const [category, setCategory] = useState(null);
  const [supplier, setSupplier] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [installments, setInstallments] = useState(null);
  const [hasInstallments, setHasInstallments] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    if (bill) {
      setDescription(bill.description);

      setDue(new Date(`${bill.due_at}T00:00:00`));

      setReference(new Date(`${bill.reference_at}T00:00:00`));

      setType(bill.type);

      setSupplier(bill.supplier);

      setCategory(bill.category);

      handleAmountChange(bill.amount.toFixed(2));
    }

    fetchCategories();

    fetchSuppliers();

    setIsLoading(false);
  }, []);

  async function fetchSuppliers() {
    const { data } = await api.get("/supplier?per_page=100");

    setSuppliers(data.data);
  }

  async function fetchCategories() {
    const { data } = await api.get("/category?per_page=100");

    setCategories(data.data);
  }

  function setBillType(billType) {
    setType(billType);
  }

  function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    let billData = {
      description,
      amount,
      reference_at: format(reference, "yyyy-MM-dd", { locale: ptBR }),
      due_at: format(due, "yyyy-MM-dd", { locale: ptBR }),
      original_due_at: format(due, "yyyy-MM-dd", { locale: ptBR }),
      type,
      category_id: category.id,
      supplier_id: supplier.id,
      is_paid: false,
      is_credit_card: false,
      installments: hasInstallments ? installments : null,
    };

    onSubmit(billData);

    setIsLoading(false);
  }

  async function handleCreateCategory(value) {
    setIsLoading(true);

    const { data } = await api.post('/category', { name: value });

    const category = data.data;

    setCategory(category)

    fetchCategories();

    setIsLoading(false);
  }

  async function handleCreateSupplier(value) {
    setIsLoading(true);

    const { data } = await api.post('/supplier', { name: value });

    const supplier = data.data;

    setSupplier(supplier.id)

    fetchSuppliers();

    setIsLoading(false);
  }

  function handleAmountChange(value) {
    let maskedValue = reverseString(value.toString().replace(/[^\d]+/gi, ""));

    const mask = reverseString("###.###.###.###.###,##");

    let result = "";

    for (var x = 0, y = 0; x < mask.length && y < maskedValue.length;) {
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
        className={classNames("bg-ice rounded-md sm:py-5 py-3 pl-6 w-full border", {
          "border-zinc-300": !errors["description"],
          "placeholder-zinc-500": !errors["description"],
          "border-danger-500": errors["description"],
          "placeholder-danger-500": errors["description"],
        })}
        type="text"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Descrição"
      />
      <input
        className={classNames("bg-ice rounded-md sm:py-5 py-3 pl-6 w-full border", {
          "border-zinc-300": !errors["amount"],
          "placeholder-zinc-500": !errors["amount"],
          "border-danger-500": errors["amount"],
          "placeholder-danger-500": errors["amount"],
        })}
        type="text"
        inputMode="numeric"
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
        <DatePicker
          placeholder="Vencimento"
          setDate={setDue}
          value={due}
        />
      </div>
      <div className="flex gap-2 flex-row">
        <button
          className={classNames(
            "w-[17rem] sm:max-w-[17rem] max-w-[134px] justify-center sm:py-5 py-3 gap-7 flex-1 flex bg-ice rounded-md placeholder-zinc-500 border",
            {
              "bg-green-300 bg-opacity-30": type == "receive",
              "border-zinc-300": !errors["type"],
              "border-danger-500": errors["type"],
            }
          )}
          type="button"
          onClick={() => setBillType("receive")}
        >
          <ArrowCircleUp color="#33cc95" size={24} />
          Entrada
        </button>

        <button
          className={classNames(
            "w-[17rem] sm:max-w-[17rem] max-w-[134px] justify-center sm:py-5 py-3 gap-7 flex-1 flex bg-ice rounded-md placeholder-zinc-500 border",
            {
              "bg-danger-500 bg-opacity-30": type == "pay",
              "border-zinc-300": !errors["type"],
              "border-danger-500": errors["type"],
            }
          )}
          type="button"
          onClick={() => setBillType("pay")}
        >
          <ArrowCircleDown color="#e52e4d" size={24} />
          Saída
        </button>
      </div>
      <CreatableSelect
        isClearable
        options={categories}
        onCreateOption={handleCreateCategory}
        isLoading={isLoading}
        onChange={setCategory}
        value={category}
        className="w-full"
        classNamePrefix="select"
        placeholder="Categoria"
      />
      <CreatableSelect
        isClearable
        options={suppliers}
        onCreateOption={handleCreateSupplier}
        isLoading={isLoading}
        onChange={setSupplier}
        value={supplier}
        className="w-full"
        classNamePrefix="select"
        placeholder="Fornecedor"
      />
      <div className="py-2 w-full flex align-center justify-between">
        <div className="flex items-center w-full">
          <label for="default-toggle" className="inline-flex relative items-center cursor-pointer">
            <input type="checkbox" id="default-toggle" className="sr-only peer" defaultChecked={hasInstallments} onChange={() => setHasInstallments(!hasInstallments)} />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium">Tem parcelas?</span>
          </label>
        </div>
        <div className="flex w-full">
          {hasInstallments && (
            <input
              className={classNames("bg-ice rounded-md sm:py-5 py-3 pl-6 border", {
                "border-zinc-300": !errors["description"],
                "placeholder-zinc-500": !errors["description"],
                "border-danger-500": errors["description"],
                "placeholder-danger-500": errors["description"],
              })}
              type="number"
              min="0"
              step="1"
              value={installments}
              onChange={(event) => setInstallments(event.target.value)}
              placeholder="Parcelas"
            />
          )}
        </div>
      </div>
      <button
        className="text-white font-bold text-base bg-green-500 py-3 w-full rounded-md hover:bg-green-900 transition-colors"
        type="submit"
      >
        {bill !== null ? "Salvar" : "Cadastrar"}
      </button>
    </form>
  );
}
