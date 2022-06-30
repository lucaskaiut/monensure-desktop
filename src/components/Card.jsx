import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "phosphor-react";
import NumberFormat from "react-number-format";

export function Card ({ variant, amount }) {
    const variants = {
        receive: {
            label: 'Contas a receber',
            icon: <ArrowCircleUp size={24} color="#33cc95"/>
        },
        pay: {
            label: 'Contas a pagar',
            icon: <ArrowCircleDown size={24} color="#e52e4d"/>
        },
        total: {
            label: 'Total',
            icon: <CurrencyDollar size={24} color="#33cc95"/>
        },
    }

    return (
        <div className="bg-white rounded-md text-zinc-400 max-w-full w-full md:w-80 h-20 sm:h-32 flex flex-col gap-5 justify-center px-5 shadow-xl">
            <div className="flex justify-between">
                <p>{ variants[variant].label }</p>
                { variants[variant].icon }
            </div>
            <strong className="sm:text-4xl text-lg text-[#363F5F]">
                <NumberFormat 
                    value={amount} 
                    fixedDecimalScale
                    decimalScale={2}
                    displayType="text" 
                    decimalSeparator=","
                    thousandSeparator="."
                    prefix="R$ "
                />
            </strong>
        </div>
    );
}