import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
    const [open, setOpen] = React.useState(false);
    const { user, setUser, setShowUserLogin, navigate, setSearchQuery, searchQuery ,getCartCount,getCartAmount,axios} = useAppContext();
    const location = useLocation();
    const logout = async () => {
        try {
            const {data} =  await axios.get('/api/user/logout');
            if(data.success){
                toast.success(data.message);
                setUser('');
                navigate('/');
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

useEffect(() => {
  const allowedPaths = ['/', '/products'];
  if (allowedPaths.includes(location.pathname)) {
    if (searchQuery.length > 0 && location.pathname !== '/products') {
      navigate('/products');
    } else if (searchQuery.length === 0 && location.pathname === '/products') {
      navigate('/', { replace: true }); // force redirect to home
    }
  }
}, [searchQuery, navigate, location.pathname]);


    return (
        <nav className="flex items-center justify-between px-4 sm:px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">

            {/* Logo */}
            <NavLink to='/' onClick={() => { setOpen(false) }}>
                <img className="h-9" src={assets.logo} alt="GreenCart Logo" />
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/products">All Product</NavLink>
                <NavLink to="/">Contact</NavLink>

                {/* Search - visible only on lg+ screens */}
                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input
                        onChange={(e) => setSearchQuery(e.target.value)} 
                        className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
                        type="text"
                        placeholder="Search products"
                    />
                    <img src={assets.search_icon} alt="search" className='w-4 h-4' />
                </div>

                {/* Cart */}
                <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
                    <img src={assets.nav_cart_icon} alt="cart" className='w-6 opacity-80' />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
                </div>

                {/* User Login/Profile */}
                {!user ? (
                    <button onClick={() => setShowUserLogin(true)} className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full">
                        Login
                    </button>
                ) : (
                    <div className='relative group'>
                        <img src={assets.profile_icon} className='w-10' alt="profile" />
                        <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40">
                            <li onClick={() => navigate("my-orders")} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>MY orders</li>
                            <li onClick={logout} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>Logout</li>
                        </ul>
                    </div>
                )}
            </div>
              <div className='flex items-center gap-6 sm:hidden'>

  <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
    <img src={assets.nav_cart_icon} alt="cart" className='w-6 opacity-80' />
    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
      {getCartCount()}
    </button>
  </div>

   {/* Menu icon (mobile only) */}
  <button onClick={() => setOpen(!open)} aria-label="Menu" className="z-50">
    <img src={assets.menu_icon} alt="menu" className="w-6 opacity-80" />
  </button>
</div>

           
            {/* Mobile Menu */}
            {open && (
                <div className="sm:hidden absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex flex-col items-start gap-2 px-5 text-sm z-40">
                    <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
                    <NavLink to="/products" onClick={() => setOpen(false)}>All Products</NavLink>
                    {user && (
                        <NavLink to="/my-orders" onClick={() => setOpen(false)}>My Orders</NavLink>
                    )}
                    <NavLink to="/" onClick={() => setOpen(false)}>Contact</NavLink>
                    <div className="flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full w-[200px] mt-2">
                    <input
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
                        type="text"
                        placeholder="Search products"
                    />
                    <img src={assets.search_icon} alt="search" className='w-4 h-4' />
                </div>
                    
                    {!user ? (
                        <button onClick={() => {
                            setOpen(false);
                            setShowUserLogin(true);
                        }} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
                            Login
                        </button>
                    ) : (
                        <button onClick={logout} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
                            Logout
                        </button>
                    )}

                    
                </div>
            )}
        </nav>
    );
};

export default Navbar;
