import { NavLink } from 'react-router';
import { Link } from 'react-router';
import { use } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const Navbar = () => {
    const { user, signOutLogUser } = use(AuthContext);
    console.log('User from navbar', user);

    const signOutLogin = () => {
        signOutLogUser().then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
            console.log(error);
        });
    }

    const links = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/allIssues">All Issues</NavLink></li>
        
        { user?.uid? <>
            <li><NavLink to="/addIssue">Add Issue</NavLink></li>
            <li><NavLink to="/myIssues">My Issues</NavLink></li>
            <li><NavLink to="/myContributions"> My Contributions</NavLink></li>
            <li><div>
                <svg fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M16 15.503A5.041 5.041 0 1 0 16 5.42a5.041 5.041 0 0 0 0 10.083zm0 2.215c-6.703 0-11 3.699-11 5.5v3.363h22v-3.363c0-2.178-4.068-5.5-11-5.5z"></path></g></svg>
                
            </div></li>
            <button onClick={signOutLogin} className="btn">Sign Out</button>
        </>:
        <li><NavLink to="/register" className="btn-primary btn">Register</NavLink></li>}
    </>

    return (
        <header>
            <div className="navbar max-w-[1230px] mx-auto px-6">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <nav
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {links}
                        </nav>
                    </div>
                    <Link to="/" className="btn btn-ghost text-xl">Civic Care</Link>
                </div>
                <div className="navbar-center hidden lg:flex justify-end grow">
                    <nav className="menu menu-horizontal px-1">
                        {links}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Navbar;