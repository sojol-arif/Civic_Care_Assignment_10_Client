import { useLoaderData } from "react-router";
import { useDocumentTitle } from '../../hooks/dynamic_title/DynamicTitle';

const IssueDetails = () => {
    // Dynamically set the document title
    useDocumentTitle("Issue Details - Civic Care");

    const data = useLoaderData();
    console.log(data, 'data from loader');

    return (
        <div className="main-container">
            <h1>Issue Details</h1>
        </div>
    );
};

export default IssueDetails;