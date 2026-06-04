import RecentIssues from '../RecentIssues/RecentIssues';
import {useDocumentTitle } from '../../hooks/dynamic_title/DynamicTitle';
import Banner from '../Banner/Banner';
import CategorySection from '../CategorySection/CategorySection';
import CallToAction from '../CallToAction/CallToAction';
import StateBanner from '../StateBanner/StateBanner';

const usePromiseRecentIssues = fetch('https://civic-care-server-five.vercel.app/recent-issues')
  .then(res => {
    if (!res.ok) throw new Error(`Server returned ${res.status}`);
    return res.json();
  });

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