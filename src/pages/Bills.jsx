import { Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { TableRow } from '../components/TableRow';
import { BillForm } from "../components/BillForm";
import { validateData } from "../formValidation";
import InfiniteScroll from 'react-infinite-scroll-component';
import { X } from "phosphor-react";
import api from '../api';

export function Bills () {
    const [bills, setBills] = useState([]);
    const [totalPay, setTotalPay] = useState(0);
    const [totalReceive, setTotalReceive] = useState(0);
    const [formErrors, setFormErrors] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        async function setData() {
            const data = await loadData();

            setBills(data.data);

            setTotalReceive(0);

            setTotalPay(data.additional.total);
        }

        setData();
        
    }, []);

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
        const response = await api.get('/bill', {
            params: {
                page
            }
        });

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

    function toggleModal () {
        setIsModalOpen(!isModalOpen);
    }

    return (
        <div className="flex flex-col w-full px-2 lg:px-52 md:mt-10 mt-1">
            <div className="flex flex-col md:flex-row gap-2 justify-between items-center">
                <Card variant='receive' amount={totalReceive} />
                <Card variant='pay' amount={totalPay} />
                <Card variant='total' amount={totalReceive - totalPay} />
            </div>
            <div className="h-full bg-white sm:mt-5 mt-2 rounded-md py-6 sm:px-8 px-2 shadow-xl">
                <button className="bg-brand sm:text-base text-sm sm:py-3 sm:px-8 py-3 px-3 rounded-md hover:bg-[#118B3A] transition-colors" onClick={toggleModal}>
                    Nova transação
                </button>
                <div id="scrollableBills" className="w-full sm:mt-8 m-1 flex flex-col gap-2 min-h-[550px] max-h-[550px] overflow-y-auto">
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
                                variant='pay' 
                                isPaid={bill.is_paid} 
                                supplier={bill.supplier} 
                                dueAt={bill.due_at} 
                                description={bill.description} 
                                category={bill.category}
                                amount={bill.amount}
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
                        <BillForm onSubmit={handleCreateBill} errors={formErrors}/>
                    </div>
                </Modal>
        </div>
    )
}