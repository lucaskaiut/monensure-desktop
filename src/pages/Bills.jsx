import { Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { TableRow } from '../components/TableRow';
import { BillForm } from "../components/BillForm";
import { validateData } from "../formValidation";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Plus, X } from "phosphor-react";
import api from '../api';
import { format } from "date-fns";
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
import useLongPress from "../hooks/useLongPress";

export function Bills () {
    const [bills, setBills] = useState([]);
    const [totalPay, setTotalPay] = useState(0);
    const [totalReceive, setTotalReceive] = useState(0);
    const [formErrors, setFormErrors] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [selectedBills, setSelectedBills] = useState([]);
    const [selectedBill, setSelectedBill] = useState(null);
    const [startDueDateFilter, setStartDueDateFilter] = useState(null);
    const [endDueDateFilter, setEndDueDateFilter] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [isPaidFilter, setIsPaidFilter] = useState(false);

    useEffect(() => {
        async function setData() {
            const data = await loadData();

            setBills(data.data);

            setTotalReceive(0);

            setTotalPay(data.additional.total);
        }

        setData();
        
    }, []);

    useEffect(() => {
        fetchData();
    }, [startDueDateFilter, endDueDateFilter, sortOrder, isPaidFilter]);

    async function fetchData() {
        const data = await loadData();

        setBills(data.data);

        setTotalReceive(0);

        setTotalPay(data.additional.total);
    }

    async function fetchMoreData () {
        const data = await loadData(currentPage + 1);

        setBills([...bills, ...data.data]);

        setTotalReceive(0);

        setTotalPay(data.additional.total);

        setCurrentPage((currentPage) => currentPage + 1);

        if (data.pagination.last_page === data.pagination.current_page) {
            setHasMore(false);
        } 
    }

    async function loadData(page = 1) { 
        let params = '?';

        params += `page=${page}`;

        params += `&filter[is_paid]=${isPaidFilter}`;

        if (startDueDateFilter != null) {
            params += `&filter[due_after]=${format(startDueDateFilter, 'yyyy-MM-dd')}`;
        }

        if (endDueDateFilter != null) {
            params += `&filter[due_before]=${format(endDueDateFilter, 'yyyy-MM-dd')}`;
        }

        if (sortOrder) {
            params += `&sort=${sortOrder}`;
        }

        const response = await api.get(`/bill${params}`);

        const { data } = response;

        return data;
    }

    const formValidation = {
        description: [
            'required'
        ],
        amount: [
            'required',
            'numeric'
        ],
        reference_at: [
            'required',
        ],
        due_at: [
            'required',
        ],
        original_due_at: [
            'required',
        ],
        type: [
            'required'
        ],
        supplier_id: [
            'required'
        ],
        category_id: [
            'required'
        ]
    }


    function handleCreateBill (billData) {
        const { errors, hasError } = validateData(billData, formValidation);

        setFormErrors(errors);

        if (!hasError) {
            api.post('/bill', { ...billData }).then(() => {
                loadData();
                toggleModal();
            });
        }
    }

    function onRowClick(billId) {
        
    }

    function handleNewTransactionClick () {
        toggleModal();
    }

    function toggleModal (bill = null) {
        setSelectedBill(bill);

        setIsModalOpen(!isModalOpen);
    }

    function paySelectedBills() {
        console.log(selectedBills);
    }

    function handleSelectedBill (billId) {
        const prevSelected = selectedBills;

        if (prevSelected.length > 0) {
            let newSelected = [];

            if (prevSelected.includes(billId)) {
                newSelected = prevSelected.filter((id) => {
                    return id != billId;
                });
            } else {
                newSelected = [...prevSelected, billId];
            }
    
            setSelectedBills(newSelected);
        } else {
            const bill = bills.filter(value => {
                return value.id === billId;
            });

            toggleModal(bill[0]);
        }
    }

    const onLongPress = (data) => {
        const { billId } = data;

        const prevSelected = selectedBills;

        let newSelected = [];

        if (prevSelected.includes(billId)) {
            newSelected = prevSelected.filter((id) => {
                return id != billId;
            });
        } else {
            newSelected = [...prevSelected, billId];
        }

        setSelectedBills(newSelected);
    };

    const onClick = (data) => {
        const { billId } = data;

        handleSelectedBill(billId);
    }

    const defaultOptions = {
        shouldPreventDefault: true,
        delay: 400,
    };

    const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);

    return (
        <div className="flex flex-col w-full px-2 2xl:px-52 xl:px-32 md:mt-10 mt-1">
            <div className="flex flex-col md:flex-row gap-2 justify-between items-center">
                <Card variant='receive' amount={totalReceive} />
                <Card variant='pay' amount={totalPay} />
                <Card variant='total' amount={totalReceive - totalPay} />
            </div>
            <div className="h-full bg-white sm:mt-5 mt-2 rounded-md py-6 xl:px-8 px-2 shadow-xl">
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
                <div id="scrollableBills" className="w-full sm:mt-8 m-1 flex flex-col min-h-[550px] max-h-[550px] overflow-y-auto">
                    <InfiniteScroll
                        dataLength={bills.length} //This is important field to render the next data
                        next={fetchMoreData}
                        hasMore={hasMore}
                        scrollableTarget="scrollableBills"
                        scrollThreshold={1}
                    >
                        { bills.map(bill => {
                            return <TableRow 
                                key={bill.id}
                                id={bill.id} 
                                variant='pay' 
                                isPaid={bill.is_paid} 
                                supplier={bill.supplier.name} 
                                dueAt={bill.due_at} 
                                description={bill.description} 
                                category={bill.category}
                                amount={bill.amount}
                                onRowClick={onRowClick}
                                isSelected={selectedBills.includes(bill.id)}
                                longPress={longPressEvent}
                            />
                        }) }
                    </InfiniteScroll>
                </div>
            </div>
                <Modal
                    open={isModalOpen}
                    onClose={toggleModal}
                    className="flex justify-center items-center max-w-full"
                >
                    <div className="relative bg-white text-zinc-600 max-w-full sm:min-w-[36rem] min-h-[46.25rem] rounded-lg py-16 px-4 sm:px-12">
                        <X className="top-3 right-3 absolute" onClick={toggleModal} />
                        <h1 className="text-2xl">Cadastrar nova transação</h1>
                        <BillForm onSubmit={handleCreateBill} errors={formErrors} bill={selectedBill}/>
                    </div>
                </Modal>
        </div>
    )
}