import React from 'react';
import { useDocumentTitle } from '../../hooks/dynamic_title/DynamicTitle';

const AddIssue = () => {
    // Dynamically set the document title
    useDocumentTitle("Add Issue - Civic Care");

    return (
        <div>
            <h3>Add Issue</h3>
        </div>
    );
};

export default AddIssue;