import { useEffect, useState } from 'react';
import { use } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useDocumentTitle } from '../../hooks/dynamic_title/DynamicTitle';
import Swal from 'sweetalert2';

const MyContribute = () => {
    // Dynamically set the document title
    useDocumentTitle("My Contributions - Civic Care");
    const { user } = use(AuthContext);
    const [contributes, setContributes] = useState([]);

    const handleDeleteContribute = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/contributes/${id}`,
                    {
                        method: 'DELETE'
                    }
                )
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Your Contribute has been deleted",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            const remainingContributes = contributes.filter(contribute => 
                                contribute._id !== id);
                            setContributes(remainingContributes);
                        }
                    }
                    );
            };
        });
    }

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:3000/contributes?email=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    data.sort((a, b) => b.amount - a.amount);
                    setContributes(data);
                }
                );
        }
    }, [user?.email]);

    return (
        <div className='max-w-[1200px] mx-auto py-13 md:py-20'>
            <div>
                <div className="overflow-x-auto">
                    <h2>Bid for this product: {contributes.length}</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th className='uppercase'>Issue Title</th>
                                <th className='uppercase'>Category</th>
                                <th className='uppercase'>Paid Amount</th>
                                <th className='uppercase'>Date</th>
                                <th className='uppercase'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {contributes.map((contribute, index) => (
                                <tr key={index}>
                                    <td>Yancy Tear Brand</td>
                                    <td>{contribute.issueId}</td>
                                    <td>${contribute.amount}</td>
                                    <td>
                                        {contribute.date}
                                    </td>
                                    <td>
                                        <button onClick={() => handleDeleteContribute(contribute._id)} className='btn btn-ghost btn-xs btn-outline'>Remove</button>
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