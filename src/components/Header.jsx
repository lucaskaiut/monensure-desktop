import { Logo } from "./Logo";
import { CaretDown } from 'phosphor-react';
import { Animated } from "react-animated-css";
import { useState } from "react";

export function Header () {
    const [isDropDownVisible, setIsDropdownvisible] = useState(false);

    function toggleDropdown () {
        setIsDropdownvisible(!isDropDownVisible);
    }

    return (
       <header
        className="w-full h-20 bg-brand py-1 px-5 flex justify-between align-center"
       >
            <Logo />
            <button className="flex items-center gap-2" onClick={toggleDropdown}>
                <div className="text-right">
                    <p className="text-bold">Lucas Kaiut</p>
                    <p className="text-sm">Família</p>
                </div>
                <img src="https://github.com/lucaskaiut.png" alt="" className="rounded-full w-14"/>
                <CaretDown size={24} />
            </button>
            
            <div className="origin-top-right absolute right-4 mt-20">
                <Animated 
                    animationIn="fadeInDown" 
                    animationOut="fadeOutUp" 
                    isVisible={isDropDownVisible}
                    animationInDuration={400} 
                    animationOutDuration={400}
                >
                    <div class="w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div class="py-1">
                            <button type="submit" class="text-gray-700 block w-full text-left px-4 py-2 text-sm">Sair</button>
                        </div>
                    </div>
                </Animated>
            </div>
            
       </header> 
    );
}