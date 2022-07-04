import { CurrencyDollar, Faders, Funnel, Plus } from "phosphor-react";
import { useEffect, useState } from "react";
import { Animated } from "react-animated-css";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Drawer from "@mui/material/Drawer";
import api from "../api";
import toast from "react-hot-toast";

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
}) {
  const [drawer, setDrawer] = useState(false);

  function toggleDrawer() {
    setDrawer(!drawer);
  }

  useEffect(() => {
    fetchData();
  }, [startDueDateFilter, endDueDateFilter, sortOrder, isPaidFilter]);

  function handleNewTransactionClick() {
    toggleModal();
  }

  async function paySelectedBills() {
    try {
      await api.put('/bill/pay-bills', {
        bills: selectedBills
      });

      setSelectedBills([]);

      fetchData();
      
      toast.success('Contas pagas com sucesso');
    } catch ({ response }) {
      toast.error(response.data.message);
    }
  }

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
        <LocalizationProvider dateAdapter={AdapterDateFns}>
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
        </LocalizationProvider>
        <div className="w-56">
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
            <LocalizationProvider dateAdapter={AdapterDateFns}>
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
            </LocalizationProvider>
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
          </div>
        </Drawer>
      </div>
    </div>
  );
}
