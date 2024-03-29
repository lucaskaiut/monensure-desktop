import { CurrencyDollar, Faders, Funnel, Plus } from "phosphor-react";
import { useEffect, useState } from "react";
import { Animated } from "react-animated-css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Drawer from "@mui/material/Drawer";
import api from "../api";
import toast from "react-hot-toast";
import Datepicker from "react-tailwindcss-datepicker";
import CreatableSelect from 'react-select/creatable';

export function TableHeader({
  startDueDateFilter,
  endDueDateFilter,
  sortOrder,
  isPaidFilter,
  selectedBills,
  setSelectedBills,
  setStartDueDateFilter,
  setEndDueDateFilter,
  setSortOrder,
  setIsPaidFilter,
  fetchData,
  toggleModal,
  setSupplierFilter,
  supplierFilter,
  setCategoryFilter,
  categoryFilter,
}) {
  const [drawer, setDrawer] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [categories, setCategories] = useState([]);

  function toggleDrawer() {
    setDrawer(!drawer);
  }

  function handleNewTransactionClick() {
    toggleModal();
  }

  async function fetchSuppliers() {
    const { data } = await api.get("/supplier?per_page=100");

    setSuppliers(data.data);
  }

  async function fetchCategories() {
    const { data } = await api.get("/category?per_page=100");

    setCategories(data.data);
  }

  async function paySelectedBills() {
    try {
      await api.put("/bill/pay-bills", {
        bills: selectedBills,
      });

      setSelectedBills([]);

      fetchData();

      toast.success("Contas pagas com sucesso");
    } catch ({ response }) {
      toast.error(response.data.message);
    }
  }

  function handleFilter() {
    fetchData();

    toggleDrawer();
  }

  useEffect(() => {
    fetchSuppliers();
    fetchCategories();
  }, []);

  return (
    <div className="w-full md:relative absolute bottom-0 left-0">
      <div className="md:flex justify-between gap-2 hidden">
        <button
          className="bg-green-500 sm:text-base text-sm sm:py-3 sm:px-8 py-3 px-3 rounded-md hover:bg-green-900 transition-colors"
          onClick={handleNewTransactionClick}
        >
          <p className="xl:block hidden">Nova transação</p>
          <Plus size={24} className="xl:hidden block" />
        </button>
        {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Vencimento de"
            value={startDueDateFilter}
            onChange={(newValue) => {
              setStartDueDateFilter(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Vencimento até"
            value={endDueDateFilter}
            onChange={(newValue) => {
              setEndDueDateFilter(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider> */}
        <div className="w-80 border rounded-md flex items-center justify-center border-zinc-400">
          <Datepicker
            value={{
              startDate: startDueDateFilter,
              endDate: endDueDateFilter,
            }}
            configs={{
              shortcuts: {
                today: "Hoje",
                yesterday: "Ontem",
                past: (period) => `Últimos ${period} dias`,
                currentMonth: "Este mês",
                pastMonth: "Mês passado",
              },
            }}
            separator={"até"}
            displayFormat="DD/MM/YYYY"
            inputClassName="text-lg border-none outline-none"
            showShortcuts
            i18n={"pt-br"}
            onChange={(newValue) => {
              const startDate = new Date(newValue.startDate + "T00:00:00");
              const endDate = new Date(newValue.endDate + "T23:59:59");

              setStartDueDateFilter(startDate);
              setEndDueDateFilter(endDate);
            }}
          />
        </div>
        <FormControl size="medium" className="w-72 hidden xs:block">
          <InputLabel id="demo-simple-select-label">Ordenar</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sortOrder}
            label="Ordenar"
            onChange={(event) => setSortOrder(event.target.value)}
          >
            <MenuItem value="">Selecione</MenuItem>
            <MenuItem value="supplier">Fornecedor</MenuItem>
            <MenuItem value="due_at">Vencimento</MenuItem>
          </Select>
        </FormControl>
        <CreatableSelect
          options={suppliers}
          onChange={setSupplierFilter}
          value={supplierFilter}
          className="w-72"
          styles={{
            option: baseStyles => ({
              ...baseStyles,
              color: '#000'
            })
          }}
          classNamePrefix="select"
          placeholder="Fornecedor"
        />
        <CreatableSelect
          options={categories}
          onChange={setCategoryFilter}
          value={categoryFilter}
          className="w-72"
          styles={{
            option: baseStyles => ({
              ...baseStyles,
              color: '#000'
            })
          }}
          classNamePrefix="select"
          placeholder="Categoria"
        />
        <FormControlLabel
          control={<Checkbox checked={isPaidFilter} />}
          label="Pago"
          onChange={(event) => setIsPaidFilter(event.target.checked)}
          className="text-black"
        />
        <Animated
          animationIn="headShake"
          animationOut="fadeOut"
          animationOutDuration={500}
          isVisible={selectedBills.length > 0}
        >
          <button
            className="bg-danger-500 sm:text-base text-sm sm:py-3 sm:px-8 py-3 px-3 rounded-md hover:bg-danger-900 transition-colors"
            onClick={paySelectedBills}
          >
            Pagar
          </button>
        </Animated>
        <button
          className="bg-green-500 sm:text-base text-sm sm:py-3 sm:px-8 py-3 px-3 rounded-md hover:bg-green-900 transition-colors"
          onClick={fetchData}
        >
          <p className="xl:block hidden">Filtrar</p>
        </button>
      </div>

      <div className="md:hidden flex justify-between items-center px-10 bg-green-500">
        <button className="text-zinc-100 flex" onClick={() => toggleDrawer()}>
          <Faders size={36} weight="fill" />
        </button>
        <button
          className="bg-green-500 absolute -top-8 mx-auto left-[39%] text-center ring-8 ring-white sm:text-base text-sm p-4 rounded-full hover:bg-green-900 transition-colors"
          onClick={handleNewTransactionClick}
        >
          <Plus size={36} weight="fill" className="xl:hidden block" />
        </button>
        <button
          className="text-zinc-100 rounded-sm p-2"
          onClick={() => paySelectedBills()}
        >
          <CurrencyDollar size={36} />
        </button>
        <Drawer anchor="bottom" open={drawer} onClose={() => toggleDrawer()}>
          <div className="mb-10 flex flex-col gap-2 p-2">
            {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Vencimento de"
                value={startDueDateFilter}
                onChange={(newValue) => {
                  setStartDueDateFilter(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Vencimento até"
                value={endDueDateFilter}
                onChange={(newValue) => {
                  setEndDueDateFilter(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider> */}
            <div className="w-full">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Ordenar</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={sortOrder}
                  label="Ordenar"
                  onChange={(event) => setSortOrder(event.target.value)}
                >
                  <MenuItem value="">Selecione</MenuItem>
                  <MenuItem value="supplier">Fornecedor</MenuItem>
                  <MenuItem value="due_at">Vencimento</MenuItem>
                </Select>
              </FormControl>
            </div>
            <FormControlLabel
              control={<Checkbox checked={isPaidFilter} />}
              label="Pago"
              onChange={(event) => setIsPaidFilter(event.target.checked)}
              className="text-black"
            />
            <button
              className="bg-green-500 sm:text-base text-white text-sm sm:py-3 sm:px-8 py-3 px-3 rounded-md hover:bg-green-900 transition-colors"
              onClick={handleFilter}
            >
              <p className="xl:hidden block">Filtrar</p>
            </button>
          </div>
        </Drawer>
      </div>
    </div>
  );
}
