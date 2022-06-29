import { Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { TableRow } from '../components/TableRow';
import { BillForm } from "../components/BillForm";
import { validateData } from "../formValidation";
import InfiniteScroll from 'react-infinite-scroll-component';
import { X } from "phosphor-react";

export function Bills () {
    const [bills, setBills] = useState([]);
    
    const localBills = [
        {
            id: '12211231',
            category: {
                id: '1231231232',
                name: "Vendas",
                description: 'Isso é uma categoria de vendas',
                icon: 'ShoppingCart',
                created_at: '2022-01-01 22:49:38',
                updated_at: '2022-01-01 22:49:38',
            },
            group: {
                id: '1231231232',
                name: "Família",
                created_at: '2022-01-01 22:49:38',
                updated_at: '2022-01-01 22:49:38',
            },
            supplier: {
                id: '1231231232',
                name: "Lucas Kaiut de Souza",
                created_at: '2022-01-01 22:49:38',
                updated_at: '2022-01-01 22:49:38',
            },
            user: {
                id: '1231231232',
                group: {
                    id: '1231231232',
                    name: "Família",
                    created_at: '2022-01-01 22:49:38',
                    updated_at: '2022-01-01 22:49:38',
                },
                firstname: 'Lucas',
                lastname: 'Kaiut de Souza',
                email: 'lucas.kaiut@gmail.com',
                photo: 'https://github.com/lucaskaiut.png',
                phone: '5541997498795',
                created_at: '2022-01-01 22:49:38',
                updated_at: '2022-01-01 22:49:38',
            },
            reference_at: '2022-01-01 22:37:41',
            description: 'Pagamento de site',
            amount: 457.98,
            due_at: '2022-07-05 22:37:41',
            original_due_at: '2022-07-05 22:37:41',
            is_paid: false,
            is_credit_card: false,
            created_at: '2022-01-01 22:49:38',
            updated_at: '2022-01-01 22:49:38',
        },
        {
            id: 'ssdfsaf',
            category: {
                id: '1231231232',
                name: "Vendas",
                description: 'Isso é uma categoria de vendas',
                icon: 'ShoppingCart',
                created_at: '2022-01-01 22:49:38',
                updated_at: '2022-01-01 22:49:38',
            },
            group: {
                id: '1231231232',
                name: "Família",
                created_at: '2022-01-01 22:49:38',
                updated_at: '2022-01-01 22:49:38',
            },
            supplier: {
                id: '1231231232',
                name: "Lucas Kaiut de Souza",
                created_at: '2022-01-01 22:49:38',
                updated_at: '2022-01-01 22:49:38',
            },
            user: {
                id: '1231231232',
                group: {
                    id: '1231231232',
                    name: "Família",
                    created_at: '2022-01-01 22:49:38',
                    updated_at: '2022-01-01 22:49:38',
                },
                firstname: 'Lucas',
                lastname: 'Kaiut de Souza',
                email: 'lucas.kaiut@gmail.com',
                photo: 'https://github.com/lucaskaiut.png',
                phone: '5541997498795',
                created_at: '2022-01-01 22:49:38',
                updated_at: '2022-01-01 22:49:38',
            },
            reference_at: '2022-01-01 22:37:41',
            description: 'Pagamento de site',
            amount: 457.98,
            due_at: '2022-07-29 22:37:41',
            original_due_at: '2022-07-05 22:37:41',
            is_paid: false,
            is_credit_card: false,
            created_at: '2022-01-01 22:49:38',
            updated_at: '2022-01-01 22:49:38',
        },
        {
            id: 'hgrfdsfhsdh',
            category: {
                id: '1231231232',
                name: "Vendas",
                description: 'Isso é uma categoria de vendas',
                icon: 'ShoppingCart',
                created_at: '2022-01-01 22:49:38',
                updated_at: '2022-01-01 22:49:38',
            },
            group: {
                id: '1231231232',
                name: "Família",
                created_at: '2022-01-01 22:49:38',
                updated_at: '2022-01-01 22:49:38',
            },
            supplier: {
                id: '1231231232',
                name: "Lucas Kaiut de Souza",
                created_at: '2022-01-01 22:49:38',
                updated_at: '2022-01-01 22:49:38',
            },
            user: {
                id: '1231231232',
                group: {
                    id: '1231231232',
                    name: "Família",
                    created_at: '2022-01-01 22:49:38',
                    updated_at: '2022-01-01 22:49:38',
                },
                firstname: 'Lucas',
                lastname: 'Kaiut de Souza',
                email: 'lucas.kaiut@gmail.com',
                photo: 'https://github.com/lucaskaiut.png',
                phone: '5541997498795',
                created_at: '2022-01-01 22:49:38',
                updated_at: '2022-01-01 22:49:38',
            },
            reference_at: '2022-01-01 22:37:41',
            description: 'Pagamento de site',
            amount: 457.98,
            due_at: '2022-07-29 22:37:41',
            original_due_at: '2022-07-05 22:37:41',
            is_paid: true,
            is_credit_card: false,
            created_at: '2022-01-01 22:49:38',
            updated_at: '2022-01-01 22:49:38',
        },
        {
            id: 'zxvcxczvxz',
            category: {
                id: '1231231232',
                name: "Vendas",
                description: 'Isso é uma categoria de vendas',
                icon: 'ShoppingCart',
                created_at: '2022-01-01 22:49:38',
                updated_at: '2022-01-01 22:49:38',
            },
            group: {
                id: '1231231232',
                name: "Família",
                created_at: '2022-01-01 22:49:38',
                updated_at: '2022-01-01 22:49:38',
            },
            supplier: {
                id: '1231231232',
                name: "Lucas Kaiut de Souza",
                created_at: '2022-01-01 22:49:38',
                updated_at: '2022-01-01 22:49:38',
            },
            user: {
                id: '1231231232',
                group: {
                    id: '1231231232',
                    name: "Família",
                    created_at: '2022-01-01 22:49:38',
                    updated_at: '2022-01-01 22:49:38',
                },
                firstname: 'Lucas',
                lastname: 'Kaiut de Souza',
                email: 'lucas.kaiut@gmail.com',
                photo: 'https://github.com/lucaskaiut.png',
                phone: '5541997498795',
                created_at: '2022-01-01 22:49:38',
                updated_at: '2022-01-01 22:49:38',
            },
            reference_at: '2022-01-01 22:37:41',
            description: 'Pagamento de site',
            amount: 457.98,
            due_at: '2022-07-29 22:37:41',
            original_due_at: '2022-07-05 22:37:41',
            is_paid: false,
            is_credit_card: false,
            created_at: '2022-01-01 22:49:38',
            updated_at: '2022-01-01 22:49:38',
        },
        {
            id: '5675768654',
            category: {
                id: '1231231232',
                name: "Vendas",
                description: 'Isso é uma categoria de vendas',
                icon: 'ShoppingCart',
                created_at: '2022-01-01 22:49:38',
                updated_at: '2022-01-01 22:49:38',
            },
            group: {
                id: '1231231232',
                name: "Família",
                created_at: '2022-01-01 22:49:38',
                updated_at: '2022-01-01 22:49:38',
            },
            supplier: {
                id: '1231231232',
                name: "Lucas Kaiut de Souza",
                created_at: '2022-01-01 22:49:38',
                updated_at: '2022-01-01 22:49:38',
            },
            user: {
                id: '1231231232',
                group: {
                    id: '1231231232',
                    name: "Família",
                    created_at: '2022-01-01 22:49:38',
                    updated_at: '2022-01-01 22:49:38',
                },
                firstname: 'Lucas',
                lastname: 'Kaiut de Souza',
                email: 'lucas.kaiut@gmail.com',
                photo: 'https://github.com/lucaskaiut.png',
                phone: '5541997498795',
                created_at: '2022-01-01 22:49:38',
                updated_at: '2022-01-01 22:49:38',
            },
            reference_at: '2022-01-01 22:37:41',
            description: 'Pagamento de site',
            amount: 457.98,
            due_at: '2022-07-29 22:37:41',
            original_due_at: '2022-07-05 22:37:41',
            is_paid: false,
            is_credit_card: false,
            created_at: '2022-01-01 22:49:38',
            updated_at: '2022-01-01 22:49:38',
        },        {
            id: 'bnvcgdfsgdsa',
            category: {
                id: '1231231232',
                name: "Vendas",
                description: 'Isso é uma categoria de vendas',
                icon: 'ShoppingCart',
                created_at: '2022-01-01 22:49:38',
                updated_at: '2022-01-01 22:49:38',
            },
            group: {
                id: '1231231232',
                name: "Família",
                created_at: '2022-01-01 22:49:38',
                updated_at: '2022-01-01 22:49:38',
            },
            supplier: {
                id: '1231231232',
                name: "Lucas Kaiut de Souza",
                created_at: '2022-01-01 22:49:38',
                updated_at: '2022-01-01 22:49:38',
            },
            user: {
                id: '1231231232',
                group: {
                    id: '1231231232',
                    name: "Família",
                    created_at: '2022-01-01 22:49:38',
                    updated_at: '2022-01-01 22:49:38',
                },
                firstname: 'Lucas',
                lastname: 'Kaiut de Souza',
                email: 'lucas.kaiut@gmail.com',
                photo: 'https://github.com/lucaskaiut.png',
                phone: '5541997498795',
                created_at: '2022-01-01 22:49:38',
                updated_at: '2022-01-01 22:49:38',
            },
            reference_at: '2022-01-01 22:37:41',
            description: 'Pagamento de site',
            amount: 457.98,
            due_at: '2022-07-29 22:37:41',
            original_due_at: '2022-07-05 22:37:41',
            is_paid: false,
            is_credit_card: false,
            created_at: '2022-01-01 22:49:38',
            updated_at: '2022-01-01 22:49:38',
        },        
        {
            id: '789sd78932432dsfer78qw9e',
            category: {
                id: '1231231232',
                name: "Vendas",
                description: 'Isso é uma categoria de vendas',
                icon: 'ShoppingCart',
                created_at: '2022-01-01 22:49:38',
                updated_at: '2022-01-01 22:49:38',
            },
            group: {
                id: '1231231232',
                name: "Família",
                created_at: '2022-01-01 22:49:38',
                updated_at: '2022-01-01 22:49:38',
            },
            supplier: {
                id: '1231231232',
                name: "Lucas Kaiut de Souza",
                created_at: '2022-01-01 22:49:38',
                updated_at: '2022-01-01 22:49:38',
            },
            user: {
                id: '1231231232',
                group: {
                    id: '1231231232',
                    name: "Família",
                    created_at: '2022-01-01 22:49:38',
                    updated_at: '2022-01-01 22:49:38',
                },
                firstname: 'Lucas',
                lastname: 'Kaiut de Souza',
                email: 'lucas.kaiut@gmail.com',
                photo: 'https://github.com/lucaskaiut.png',
                phone: '5541997498795',
                created_at: '2022-01-01 22:49:38',
                updated_at: '2022-01-01 22:49:38',
            },
            reference_at: '2022-01-01 22:37:41',
            description: 'Pagamento de site',
            amount: 457.98,
            due_at: '2022-07-29 22:37:41',
            original_due_at: '2022-07-05 22:37:41',
            is_paid: false,
            is_credit_card: false,
            created_at: '2022-01-01 22:49:38',
            updated_at: '2022-01-01 22:49:38',
        },
        {
            id: 'vcxbcvxdfga',
            category: {
                id: '1231231232',
                name: "Vendas",
                description: 'Isso é uma categoria de vendas',
                icon: 'ShoppingCart',
                created_at: '2022-01-01 22:49:38',
                updated_at: '2022-01-01 22:49:38',
            },
            group: {
                id: '1231231232',
                name: "Família",
                created_at: '2022-01-01 22:49:38',
                updated_at: '2022-01-01 22:49:38',
            },
            supplier: {
                id: '1231231232',
                name: "Lucas Kaiut de Souza",
                created_at: '2022-01-01 22:49:38',
                updated_at: '2022-01-01 22:49:38',
            },
            user: {
                id: '1231231232',
                group: {
                    id: '1231231232',
                    name: "Família",
                    created_at: '2022-01-01 22:49:38',
                    updated_at: '2022-01-01 22:49:38',
                },
                firstname: 'Lucas',
                lastname: 'Kaiut de Souza',
                email: 'lucas.kaiut@gmail.com',
                photo: 'https://github.com/lucaskaiut.png',
                phone: '5541997498795',
                created_at: '2022-01-01 22:49:38',
                updated_at: '2022-01-01 22:49:38',
            },
            reference_at: '2022-01-01 22:37:41',
            description: 'Pagamento de site',
            amount: 457.98,
            due_at: '2022-07-29 22:37:41',
            original_due_at: '2022-07-05 22:37:41',
            is_paid: false,
            is_credit_card: false,
            created_at: '2022-01-01 22:49:38',
            updated_at: '2022-01-01 22:49:38',
        },
        {
            id: 'sfsafs',
            category: {
                id: '1231231232',
                name: "Vendas",
                description: 'Isso é uma categoria de vendas',
                icon: 'ShoppingCart',
                created_at: '2022-01-01 22:49:38',
                updated_at: '2022-01-01 22:49:38',
            },
            group: {
                id: '1231231232',
                name: "Família",
                created_at: '2022-01-01 22:49:38',
                updated_at: '2022-01-01 22:49:38',
            },
            supplier: {
                id: '1231231232',
                name: "Lucas Kaiut de Souza",
                created_at: '2022-01-01 22:49:38',
                updated_at: '2022-01-01 22:49:38',
            },
            user: {
                id: '1231231232',
                group: {
                    id: '1231231232',
                    name: "Família",
                    created_at: '2022-01-01 22:49:38',
                    updated_at: '2022-01-01 22:49:38',
                },
                firstname: 'Lucas',
                lastname: 'Kaiut de Souza',
                email: 'lucas.kaiut@gmail.com',
                photo: 'https://github.com/lucaskaiut.png',
                phone: '5541997498795',
                created_at: '2022-01-01 22:49:38',
                updated_at: '2022-01-01 22:49:38',
            },
            reference_at: '2022-01-01 22:37:41',
            description: 'Pagamento de site',
            amount: 457.98,
            due_at: '2022-07-29 22:37:41',
            original_due_at: '2022-07-05 22:37:41',
            is_paid: false,
            is_credit_card: false,
            created_at: '2022-01-01 22:49:38',
            updated_at: '2022-01-01 22:49:38',
        },
        {
            id: 'cbdfgasas',
            category: {
                id: '1231231232',
                name: "Vendas",
                description: 'Isso é uma categoria de vendas',
                icon: 'ShoppingCart',
                created_at: '2022-01-01 22:49:38',
                updated_at: '2022-01-01 22:49:38',
            },
            group: {
                id: '1231231232',
                name: "Família",
                created_at: '2022-01-01 22:49:38',
                updated_at: '2022-01-01 22:49:38',
            },
            supplier: {
                id: '1231231232',
                name: "Lucas Kaiut de Souza",
                created_at: '2022-01-01 22:49:38',
                updated_at: '2022-01-01 22:49:38',
            },
            user: {
                id: '1231231232',
                group: {
                    id: '1231231232',
                    name: "Família",
                    created_at: '2022-01-01 22:49:38',
                    updated_at: '2022-01-01 22:49:38',
                },
                firstname: 'Lucas',
                lastname: 'Kaiut de Souza',
                email: 'lucas.kaiut@gmail.com',
                photo: 'https://github.com/lucaskaiut.png',
                phone: '5541997498795',
                created_at: '2022-01-01 22:49:38',
                updated_at: '2022-01-01 22:49:38',
            },
            reference_at: '2022-01-01 22:37:41',
            description: 'Pagamento de site',
            amount: 457.98,
            due_at: '2022-07-29 22:37:41',
            original_due_at: '2022-07-05 22:37:41',
            is_paid: false,
            is_credit_card: false,
            created_at: '2022-01-01 22:49:38',
            updated_at: '2022-01-01 22:49:38',
        },
        {
            id: 'sfda489fds789dsaf789',
            category: {
                id: '1231231232',
                name: "Vendas",
                description: 'Isso é uma categoria de vendas',
                icon: 'ShoppingCart',
                created_at: '2022-01-01 22:49:38',
                updated_at: '2022-01-01 22:49:38',
            },
            group: {
                id: '1231231232',
                name: "Família",
                created_at: '2022-01-01 22:49:38',
                updated_at: '2022-01-01 22:49:38',
            },
            supplier: {
                id: '1231231232',
                name: "Lucas Kaiut de Souza",
                created_at: '2022-01-01 22:49:38',
                updated_at: '2022-01-01 22:49:38',
            },
            user: {
                id: '1231231232',
                group: {
                    id: '1231231232',
                    name: "Família",
                    created_at: '2022-01-01 22:49:38',
                    updated_at: '2022-01-01 22:49:38',
                },
                firstname: 'Lucas',
                lastname: 'Kaiut de Souza',
                email: 'lucas.kaiut@gmail.com',
                photo: 'https://github.com/lucaskaiut.png',
                phone: '5541997498795',
                created_at: '2022-01-01 22:49:38',
                updated_at: '2022-01-01 22:49:38',
            },
            reference_at: '2022-01-01 22:37:41',
            description: 'Pagamento de site',
            amount: 457.98,
            due_at: '2022-07-29 22:37:41',
            original_due_at: '2022-07-05 22:37:41',
            is_paid: false,
            is_credit_card: false,
            created_at: '2022-01-01 22:49:38',
            updated_at: '2022-01-01 22:49:38',
        },
        {
            id: '78978921789213789213',
            category: {
                id: '1231231232',
                name: "Vendas",
                description: 'Isso é uma categoria de vendas',
                icon: 'ShoppingCart',
                created_at: '2022-01-01 22:49:38',
                updated_at: '2022-01-01 22:49:38',
            },
            group: {
                id: '1231231232',
                name: "Família",
                created_at: '2022-01-01 22:49:38',
                updated_at: '2022-01-01 22:49:38',
            },
            supplier: {
                id: '1231231232',
                name: "Lucas Kaiut de Souza",
                created_at: '2022-01-01 22:49:38',
                updated_at: '2022-01-01 22:49:38',
            },
            user: {
                id: '1231231232',
                group: {
                    id: '1231231232',
                    name: "Família",
                    created_at: '2022-01-01 22:49:38',
                    updated_at: '2022-01-01 22:49:38',
                },
                firstname: 'Lucas',
                lastname: 'Kaiut de Souza',
                email: 'lucas.kaiut@gmail.com',
                photo: 'https://github.com/lucaskaiut.png',
                phone: '5541997498795',
                created_at: '2022-01-01 22:49:38',
                updated_at: '2022-01-01 22:49:38',
            },
            reference_at: '2022-01-01 22:37:41',
            description: 'Pagamento de site',
            amount: 457.98,
            due_at: '2022-07-29 22:37:41',
            original_due_at: '2022-07-05 22:37:41',
            is_paid: false,
            is_credit_card: false,
            created_at: '2022-01-01 22:49:38',
            updated_at: '2022-01-01 22:49:38',
        }
    ];

    useEffect(() => {
        setBills(localBills);
    }, []);

    function fetchData () {
        setTimeout(loadData, 2000);
    }

    function loadData() { 
        const newBills = [...bills, ...bills];
            setBills(newBills);
    }

    const formValidation = {
        description: [
            'required'
        ],
        amount: [
            'required',
            'numeric'
        ],
        reference: [
            'required',
            'date'
        ],
        due: [
            'required',
            'date'
        ],
        type: [
            'required'
        ],
        supplier: [
            'required'
        ],
        category: [
            'required'
        ]
    }

    const [formErrors, setFormErrors] = useState([]);

    function handleCreateBill (billData) {
        const errors = validateData(billData, formValidation);

        setFormErrors(errors);
    }

    const [isModalOpen, setIsModalOpen] = useState(false);

    function toggleModal () {
        setIsModalOpen(!isModalOpen);
    }

    return (
        <div className="flex flex-col w-full px-2 lg:px-52 md:mt-10 mt-1">
            <div className="flex flex-col md:flex-row gap-2 justify-between items-center">
                <Card variant='receive' amount={1829.72} />
                <Card variant='pay' amount={1829.72} />
                <Card variant='total' amount={1829.72} />
            </div>
            <div className="h-full bg-white sm:mt-5 mt-2 rounded-md py-6 sm:px-8 px-2 shadow-xl">
                <button className="bg-brand sm:text-base text-sm sm:py-3 sm:px-8 py-3 px-3 rounded-md hover:bg-[#118B3A] transition-colors" onClick={toggleModal}>
                    Nova transação
                </button>
                <div id="scrollableBills" className="w-full sm:mt-8 m-1 flex flex-col gap-2 min-h-[550px] max-h-[550px] overflow-y-auto">
                    <InfiniteScroll
                        dataLength={bills.length} //This is important field to render the next data
                        next={fetchData}
                        hasMore={true}
                        scrollableTarget="scrollableBills"
                    >
                        { bills.map(bill => {
                            return <TableRow 
                                key={bill.id} 
                                variant='receive' 
                                isPaid={bill.is_paid} 
                                supplier={bill.supplier.name} 
                                dueAt={bill.due_at} 
                                description={bill.description} 
                                category={bill.category}
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