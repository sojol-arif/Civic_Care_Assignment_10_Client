import RecentIssues from '../RecentIssues/RecentIssues';
import {useDocumentTitle } from '../../hooks/dynamic_title/DynamicTitle';

const usePromiseRecentIssues = fetch('http://localhost:3000/recent-issues').then(res => res.json());

const Home = () => {
    // Dynamically set the document title
    useDocumentTitle("Home");

    return (
        <div>
            <div className='main-container'>
                <h3>Welcome to Civic Care! Home page</h3>
            </div>
            <RecentIssues usePromiseRecentIssues={usePromiseRecentIssues} ></RecentIssues>
        </div>
    );
};

export default Home;