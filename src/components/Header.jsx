import { Logo } from "./Logo";
import { CaretDown } from "phosphor-react";
import { Animated } from "react-animated-css";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export function Header() {
  const [isDropDownVisible, setIsDropdownvisible] = useState(false);

  const { logout, user } = useAuth();

  const navigate = useNavigate();

  async function handleLogout() {
    await logout();

    navigate('/login');
  }

  function toggleDropdown() {
    setIsDropdownvisible(!isDropDownVisible);
  }

  return (
    <header className="w-full h-20 bg-green-500 py-1 px-5 flex justify-between align-center">
      <Logo />
      <button className="flex items-center gap-2" onClick={toggleDropdown}>
        <div className="text-right">
          <p className="text-bold">{ `${user.firstname} ${user.lastname}` }</p>
        </div>
        <img
          src={ user.photo ?? 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'}
          alt=""
          className="rounded-full w-14"
        />
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
              <button
                type="button"
                class="text-gray-700 block w-full text-left px-4 py-2 text-sm"
                onClick={handleLogout}
              >
                Sair
              </button>
            </div>
          </div>
        </Animated>
      </div>
    </header>
  );
}
