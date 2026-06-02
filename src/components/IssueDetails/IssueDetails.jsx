import { useLoaderData } from "react-router";
import { useDocumentTitle } from '../../hooks/dynamic_title/DynamicTitle';
// src/pages/IssueDetail/IssueDetail.jsx
import { Link, } from "react-router";
import { CiLocationOn } from "react-icons/ci";
import { MdMap } from "react-icons/md";
import { FiEye } from "react-icons/fi";
import { BsCalendar3 } from "react-icons/bs";
import { FaInfoCircle, FaCog } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { use } from "react";
import { AuthContext } from '../../contexts/AuthContext';
import Swal from 'sweetalert2'

const IssueDetails = () => {
    // Dynamically set the document title
    useDocumentTitle("Issue Details");

    const issue = useLoaderData();
    console.log(issue, 'data from loader');
    const bidModalRef = useRef(null);

    /* User */
    const { _id: issueId } = useLoaderData();
    console.log(issueId, "_id from useLoaderData()");
    const { user } = use(AuthContext);
    console.log(user, 'issueDetails User');
    const [contributes, setContributes] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/issues/contribute/${issueId}`)
            .then(res => res.json())
            .then(data => {
                console.log('Contribute for this product', data);
                data.sort((a, b) => b.amount - a.amount);
                setContributes(data);
            })
    }, [issueId]);

    // Sum all together
    const amounts = contributes.map((contribute) => Number(contribute.amount));
    const totalCollected = amounts.reduce((sum, amount) => sum + amount, 0);

    const target = Number(issue.amount);
    const pct = Math.min(Math.round((totalCollected / target) * 100), 100);

    const handleContributeSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const contribute = Number(e.target.contribute.value);
        const phone = e.target.phone.value;
        const address = e.target.address.value;
        const additional = e.target.additonal.value;
        const fullDate = new Date();
        const date = fullDate.toLocaleString();
        console.log(name, email, contribute, date, 'Submit Form modal');

        const newContribute = {
            issueId: issueId,
            amount: contribute,
            name: name,
            email: email,
            phone: phone,
            address: address,
            date: date,
            additionalInfo: additional,
        }

        fetch('http://localhost:3000/contributes', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newContribute)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data, 'after submit contribute form');
                if (data.insertedId) {
                    bidModalRef.current.close();

                    /* Sweet Alert */
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your Contribute has been placed",
                        showConfirmButton: false,
                        timer: 1500
                    });

                    newContribute._id = data.insertedId;
                    const newContributes = [...contributes, newContribute];
                    newContributes.sort((a, b) => b.amount - a.amount);
                    setContributes(newContributes);
                }
            });
    }

    const handleBidModalOpen = () => {
        bidModalRef.current.showModal();
    }

    return (
        <div className="main-container">
            <div className="section-space pb-0">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm mb-6"
                >
                    <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                    <span>›</span>
                    <Link to="/allIssues" className="hover:text-primary transition-colors">Issues</Link>
                    <span>›</span>
                    <span className="font-semibold"
                    >
                        {issue.title}
                    </span>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">

                    {/* ── Left Column ── */}
                    <div>

                        {/* Image */}
                        <div className="relative rounded-3xl overflow-hidden mb-6">
                            <img
                                src={issue.image}
                                alt={issue.title}
                                className="w-full h-[400px] object-cover"
                            />
                            {/* Views badge */}
                            <span className="absolute top-4 right-4
                             bg-black/50 backdrop-blur-sm
                             text-white text-xs font-semibold
                             px-3 py-1.5 rounded-full
                             flex items-center gap-1">
                                <FiEye /> 243 Views
                            </span>
                        </div>

                        {/* Badges Row */}
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                            <span className="text-xs font-semibold px-3 py-1.5
                             rounded-full bg-blue-100 text-blue-700
                             tracking-wide uppercase">
                                {issue.category}
                            </span>
                            <span className="flex items-center gap-1.5 text-sm"
                            >
                                <BsCalendar3 className="text-sm" />
                                Reported {new Date(issue.date).toLocaleDateString("en-US", {
                                    month: "short", day: "numeric", year: "numeric"
                                })}
                            </span>
                            <span className={`flex items-center gap-1.5 text-xs
                             font-semibold px-3 py-1.5 rounded-full
                             ${issue.status === 'ongoing'
                                    ? 'bg-green-500/20 text-green-500'
                                    : issue.status === 'ended'
                                        ? 'bg-yellow-500/20 text-yellow-500'
                                        : 'bg-primary/20 text-primary'
                             }`}>
                                {issue.status}
                            </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl md:text-[32px] font-extrabold mb-3 heading-font"
                    >
                        {issue.title}
                    </h1>

                    {/* Location */}
                    <div className="flex items-center gap-4 mb-6">
                        <span className="flex items-center gap-1 text-sm"
                        >
                            <CiLocationOn className="text-lg" />
                            {issue.location}
                        </span>
                        <Link
                            to="/map"
                            className="flex items-center gap-1 text-sm
                         font-semibold text-primary hover:opacity-80"
                        >
                            <MdMap /> View on Map
                        </Link>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-base-300 mb-6" />

                    {/* Description */}
                    <h3 className="text-xl font-bold mb-3 heading-font"
                    >
                        Description
                    </h3>
                    <p className="text-base leading-relaxed"
                    >
                        {issue.description}
                    </p>

                    {/* Contributors Table */}

                </div>

                <div className="rounded-3xl border border-base-300
                    bg-secondary p-6 flex flex-col gap-5 h-fit">

                    {/* Budget Header */}
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm mb-1">
                                Suggested Fix Budget
                            </p>
                            <p className="text-5xl font-extrabold text-primary">
                                ${target.toFixed(2)}
                            </p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-primary/20
                        flex items-center justify-center">
                            <span className="text-primary text-lg">💵</span>
                        </div>
                    </div>

                    {/* Progress */}
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between text-sm">
                            <span >Progress</span>
                            <span className="font-bold text-primary">{pct}% Collected</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-base-300">
                            <div
                                className="h-2 rounded-full bg-primary transition-all duration-500"
                                style={{ width: `${pct}%` }}
                            />
                        </div>
                        <div className="flex justify-between text-xs"
                        >
                            <span>${totalCollected}</span>
                            <span>Target: ${target.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col gap-3">
                        <button className="btn w-full rounded-xl font-semibold
                     text-sm border-none text-white py-3 bg-primary [--color-primary:#2d6a4f]" onClick={handleBidModalOpen}
                        >
                            Pay Clean-Up Contribution
                        </button>
                        <dialog id="contributions" className="modal backdrop-blur-sm" ref={bidModalRef} onClick={() => bidModalRef.current.close()}>
                            <div className="modal-box bg-neutral-content" onClick={(event) => event.stopPropagation()}>
                                <h3 className="font-bold text-lg">Contribute to this Repair</h3>
                                <div className="modal-action mt-2">
                                    <form method="dialog" className='w-full' onSubmit={handleContributeSubmit}>

                                        <fieldset className="fieldset flex flex-col gap-4">
                                            <div>
                                                {/* Issue Title */}
                                                <label className="label mb-1">Issue Title</label>
                                                <input type="text" className="input bg-secondary" name="title" defaultValue={issue.title} readOnly />
                                            </div>
                                            {/* Contribution Amount */}
                                            <div>
                                                <label className="label mb-1">Contribution Amount ($)</label>
                                                <input type="text" name="contribute" className="input bg-secondary" placeholder="25.00" />
                                            </div>
                                            {/* Full Name */}
                                            <div>
                                                <label className="label mb-1">Full Name</label>
                                                <input type="text" className="input bg-secondary" name='name' placeholder="John Doe" defaultValue={user?.displayName} readOnly />
                                            </div>
                                            {/* Email */}
                                            <div>
                                                <label className="label mb-1">Email</label>
                                                <input type="email" className="input bg-secondary" name="email" placeholder="john@example.com" defaultValue={user?.email} readOnly />
                                            </div>
                                            {/* Phone Number */}
                                            <div>
                                                <label className="label mb-1">Phone</label>
                                                <input type="phone" className="input bg-secondary" name='phone' placeholder="+1 (555) 000-0000" />
                                            </div>
                                            {/* Billing Address */}
                                            <div>
                                                <label className="label mb-1">Billing Address</label>
                                                <input type="text" className="input bg-secondary" name='address' placeholder="123 Civic St, Metro City, 10001" />
                                            </div>
                                            {/* Additional Info */}
                                            <div>
                                                <label className="label mb-1">Additional Info</label>
                                                <textarea type="text" className="input bg-secondary" name='additonal' placeholder="AdditionalThe sewage overflow...." />
                                            </div>
                                            <button className="btn btn-neutral mt-1 submit_btn"> Confirm Secure Payment</button>
                                        </fieldset>

                                    </form>
                                </div>
                                <button className='btn btn-secondary my-3 ml-auto block' onClick={() => bidModalRef.current.close()}>Close</button>
                            </div>
                        </dialog>
                        <button
                            className="btn w-full rounded-xl font-semibold
                     text-sm py-3 bg-transparent
                     border border-base-300
                     hover:bg-base-300 transition-all duration-200"

                        >
                            Volunteer for Fix
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-base-300" />

                    {/* Trust Badges */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-full bg-primary/10
                          flex items-center justify-center shrink-0">
                                <FaInfoCircle className="text-primary text-sm" />
                            </div>
                            <div>
                                <p className="text-sm font-bold"
                                >
                                    Tax Deductible
                                </p>
                                <p className="text-xs mt-0.5"
                                >
                                    All civic contributions qualify for municipal tax credits.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-full bg-primary/10
                          flex items-center justify-center shrink-0">
                                <FaCog className="text-primary text-sm" />
                            </div>
                            <div>
                                <p className="text-sm font-bold"
                                >
                                    Verified Issue
                                </p>
                                <p className="text-xs mt-0.5"
                                >
                                    Confirmed by City Maintenance Dept on Oct 25.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Contribute Table */}
            <div className="section-space pb-0">
                <div className="flex flex-wrap gap-2 items-center justify-between mb-6">

                    {/* Left — Title */}
                    <h2 className="font-bold heading-font">
                        Community Contributors
                    </h2>

                    {/* Right — Count */}
                    <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M17 20h5v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2h5M12 12a4 4 0 100-8 4 4 0 000 8z" />
                        </svg>
                        <span className="text-[12px] font-semibold">
                            {contributes.length} People contributed
                        </span>
                    </div>

                </div>
                <div className="overflow-x-auto rounded-box border border-primary/20 bg-base-100">
                    <table className="table table_issue_contribute w-full">
                        {/* head */}
                        <thead>
                            <tr className="bg-secondary/90">
                                <th className="border-primary/20">Name</th>
                                <th className="border-primary/20">Date</th>
                                <th className="border-primary/20">Status</th>
                                <th className="border-primary/20">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contributes.map((contribute, index) =>
                                <tr key={index} className="bg-secondary/90">
                                    <td className="border-primary/20">
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={user?.photoURL}
                                                        alt="Avatar" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{contribute.name}</div>
                                                <div className="text-sm opacity-50">{contribute.address}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="border-primary/20">
                                        <div>
                                            {new Date(contribute.date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </div>
                                    </td>
                                    <td className="border-primary/20">
                                        <span className="text-xs font-semibold bg-primary text-primary px-3 py-1 rounded-3xl status_style">Ongoing</span>
                                    </td>
                                    <td className="border-primary/20">
                                        <div className="text-[22px] font-bold text-primary">${contribute.amount}</div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </div >
    );
};

export default IssueDetails;
