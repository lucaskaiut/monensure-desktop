import { Plus } from "phosphor-react";
import { useEffect } from "react";
import { Animated } from "react-animated-css";
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export function TableHeader ({ 
    startDueDateFilter, 
    endDueDateFilter, 
    sortOrder, 
    isPaidFilter, 
    selectedBills, 
    setStartDueDateFilter, 
    setEndDueDateFilter, 
    setSortOrder, 
    setIsPaidFilter,
    fetchData
}) { 
    useEffect(() => {
        fetchData();
    }, [startDueDateFilter, endDueDateFilter, sortOrder, isPaidFilter]);

    function handleNewTransactionClick () {
        toggleModal();
    }

    function paySelectedBills() {
        console.log(selectedBills);
    }

    return (
        <div className="flex justify-between gap-2">
            <button 
                className="bg-brand sm:text-base text-sm sm:py-3 sm:px-8 py-3 px-3 rounded-md hover:bg-[#118B3A] transition-colors" 
                onClick={handleNewTransactionClick}
            >
                <p className="xl:block hidden">Nova transação</p>
                <Plus size={24} className="xl:hidden block" />
            </button>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Vencimento de"
                    value={startDueDateFilter}
                    onChange={(newValue) => { setStartDueDateFilter(newValue) }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Vencimento até"
                    value={endDueDateFilter}
                    onChange={(newValue) => { setEndDueDateFilter(newValue) }}
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
                        onChange={event => setSortOrder(event.target.value)}
                    >
                        <MenuItem value=''>Selecione</MenuItem>
                        <MenuItem value='supplier'>Fornecedor</MenuItem>
                        <MenuItem value='due_at'>Vencimento</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <FormControlLabel 
                control={<Checkbox checked={isPaidFilter} />} 
                label="Pago" 
                onChange={event => setIsPaidFilter(event.target.checked)}
                className="text-black"
            />
            <Animated 
                animationIn="headShake"
                animationOut="fadeOut"
                animationOutDuration={500}
                isVisible={selectedBills.length > 0}
            >
                <button 
                    className='bg-[#e52e4d] sm:text-base text-sm sm:py-3 sm:px-8 py-3 px-3 rounded-md hover:bg-[#96031b] transition-colors'
                    onClick={paySelectedBills}
                >
                    Pagar
                </button>
            </Animated>
        </div>
    );
}