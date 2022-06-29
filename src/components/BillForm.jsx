import classNames from "classnames";
import { ArrowCircleDown, ArrowCircleUp } from "phosphor-react";
import { useState } from "react";
import { reverseString } from "../utils";
import { DatePicker } from "./DatePicker";

export function BillForm ({ onSubmit, errors }) {
    const categories = [
        {
            id: '1231231232',
            name: "Vendas",
            description: 'Isso é uma categoria de vendas',
            icon: 'ShoppingCart',
            created_at: '2022-01-01 22:49:38',
            updated_at: '2022-01-01 22:49:38',
        },
        {
            id: 'zxcvzxv',
            name: "Mercado",
            description: 'Isso é uma categoria do mercado',
            icon: 'ShoppingCart',
            created_at: '2022-01-01 22:49:38',
            updated_at: '2022-01-01 22:49:38',
        }
    ];

    const suppliers = [
        {
            id: '1231231232',
            name: "Adonias Barbosa de Souza",
            created_at: '2022-01-01 22:49:38',
            updated_at: '2022-01-01 22:49:38',
        },
        {
            id: 'fdsafda',
            name: "Pag!",
            created_at: '2022-01-01 22:49:38',
            updated_at: '2022-01-01 22:49:38',
        },
        {
            id: 'cvzxvzx',
            name: "Digio",
            created_at: '2022-01-01 22:49:38',
            updated_at: '2022-01-01 22:49:38',
        },
        {
            id: '23eqwsea',
            name: "Copel",
            created_at: '2022-01-01 22:49:38',
            updated_at: '2022-01-01 22:49:38',
        }
    ]

    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [maskedAmount, setMaskedAmount] = useState('');
    const [reference, setReference] = useState(new Date());
    const [due, setDue] = useState(new Date());
    const [type, setType] = useState('');
    const [category, setCategory] = useState('');
    const [supplier, setSupplier] = useState('');

    function setBillType (billType) {
        setType(billType);
    }

    function handleSubmit (event) {
        event.preventDefault();

        let billData = {
            description,
            amount,
            reference,
            due,
            type,
            category,
            supplier
        };

        onSubmit(billData);
    }

    function handleAmountChange (value) {
        let maskedValue = reverseString(value.toString().replace(/[^\d]+/gi,''));

        const mask = reverseString("###.###.###.###.###,##");

        let result = '';

        for (var x=0, y=0; x < mask.length && y < maskedValue.length;) {
            if (mask.charAt(x) != '#') {
                result += mask.charAt(x);
                x++;
            } else {
                result += maskedValue.charAt(y);
                y++;
                x++;
            }
        }

        result = reverseString(result);

        setAmount(parseFloat(result.replace('.', '').replace(',', '.')));

        setMaskedAmount(`R$ ${result}`);
    }

    return (
        <form className="w-full max-w-full mt-8 flex flex-col items-center gap-2" onSubmit={handleSubmit}>
            <input
                className={classNames('bg-[#e7e9ee] rounded-md py-5 pl-6 w-full border', {
                    'border-[#d7d7d7]': !errors['description'],
                    'placeholder-[#969cb2]': !errors['description'],
                    'border-[#E52E4D]': errors['description'],
                    'placeholder-[#E52E4D]': errors['description'],
                })} 
                type="text"
                value={description}
                onChange={event => setDescription(event.target.value)}
                placeholder="Descrição"
            />
            <input
                className={classNames('bg-[#e7e9ee] rounded-md py-5 pl-6 w-full border', {
                    'border-[#d7d7d7]': !errors['amount'],
                    'placeholder-[#969cb2]': !errors['amount'],
                    'border-[#E52E4D]': errors['amount'],
                    'placeholder-[#E52E4D]': errors['amount'],
                })} 
                type="text"
                value={maskedAmount}
                onChange={event => handleAmountChange(event.target.value)}
                placeholder="Preço"
            />
            <div className="flex sm:flex-row flex-col gap-2">
                <DatePicker placeholder="Referência" setDate={setReference} value={reference} />
                <DatePicker placeholder="Vencimento" setDate={setDue} value={due} />
            </div>
            <div className="flex gap-2 sm:flex-row flex-col">
                <button
                    className={classNames('w-[17rem] max-w-[17rem] justify-center py-5 gap-7 flex-1 flex bg-[#e7e9ee] rounded-md placeholder-[#969cb2] border', {
                        'bg-[#33cc95] bg-opacity-30': type == 'receive',
                        'border-[#d7d7d7]': !errors['type'],
                        'border-[#E52E4D]': errors['type']
                    })} 
                    type="button"
                    placeholder="Refêrencia"
                    onClick={() => setBillType('receive')}
                >
                    <ArrowCircleUp color="#33cc95" size={24}/>
                    Entrada
                </button>

                <button
                    className={classNames('w-[17rem] max-w-[17rem] justify-center py-5 gap-7 flex-1 flex bg-[#e7e9ee] rounded-md placeholder-[#969cb2] border', {
                        'bg-[#e52e4d] bg-opacity-30': type == 'pay',
                        'border-[#d7d7d7]': !errors['type'],
                        'border-[#E52E4D]': errors['type']
                    })} 
                    type="button"
                    placeholder="Refêrencia"
                    onClick={() => setBillType('pay')}
                >
                    <ArrowCircleDown color="#e52e4d" size={24}/>
                    Saída
                </button>
            </div>
            <select
                className={classNames('form-select text-[#969CB2] bg-[#e7e9ee] appearance-none rounded-md py-5 pl-6 w-full placeholder-[#969cb2] border', {
                    'border-[#d7d7d7]': !errors['category'],
                    'border-[#E52E4D]': errors['category']
                })} 
                type="text"
                onChange={event => setCategory(event.target.value)}
            >
                <option value="">Categoria</option>
                {
                    categories.map(category => {
                        return <option key={category.id} value={category.id}>{category.name}</option>
                    })
                }
            </select>
            <select
                className={classNames('form-select text-[#969CB2] bg-[#e7e9ee] appearance-none rounded-md py-5 pl-6 w-full placeholder-[#969cb2] border', {
                    'border-[#d7d7d7]': !errors['supplier'],
                    'border-[#E52E4D]': errors['supplier']
                })} 
                type="text"
                onChange={event => setSupplier(event.target.value)}
            >
                <option value="">Fornecedor</option>
                {
                    suppliers.map(supplier => {
                        return <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                    })
                }
            </select>
            <button className="text-white font-bold text-base bg-brand py-3 w-full rounded-md hover:bg-[#118B3A] transition-colors" type="submit">
                Cadastrar
            </button>
        </form>
    );
}