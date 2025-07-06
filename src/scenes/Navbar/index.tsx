import LOGO from "@/assets/WRYON LOGO.jpg";
import {
  PlusCircleIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

type NavbarProps = {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

const Navbar = ({ searchQuery, setSearchQuery }: NavbarProps) => {
  return (
    <nav className="fixed top-0 z-30 w-full bg-purple-200 py-4 shadow-md">
      <div className="flex items-center justify-between w-5/6 mx-auto gap-4 flex-wrap">
        {/* LEFT: Logo */}
        <Link to="/">
          <div className="flex items-center gap-2">
            <img
              className="h-12 w-12 rounded-full object-cover"
              src={LOGO}
              alt="logo-nav"
            />
            <span className="font-bold text-lg text-purple-900">WRYON</span>
          </div>
        </Link>

        {/* CENTER: Search Bar */}
        <div className="flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-md border-2 border-black-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition "
          />
        </div>

        {/* RIGHT: Icons and Add Product */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-1 text-black-900 hover:text-red-600 transition"
          >
            <HomeIcon className="h-6 w-6" />
            <span className="hidden sm:inline">Home</span>
          </Link>
          <Link
            to="/addProduct"
            className="flex items-center gap-1 text-black-900 hover:text-red-600 transition"
          >
            <PlusCircleIcon className="h-6 w-6" />
            <span className="hidden sm:inline">Add Product</span>
          </Link>
          <Link
            to="/cart"
            className="flex items-center gap-1 text-black-900 hover:text-red-600 transition"
          >
            <ShoppingBagIcon className="h-6 w-6" />
            <span className="hidden sm:inline">Add To Cart</span>
          </Link>
          <UserCircleIcon className="h-7 w-7 text-gray-800 cursor-pointer hover:text-purple-600 transition" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
