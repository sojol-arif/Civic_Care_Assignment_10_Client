import { useEffect, useState } from 'react';
import { use } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useDocumentTitle } from '../../hooks/dynamic_title/DynamicTitle';

const MyContribute = () => {
    // Dynamically set the document title
    useDocumentTitle("My Contributions - Civic Care");
    const { user } = use(AuthContext);
    const [bids, setBids] = useState([]);

    // const handleDeleteBid = (id) => {

    // }

    useEffect(() => {
        console.log(user);
        if (user?.email) {
            fetch(`http://localhost:3000/bids?email=${user.email}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log('Bids for this user', data);
                    localStorage.setItem('token', data.token);
                    setBids(data);
                }
                );
        }
    }, [user]);

    return (
        <div className='max-w-[1200px] mx-auto py-13 md:py-20'>
            <div>
                <div className="overflow-x-auto">
                    <h2>Bid for this product: {bids.length}</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>SL No.</th>
                                <th>Product</th>
                                <th>Seller</th>
                                <th>Bid Price</th>
                                <th>Bid Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {bids.map((bid, index) => (
                                <tr key={bid.product}>
                                    <td>{index + 1}</td>
                                    <td>Yancy Tear Brand</td>
                                    <td>{bid.buyer_name}</td>
                                    <td>{bid.bid_price}</td>
                                    <td>
                                        {bid.status == 'pending' ?
                                            <div className="badge badge-warning">
                                                <svg className="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"><g fill="currentColor"><path d="M7.638,3.495L2.213,12.891c-.605,1.048,.151,2.359,1.362,2.359H14.425c1.211,0,1.967-1.31,1.362-2.359L10.362,3.495c-.605-1.048-2.119-1.048-2.724,0Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path><line x1="9" y1="6.5" x2="9" y2="10" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></line><path d="M9,13.569c-.552,0-1-.449-1-1s.448-1,1-1,1,.449,1,1-.448,1-1,1Z" fill="currentColor" data-stroke="none" stroke="none"></path></g></svg>
                                                Warning
                                            </div>
                                            :
                                            <div className="badge badge-success">
                                                <svg className="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor" strokeLinejoin="miter" strokeLinecap="butt"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeLinecap="square" stroke-miterlimit="10" strokeWidth="2"></circle><polyline points="7 13 10 16 17 8" fill="none" stroke="currentColor" strokeLinecap="square" stroke-miterlimit="10" strokeWidth="2"></polyline></g></svg>
                                                Success
                                            </div>
                                        }
                                    </td>
                                    <td>
                                        <button onClick={() => handleDeleteBid(bid._id)} className='btn btn-ghost btn-xs btn-outline'>Remove Bid</button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyContribute;