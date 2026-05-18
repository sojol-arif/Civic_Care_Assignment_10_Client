import { use, useState } from 'react';
import { useLoaderData } from 'react-router';
import IssueCard from '../IssueCard/IssueCard';
import { useDocumentTitle } from '../../hooks/dynamic_title/DynamicTitle';
import { AuthContext } from '../../contexts/AuthContext';
import Loading from '../Loading/Loading';

const ITEMS_PER_PAGE = 4;

const AllIssues = () => {
    useDocumentTitle("Recent Issues - Civic Care");

    const { loading } = use(AuthContext);
    const issuesAll = useLoaderData();

    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(issuesAll.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentIssues = issuesAll.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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
                        <h3>Community Issues</h3>
                        <p>Discover and track ongoing maintenance requests and community improvements in your neighborhood.</p>
                    </div>
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
                            className='w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition'
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
                                        : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}

                        {/* Next Button */}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className='w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition'
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