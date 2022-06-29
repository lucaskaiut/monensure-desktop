import classNames from "classnames";
import NumberFormat from 'react-number-format';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export function TableRow ({ variant, isPaid, description, supplier, category, dueAt }) {
    return (
        <div className={classNames('cursor-pointer hover:bg-slate-200 transition-colors flex text-[#363f5f] justify-between items-center bg-[#fff] sm:px-3 px-1 py-3 rounded-md shadow', {
            'line-through': isPaid
        })}>
            <div className="flex">
                <div>
                    <div className="sm:hidden">
                        <p className="text-sm">{description}</p>
                    </div>
                    <p className="md:text-base text-xs text-zinc-400 sm:text-zinc-900">
                        {format(new Date(dueAt), 'dd/MM/yyyy', {
                            locale: ptBR
                        })}
                    </p>
                    <p className="md:text-sm text-xs text-zinc-400 hidden sm:block">
                        {category.name}
                    </p>
                </div>
            </div>
            <div className="hidden sm:block">
                <p>{description}</p>
                <p className="text-sm text-zinc-400">{supplier}</p>
            </div>
            <div>
                <p 
                    className={classNames('', {
                        'text-[#33cc95]': variant == 'receive',
                        'text-[#E52E4D]': variant == 'pay'
                    })}
                >
                    { 
                        <NumberFormat 
                            value={12000.89} 
                            displayType="text" 
                            decimalSeparator=","
                            thousandSeparator="."
                            prefix="R$ "
                        />
                    }
                </p>
                <p className="md:text-sm text-xs text-zinc-400 sm:hidden block">
                    {category.name}
                </p>
            </div>
        </div>
    );
}