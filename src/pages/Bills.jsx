import { Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { TableRow } from '../components/TableRow';
import { BillForm } from "../components/BillForm";
import { validateData } from "../formValidation";
import InfiniteScroll from 'react-infinite-scroll-component';
import { X } from "phosphor-react";
import api from '../api';
import { format } from "date-fns";
import { TableHeader } from "../components/TableHeader";
import toast from "react-hot-toast";

export function Bills () {
    const now = new Date();

    const [bills, setBills] = useState([]);
    const [totalPay, setTotalPay] = useState(0);
    const [totalReceive, setTotalReceive] = useState(0);
    const [formErrors, setFormErrors] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [selectedBills, setSelectedBills] = useState([]);
    const [selectedBill, setSelectedBill] = useState(null);
    const [startDueDateFilter, setStartDueDateFilter] = useState(new Date(now.getFullYear(), now.getMonth(), 1));
    const [endDueDateFilter, setEndDueDateFilter] = useState(new Date(now.getFullYear(), now.getMonth() + 1, 0));
    const [sortOrder, setSortOrder] = useState('');
    const [isPaidFilter, setIsPaidFilter] = useState(false);
    const [totalBills, setTotalBills] = useState(0);
    const [supplierFilter, setSupplierFilter] = useState(null);
    const [categoryFilter, setCategoryFilter] = useState(null);

    async function fetchData() {
        const data = await loadData();

        setBills(data.data);

        setTotalReceive(data.additional.totalReceive);

        setTotalPay(data.additional.totalPay);

        setHasMore(data.pagination.total > 15);

        setCurrentPage(1);
    }

    async function fetchMoreData () {
        const data = await loadData(currentPage + 1);

        setBills([...bills, ...data.data]);

        setTotalReceive(data.additional.totalReceive);

        setTotalPay(data.additional.totalPay);

        setCurrentPage((currentPage) => currentPage + 1);

        if (data.pagination.last_page === data.pagination.current_page) {
            setHasMore(false);
        } 
    }

    async function loadData(page = 1) { 
        let params = '?';

        params += `page=${page}`;

        params += `&filter[is_paid]=${isPaidFilter ? 1 : 0}`;

        if (startDueDateFilter != null) {
            params += `&filter[due_after]=${format(startDueDateFilter, 'yyyy-MM-dd')}`;
        }

        if (endDueDateFilter != null) {
            params += `&filter[due_before]=${format(endDueDateFilter, 'yyyy-MM-dd')}`;
        }

        if (supplierFilter) {
            params += `&filter[supplier_id]=${supplierFilter.id}`;
        }

        if (categoryFilter) {
            params += `&filter[category_id]=${categoryFilter.id}`;
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


    async function handleSubmit (billData) {
        const { errors, hasError } = validateData(billData, formValidation);

        setFormErrors(errors);

        if (!hasError) {
            try {
                let message = '';
                if (selectedBill) {
                    await api.put(`/bill/${selectedBill.id}`, { ...billData });

                    message = 'Registro alterado com sucesso';
                } else {
                    await api.post('/bill', { ...billData });

                    message = 'Registro criado com sucesso';
                }
                
                fetchData();
                
                toggleModal();

                toast.success(message);
            } catch (error) {
                toast.error('Algo deu errado. Por favor, revise os dados e tente novamente.');
            }
        }
    }

    function onSelect(billId) {
        selectBill(billId);
    }

    function toggleModal (bill = null) {
        setSelectedBill(bill);

        setIsModalOpen(!isModalOpen);
    }

    function selectBill(billId) {
        let newSelected = [];

        const prevSelected = selectedBills;

        if (prevSelected.includes(billId)) {
            newSelected = prevSelected.filter((id) => {
                return id != billId;
            });
        } else {
            newSelected = [...prevSelected, billId];
        }

        setSelectedBills(newSelected);
    }

    function onRowClick (billId) {
        const prevSelected = selectedBills;

        if (prevSelected.length > 0) {
            selectBill(billId);
        } else {
            const bill = bills.filter(value => {
                return value.id === billId;
            });

            toggleModal(bill[0]);
        }
    }

    useEffect(() => {
        async function setData() {
            const data = await loadData();

            setBills(data.data);

            setTotalReceive(data.additional.totalReceive);

            setTotalPay(data.additional.totalPay);
        }

        setData();
    }, []);

    useEffect(() => {
        async function setData() {
            const data = await loadData();

            setBills(data.data);

            setTotalReceive(data.additional.totalReceive);

            setTotalPay(data.additional.totalPay);
        }

        setData();
    }, [supplierFilter, startDueDateFilter, endDueDateFilter, sortOrder])

    return (
        <div className="flex flex-col w-full px-2 2xl:px-52 xl:px-32 md:mt-10 mt-1">
            <div className="flex gap-2 justify-between items-center">
                <Card variant='receive' amount={totalReceive} />
                <Card variant='pay' amount={totalPay} />
                <Card variant='total' amount={totalReceive - totalPay} />
            </div>
            <div className="h-full bg-white sm:mt-5 mt-2 rounded-md py-6 xl:px-8 px-2 shadow-xl">
                <div className="md:block hidden">
                    <TableHeader 
                        fetchData={() => fetchData()} 
                        startDueDateFilter={startDueDateFilter}
                        endDueDateFilter={endDueDateFilter}
                        sortOrder={sortOrder}
                        isPaidFilter={isPaidFilter}
                        setStartDueDateFilter={setStartDueDateFilter}
                        setEndDueDateFilter={setEndDueDateFilter}
                        setSortOrder={setSortOrder}
                        setIsPaidFilter={setIsPaidFilter}
                        selectedBills={selectedBills}
                        toggleModal={() => toggleModal()}
                        setSelectedBills={setSelectedBills}
                        setSupplierFilter={setSupplierFilter}
                        supplierFilter={supplierFilter}
                        setCategoryFilter={setCategoryFilter}
                        categoryFilter={categoryFilter}
                    />
                </div>
                <div id="scrollableBills" className="w-full sm:mt-8 m-1 flex flex-col min-h-[550px] max-h-[550px] overflow-y-auto">
                    <InfiniteScroll
                        dataLength={currentPage * 15} //This is important field to render the next data
                        next={fetchMoreData}
                        hasMore={hasMore}
                        scrollableTarget="scrollableBills"
                        scrollThreshold={0.9}
                    >
                        { bills.map(bill => {
                            return <TableRow 
                                key={bill.id}
                                id={bill.id} 
                                variant={bill.type}
                                isPaid={bill.is_paid} 
                                supplier={bill.supplier.name} 
                                dueAt={bill.due_at} 
                                referenceAt={bill.reference_at}
                                description={bill.description} 
                                category={bill.category}
                                amount={bill.amount}
                                onSelect={onSelect}
                                onRowClick={onRowClick}
                                isSelected={selectedBills.includes(bill.id)}
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
                <div className="relative bg-white text-zinc-600 max-w-full sm:min-w-[36rem] sm:min-h-[46.25rem] rounded-lg py-16 px-4 sm:px-12">
                    <X className="top-3 right-3 absolute" onClick={toggleModal} />
                    <h1 className="text-2xl">Cadastrar nova transação</h1>
                    <BillForm onSubmit={handleSubmit} errors={formErrors} bill={selectedBill}/>
                </div>
            </Modal>
            <div
                className="md:hidden block"
            >
                <TableHeader 
                    fetchData={() => fetchData()} 
                    startDueDateFilter={startDueDateFilter}
                    endDueDateFilter={endDueDateFilter}
                    sortOrder={sortOrder}
                    isPaidFilter={isPaidFilter}
                    setStartDueDateFilter={setStartDueDateFilter}
                    setEndDueDateFilter={setEndDueDateFilter}
                    setSortOrder={setSortOrder}
                    setIsPaidFilter={setIsPaidFilter}
                    selectedBills={selectedBills}
                    toggleModal={() => toggleModal()}
                    setSelectedBills={setSelectedBills}
                />
            </div>
        </div>
    )
}