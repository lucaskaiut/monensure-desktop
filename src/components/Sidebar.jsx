import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";

export function Sidebar () {
    const location = useLocation();

    return (
        <aside className="min-h-[calc(100vh-5rem)] h-full bg-zinc-800 min-w-[18rem] flex flex-col items-center gap-2 py-5">
            <Link to="/" className={classNames('hover:bg-zinc-900 transition-colors py-2 px-5 w-56 rounded-md', {
                'bg-zinc-900': location.pathname == '/'
            })}>Contas</Link>
            <Link to="/categories" className={classNames('hover:bg-zinc-900 transition-colors py-2 px-5 w-56 rounded-md', {
                'bg-zinc-900': location.pathname == '/categories'
            })}>Categorias</Link>
        </aside>
    )
}