import { useEffect, useState } from 'react';
import { use } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useDocumentTitle } from '../../hooks/dynamic_title/DynamicTitle';
import Swal from 'sweetalert2';
import { RiDeleteBin5Line } from "react-icons/ri";

const MyContribute = () => {
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
                fetch(`http://localhost:3000/contributes/${id}`, { method: 'DELETE' })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Your contribution has been deleted",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            setContributes(prev => prev.filter(c => c._id !== id));
                        }
                    });
            }
        });
    };

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:3000/contributes?email=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    data.sort((a, b) => b.amount - a.amount);
                    setContributes(data);
                });
        }
    }, [user?.email]);

    return (
        <div className='main-container section-space'>
            <div className="overflow-x-auto rounded-box border border-primary/20 bg-base-100">
                <table className="table table_issue_contribute w-full">
                    <thead>
                        <tr className="bg-secondary/90">
                            <th className="border-primary/20">Contributor Name</th>
                            <th className="border-primary/20">Issue ID</th>
                            <th className="border-primary/20">Paid Amount</th>
                            <th className="border-primary/20">Date</th>
                            <th className="border-primary/20 flex justify-end">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contributes.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center py-10 opacity-50">
                                    No contributions yet.
                                </td>
                            </tr>
                        ) : (
                            contributes.map((contribute, index) => (
                                <tr key={index} className="bg-secondary/90">
                                    <td className="border-primary/20">{contribute.name}</td>
                                    <td className="border-primary/20">
                                        <span className='text-xs font-semibold bg-secondary px-3 py-1 rounded-3xl'>
                                            {contribute.issueId}
                                        </span>
                                    </td>
                                    <td className="border-primary/20 font-bold text-primary">
                                        ${contribute.amount}
                                    </td>
                                    <td className="border-primary/20">
                                        {new Date(contribute.date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </td>
                                    <td className="border-primary/20">
                                        <div className='flex gap-3 justify-end w-full'>
                                            <span
                                                className='text-xl cursor-pointer text-red-500 hover:text-red-700'
                                                onClick={() => handleDeleteContribute(contribute._id)}
                                            >
                                                <RiDeleteBin5Line />
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyContribute;