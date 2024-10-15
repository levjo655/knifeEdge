import logo from "../Images/knifeEdgeLogo.png";
const Header = () => {
  return (
    <div className="flex w-full justify-between bg-slate-300">
      <img
        className="w-10 h-auto justify-start"
        src={logo}
        alt="knifeEdge logo"
      />
      <header className="header justify-between items-end py-4 px-8 ">
        <nav className="flex space-x-6 justify-end">
          <ul className="flex space-x-16 justify-end">
            <li className="hover:text-gray-700 cursor-pointer">Home</li>
            <li className="hover:text-gray-700 cursor-pointer">Profile</li>
            <li className="hover:text-gray-700 cursor-pointer">Recepies</li>
            <li className="hover:text-gray-700 cursor-pointer">About</li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
