import { useDocumentTitle } from '../../hooks/dynamic_title/DynamicTitle';  

const MyIssues = () => {
    // Dynamically set the document title
    useDocumentTitle("My Issues - Civic Care");

    return (
        <div>
            <h2>My Issues</h2>
        </div>
    );
};

export default MyIssues;