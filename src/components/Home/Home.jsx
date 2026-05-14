import RecentIssues from '../RecentIssues/RecentIssues';
import {useDocumentTitle } from '../../hooks/dynamic_title/DynamicTitle';
import Footer from '../Footer/Footer';
import Banner from '../Banner/Banner';
import CategorySection from '../CategorySection/CategorySection';
import CallToAction from '../CallToAction/CallToAction';

const usePromiseRecentIssues = fetch('http://localhost:3000/recent-issues').then(res => res.json());

const Home = () => {
    // Dynamically set the document title
    useDocumentTitle("Home");

    return (
        <div>
            <Banner></Banner>
            <CategorySection></CategorySection> 
            <RecentIssues usePromiseRecentIssues={usePromiseRecentIssues} ></RecentIssues>
            <CallToAction></CallToAction>
            <Footer></Footer>
        </div>
    );
};

export default Home;