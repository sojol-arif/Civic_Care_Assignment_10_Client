import { NavLink } from 'react-router';
import { Link } from 'react-router';
import { use } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import ThemeToggle from '../../hooks/ThemeToggle/ThemeToggle';
import Loading from '../Loading/Loading';

const Navbar = () => {
    const { user, signOutLogUser, loading } = use(AuthContext);

    const signOutLogin = () => {
        signOutLogUser().then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
            console.log(error);
        });
    }

    const avatarLetter = user?.displayName
        ? user.displayName.charAt(0).toUpperCase()
        : user?.email?.charAt(0).toUpperCase();

    const avatarDropdown = user && (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                {user.photoURL ? (
                    <div className="w-10 rounded-full">
                        <img alt={user.displayName || 'Profile'} src={user.photoURL} referrerPolicy="no-referrer" />
                    </div>
                ) : (
                    <div className="avatar avatar-placeholder">
                        <div className="bg-accent text-accent-content w-10 rounded-full">
                            <span className="text-lg font-bold">{avatarLetter}</span>
                        </div>
                    </div>
                )}
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-9999 mt-3 w-52 p-2 shadow">
                <li>
                    <button onClick={signOutLogin} className="btn btn-accent text-accent-content w-full mt-1">
                        Sign Out
                    </button>
                </li>
            </ul>
        </div>
    );

    const links = <>
        <li><NavLink to="/" className="color-nav">Home</NavLink></li>
        <li><NavLink to="/allIssues" className="color-nav">All Issues</NavLink></li>

        {user ?
            (
                <>
                    <li><NavLink to="/myIssues" className="color-nav">My Issues</NavLink></li>
                    <li><NavLink to="/myContributions" className="color-nav">My Contributions</NavLink></li>

                    {loading ? null : avatarDropdown}
                </>
            )
            :
            (
                <li>
                    <NavLink to="/register" className="btn btn-accent register rounded-2xl ml-2">
                        Register
                    </NavLink>
                </li>
            )
        }
    </>

    return (
        <header className='nav_header sticky top-0 z-[9999]'>
            <div className="navbar main-container">
                <div className="navbar-start w-full">
                    <div className="dropdown mr-3 lg:mr-0">
                        <div tabIndex={0} role="button" className="btn btn-secondary lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <nav
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {links}
                        </nav>
                    </div>
                    <Link to="/" className="text-xl text-primary mr-3 font-black heading-font">Civic Care </Link>
                    <ThemeToggle></ThemeToggle>
                </div>
                <nav className="navbar-center hidden lg:flex justify-end grow">
                    <ul className="menu menu-horizontal px-1">
                        {loading ?
                            <Loading></Loading>
                            :
                            links
                        }
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;