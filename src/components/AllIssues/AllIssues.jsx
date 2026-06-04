import { use, useState } from 'react';
import { useLoaderData } from 'react-router';
import IssueCard from '../IssueCard/IssueCard';
import { useDocumentTitle } from '../../hooks/dynamic_title/DynamicTitle';
import { AuthContext } from '../../contexts/AuthContext';
import Loading from '../Loading/Loading';

const ITEMS_PER_PAGE = 5;

const AllIssues = () => {
    useDocumentTitle("Recent Issues");

    const { loading } = use(AuthContext);
    const issuesAll = useLoaderData();

    /** ── Filter State ── */
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedStatus, setSelectedStatus] = useState("All");

    const filteredIssues = issuesAll.filter(issue => {
        const categoryMatch = selectedCategory === "All" || issue.category === selectedCategory;
        const statusMatch = selectedStatus === "All" || issue.status === selectedStatus;
        return categoryMatch && statusMatch;
    });

    /** ── Pagination State ── */
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(filteredIssues.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentIssues = filteredIssues.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className='section-space pb-0'>
            <div className='main-container'>
                <div className='flex justify-center items-center mb-4'>
                    <div className='text-center'>
                        <h2>Community Issues</h2>
                        <p>Discover and track ongoing maintenance requests and community improvements in your neighborhood.</p>
                    </div>
                </div>
                {/* ── Filter Row ── */}
                <div className="flex flex-wrap gap-3 p-10 rounded-2xl bg-secondary mt-8 lg:mt-12">

                    {/* Category */}
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="select select-sm border border-base-300 bg-base-100 rounded-xl focus:outline-none h-[45px]"
                    >
                        <option value="All">All Categories</option>
                        <option>Garbage</option>
                        <option>Road Damage</option>
                        <option>Illegal Construction</option>
                        <option>Broken Public Property</option>
                    </select>

                    {/* Status */}
                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="select select-sm border border-base-300 bg-base-100 rounded-xl focus:outline-none h-[45px]"
                    >
                        <option value="All">All Status</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="ended">Ended</option>
                    </select>

                    {/* Clear button — only shows when filter is active */}
                    {(selectedCategory !== "All" || selectedStatus !== "All") && (
                        <button
                            onClick={() => {
                                setSelectedCategory("All");
                                setSelectedStatus("All");
                            }}
                            className="btn btn-sm btn-nuetral text-error rounded-xl h-[40px] shadow-none"
                        >
                            ✕ Clear
                        </button>
                    )}

                </div>

                <div className='grid-auto-fit mt-8 lg:mt-12'>
                    {loading ?
                        <Loading />
                        :
                        currentIssues.map(issue =>
                            <IssueCard key={issue._id} issue={issue} />
                        )
                    }
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className='flex justify-center items-center gap-2 mt-10 mb-8'>
                        {/* Previous Button */}
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className='w-10 h-10 text-[20px] flex items-center justify-center rounded-lg border border-gray-300 text-secondary-content hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition'
                        >
                            ‹
                        </button>

                        {/* Page Numbers */}
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`w-10 h-10 flex items-center justify-center rounded-lg border text-sm font-medium transition
                                    ${currentPage === page
                                        ? 'bg-[#1a5c4a] text-white border-[#1a5c4a]'
                                        : 'border-gray-300 text-secondary-content hover:bg-gray-100'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}

                        {/* Next Button */}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className='w-10 h-10 text-[20px] flex items-center justify-center rounded-lg border border-gray-300 text-secondary-content hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition'
                        >
                            ›
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllIssues;