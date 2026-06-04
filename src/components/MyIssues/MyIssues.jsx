import { useDocumentTitle } from '../../hooks/dynamic_title/DynamicTitle';
import { use, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import Loading from '../Loading/Loading';
import Swal from 'sweetalert2';

const MyIssues = () => {
    // Dynamically set the document title
    useDocumentTitle("My Issues");

    const { user } = use(AuthContext);
    const [editData, setEditData] = useState(null);
    const [issues, setIssues] = useState([]);
    const [fetchLoading, setFetchLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            setFetchLoading(true);

            fetch(`http://localhost:3000/issues?email=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    data.sort((a, b) => b.amount - a.amount);
                    setIssues(data);
                }).finally(() => {
                    setFetchLoading(false);
                })
        }
    }, [user?.email]);

    const handleClose = () => {
        setEditData(null);
    }

    const handleChange = (e) => {
        
        setEditData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    const handleEdit = (issue) => {
        setEditData({ ...issue });
    }

    // ── Save to API ──
    const handleSave = async (id) => {
        try {
            const res = await fetch(`http://localhost:3000/issues/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editData),
            });
            if (res.ok) {
                // refresh your data here
                console.log('Done Adding');
                setIssues(prev =>
                    prev.map(issuem => issuem._id === id ? { ...issuem, ...editData } : issuem)
                );
                setEditData(null);

                /* Sweet Alert */
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "My Issue has been updated",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (err) {
            console.error(err);
        }
    };

    // ── Delete Issue ──
    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:3000/issues/${id}`, {
                method: "DELETE"
            }).then(res => res.json())
                .then(data => {
                    if (data.deletedCount) {
                        // Missing something like:
                        setIssues(prev => prev.filter(issue => issue._id !== id));

                        /* Sweet Alert */
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "My Issue has been deleted",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                });
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className='main-container section-space'>
            <div className="overflow-x-auto rounded-box border border-primary/20 bg-base-100">
                {/* ── My Issues  ── */}
                <table className="table table_issue_contribute w-full">
                    {/* ── head ── */}
                    <thead>
                        <tr className="bg-secondary/90">
                            <th className="border-primary/20">Name</th>
                            <th className="border-primary/20">Category</th>
                            <th className="border-primary/20">Date</th>
                            <th className="border-primary/20">Status</th>
                            <th className="border-primary/20 flex justify-end">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fetchLoading ?
                            (
                                <tr>
                                    <td colSpan={5} className="text-center py-10 opacity-50">
                                        <Loading></Loading>
                                    </td>
                                </tr>
                            )
                            : issues.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-10 opacity-50">
                                        No issues found.
                                    </td>
                                </tr>
                            )
                            :
                            (
                                issues.map((issue) =>
                                    <tr key={issue._id} className="bg-secondary/90">
                                        <td className="border-primary/20">
                                            <div>{issue.title}</div>
                                        </td>
                                        <td className='border-primary/20'>
                                            <span className='text-xs font-semibold px-3 py-1 rounded-3xl category_style'>{issue.category}</span>
                                        </td>
                                        <td className="border-primary/20">
                                            <div>
                                                {new Date(issue.date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </div>
                                        </td>
                                        <td className="border-primary/20">
                                            <span className={`text-xs font-semibold px-3 py-1 rounded-3xl status_style ${issue.status === 'ongoing'
                                                ? 'bg-green-500/20 text-green-500'
                                                : issue.status === 'ended'
                                                    ? 'bg-yellow-500/20 text-yellow-500'
                                                    : 'bg-primary/20 text-primary'
                                                }`}>
                                                {issue.status}
                                            </span>
                                        </td>
                                        <td className='border-primary/20'>
                                            <div className='flex gap-3 justify-end w-full'>
                                                <span className='text-xl cursor-pointer' onClick={() => handleEdit(issue)}><MdOutlineEdit /></span>
                                                <span className='text-xl cursor-pointer' onClick={() => handleDelete(issue._id)}><RiDeleteBin5Line /></span>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
                {/* ── MODAL ── */}
                {editData && <div className="fixed inset-0 z-50
                        flex items-center justify-center
                        bg-black/60 backdrop-blur-sm px-4"
                    onClick={handleClose}>

                    {/* Modal Card — stop propagation */}
                    <div className="w-full max-w-xl rounded-3xl p-8
                          border border-base-300 shadow-2xl bg-base-100 overflow-y-auto max-h-screen"
                        onClick={(e) => e.stopPropagation()}>

                        {/* Modal Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold heading-font"
                            >
                                Edit Issue
                            </h3>
                            <button
                                onClick={handleClose}
                                className="w-8 h-8 rounded-full bg-base-200
                           flex items-center justify-center
                           hover:bg-base-300 transition-colors
                           text-sm font-bold"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Form Fields */}
                        <div className="flex flex-col gap-4">

                            {/* Title */}
                            <div>
                                <label className="text-sm font-semibold block mb-1">
                                    Title
                                </label>
                                <input
                                    name="title"
                                    value={editData.title}
                                    onChange={handleChange}
                                    className="input w-full rounded-xl
                             border border-base-300 focus:outline-none focus:border-primary bg-secondary"
                                />
                            </div>

                            {/* Category + Status — 2 col */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-semibold block mb-1">
                                        Category
                                    </label>
                                    <select
                                        name="category"
                                        value={editData.category}
                                        onChange={handleChange}
                                        className="select w-full rounded-xl
                               border border-base-300 bg-secondary
                               focus:outline-none focus:border-primary"

                                    >
                                        <option>Garbage</option>
                                        <option>Road Damage</option>
                                        <option>Illegal Construction</option>
                                        <option>Broken Public Property</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="text-sm font-semibold block mb-1"
                                    >
                                        Status
                                    </label>
                                    <select
                                        name="status"
                                        value={editData.status}
                                        onChange={handleChange}
                                        className="select w-full rounded-xl
                               border border-base-300 bg-secondary
                               focus:outline-none focus:border-primary">
                                        <option value="ongoing">Ongoing</option>
                                        <option value="ended">Ended</option>
                                    </select>
                                </div>
                            </div>

                            {/* Amount + Date — 2 col */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-semibold block mb-1"
                                    >
                                        Amount ($)
                                    </label>
                                    <input
                                        name="amount"
                                        type="number"
                                        value={editData.amount}
                                        onChange={handleChange}
                                        className="input w-full rounded-xl
                               border border-base-300 bg-secondary
                               focus:outline-none focus:border-primary"/>
                                </div>

                                <div>
                                    <label className="text-sm font-semibold block mb-1">
                                        Date
                                    </label>
                                    <input
                                        name="date"
                                        type="date"
                                        value={editData.date?.slice(0, 10)}
                                        onChange={handleChange}
                                        className="input w-full rounded-xl
                               border border-base-300 bg-secondary
                               focus:outline-none focus:border-primary"/>
                                </div>
                            </div>

                            {/* Location */}
                            <div>
                                <label className="text-sm font-semibold block mb-1">
                                    Location
                                </label>
                                <input
                                    name="location"
                                    value={editData.location}
                                    onChange={handleChange}
                                    className="input w-full rounded-xl
                             border border-base-300 bg-secondary
                             focus:outline-none focus:border-primary"/>
                            </div>

                        </div>

                        {/* Modal Footer Buttons */}
                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => handleSave(editData._id)}
                                className="flex-1 btn rounded-xl font-semibold
                           text-sm border-none text-white py-3 bg-accent">
                                Save Changes
                            </button>
                            <button
                                onClick={handleClose}
                                className="flex-1 btn rounded-xl font-semibold
                           text-sm bg-secondary border-none py-3">
                                Cancel
                            </button>
                        </div>

                    </div>
                </div>}
            </div>
        </div>
    );
};

export default MyIssues;