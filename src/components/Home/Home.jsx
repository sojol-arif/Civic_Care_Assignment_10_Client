import RecentIssues from '../RecentIssues/RecentIssues';
import {useDocumentTitle } from '../../hooks/dynamic_title/DynamicTitle';
import Banner from '../Banner/Banner';
import CategorySection from '../CategorySection/CategorySection';
import CallToAction from '../CallToAction/CallToAction';
import StateBanner from '../StateBanner/StateBanner';

const usePromiseRecentIssues = fetch('http://localhost:3000/recent-issues').then(res => res.json());

const Home = () => {
    // Dynamically set the document title
    useDocumentTitle("Home");

    return (
        <div>
            <Banner></Banner>
            <CategorySection></CategorySection> 
            <StateBanner></StateBanner>
            <RecentIssues usePromiseRecentIssues={usePromiseRecentIssues} ></RecentIssues>
            <CallToAction></CallToAction>
        </div>
    );
};

export default Home;