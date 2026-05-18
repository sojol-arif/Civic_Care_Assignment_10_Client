import { useLoaderData } from "react-router";
import { useDocumentTitle } from '../../hooks/dynamic_title/DynamicTitle';
// src/pages/IssueDetail/IssueDetail.jsx
import { Link, } from "react-router";
import { CiLocationOn } from "react-icons/ci";
import { MdMap } from "react-icons/md";
import { FiEye } from "react-icons/fi";
import { BsCalendar3 } from "react-icons/bs";
import { FaInfoCircle, FaCog } from "react-icons/fa";
import { useRef } from "react";

const IssueDetails = () => {
    // Dynamically set the document title
    useDocumentTitle("Issue Details - Civic Care");

    const issue = useLoaderData();
    console.log(issue, 'data from loader');
    const contributions = [];
    const bidModalRef = useRef(null);

    const totalCollected = contributions?.reduce((sum, c) => sum + c.amount, 0) || 270;
    const target = issue.amount;
    const pct = Math.min(Math.round((totalCollected / target) * 100), 100);

    const handleSubmit = () => {
        console.log('form submitted');
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
                            <span className="flex items-center gap-1.5 text-xs
                             font-semibold px-3 py-1.5 rounded-full
                             bg-red-100 text-red-600">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                Ongoing
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl font-extrabold mb-3 heading-font"
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
                        <h2 className="text-xl font-bold mb-3 heading-font"
                        >
                            Description
                        </h2>
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
                                <p className="text-4xl font-extrabold heading-font">
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
                                <span>${totalCollected.toFixed(2)}</span>
                                <span>Target: ${target.toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col gap-3">
                            <button className="btn w-full rounded-xl font-semibold
                     text-sm border-none text-white py-3 bg-neutral" onClick={handleBidModalOpen}
                            >
                                Pay Clean-Up Contribution
                            </button>
                            <dialog id="contributions" className="modal" ref={bidModalRef}>
                                <div className="modal-box bg-neutral-content">
                                    <h3 className="font-bold text-lg">Contribute to this Repair</h3>
                                    <div className="modal-action">
                                        <form method="dialog" className='w-full' onSubmit={handleSubmit}>

                                            <fieldset className="fieldset">
                                                {/* Issue Title */}
                                                <label className="label">Issue Title</label>
                                                <input type="text" className="input bg-secondary" name="title" placeholder="Broken Streetlight on 5th Avenue" />
                                                {/* Contribution Amount */}
                                                <label className="label">Contribution Amount ($)</label>
                                                <input type="text" name="amount" className="input bg-secondary" placeholder="25.00" />
                                                {/* Bid */}
                                                <label className="label">Full Name</label>
                                                <input type="text" className="input bg-secondary" name='name' placeholder="John Doe" />
                                                {/* Email */}
                                                <label className="label">Issue Title</label>
                                                <input type="email" className="input bg-secondary" name="email" placeholder="john@example.com" />
                                                {/* Phone Number */}
                                                <label className="label">Full Name</label>
                                                <input type="phone" className="input bg-secondary" name='phone' placeholder="+1 (555) 000-0000" />
                                                {/* Billing Address */}
                                                <label className="label">Billing Address</label>
                                                <input type="text" className="input bg-secondary" name='address' placeholder="123 Civic St, Metro City, 10001" />
                                                <button className="btn btn-neutral mt-4 submit_btn"> Confirm Secure Payment</button>
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
                                <div className="w-9 h-9 rounded-full bg-accent/10
                          flex items-center justify-center shrink-0">
                                    <FaCog className="text-accent text-sm" />
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
            </div>
        </div>
    );
};

export default IssueDetails;
