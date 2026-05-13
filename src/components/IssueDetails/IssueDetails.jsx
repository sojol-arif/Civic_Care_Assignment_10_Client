import { useLoaderData } from "react-router";

const IssueDetails = () => {
    const data = useLoaderData();
    console.log(data, 'data from loader');

    return (
        <div className="main-container">
            <h1>Issue Details</h1>
        </div>
    );
};

export default IssueDetails;