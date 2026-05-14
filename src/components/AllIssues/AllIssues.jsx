import { useDocumentTitle } from '../../hooks/dynamic_title/DynamicTitle';

const AllIssues = () => {
    // Dynamically set the document title
    useDocumentTitle("All Issues - Civic Care");

    return (
        <div>
            <h2>All Issues</h2>
        </div>
    );
};

export default AllIssues;