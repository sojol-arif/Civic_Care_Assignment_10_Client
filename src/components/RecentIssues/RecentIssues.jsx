import { use } from 'react';
import { Link } from 'react-router';
import IssueCard from '../IssueCard/IssueCard';
import { useDocumentTitle } from '../../hooks/dynamic_title/DynamicTitle';
import { AuthContext } from '../../contexts/AuthContext';
import Loading from '../Loading/Loading';

const RecentIssues = ({ usePromiseRecentIssues }) => {
    // Dynamically set the document title
    useDocumentTitle("Recent Issues");

    const { loading } = use(AuthContext);

    const recentIssues = use(usePromiseRecentIssues);
    console.log(recentIssues, 'recentIssues');

    return (
        <div className='main-container section-space pb-0'>
            <div className='flex justify-between items-center mb-4 flex-wrap gap-3'>
                <div>
                    <h2>Recent Reports</h2>
                    <p>Real-time updates from your community stewards.</p>
                </div>
                <div>
                    <Link to="/allIssues" className='link-view-all-color'>View All Reports →</Link>
                </div>
            </div>
            <div className='grid-auto-fit mt-8 lg:mt-12'>
                {loading ?
                    <Loading></Loading>
                    :
                    recentIssues.map(issue =>
                    <IssueCard key={issue._id} issue={issue} ></IssueCard>
                    )
                }
            </div>
        </div>
    );
};

export default RecentIssues;