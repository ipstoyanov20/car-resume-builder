import { Outlet, NavLink } from 'react-router-dom';
function NavMenu() {
    return (
      <>
       
        <div className="z-30 absolute top-0 left-0 p-10">
          <NavLink
            to="/"
            className=" relative before:bg-[url('../src/assets/left.png')] pl-12 before:absolute before:left-0 before:top-0 before:w-10 before:h-10 before:bg-no-repeat before:bg-contain text-black transition-all duration-75 hover:border-b-4 hover:border-b-[#F1A300] m-3 px-4 py-2 hover:cursor-pointer"
          >
            Home page
          </NavLink>
        </div>

        <Outlet />
      </>
    );
}

export default NavMenu;