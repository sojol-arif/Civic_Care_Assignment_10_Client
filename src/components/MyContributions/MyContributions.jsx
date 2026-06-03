import { useEffect, useState } from 'react';
import { use } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useDocumentTitle } from '../../hooks/dynamic_title/DynamicTitle';
import { downloadContributionPDF } from "../../utils/downloadPDF";
import { MdOutlinePictureAsPdf } from "react-icons/md";
import Loading from '../Loading/Loading';
import { useLoaderData } from 'react-router';

const MyContribute = () => {
    useDocumentTitle("My Contributions");

    const issuesAll = useLoaderData();
    const { user } = use(AuthContext);
    const [contributes, setContributes] = useState([]);
    const [fetchLoading, setFetchLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            setFetchLoading(true);

            fetch(`http://localhost:3000/contributes?email=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    data.sort((a, b) => b.amount - a.amount);
                    setContributes(data);
                }).finally(() => {
                    setFetchLoading(false);
                })
        }
    }, [user?.email]);

    return (
        <div className='main-container section-space'>
            <div className="overflow-x-auto rounded-box border border-primary/20 bg-base-100">
                <table className="table table_issue_contribute w-full">
                    <thead>
                        <tr className="bg-secondary/90">
                            <th className="border-primary/20">Issue Title</th>
                            <th className="border-primary/20">Category</th>
                            <th className="border-primary/20">Paid Amount</th>
                            <th className="border-primary/20">Date</th>
                            <th className="border-primary/20 flex justify-end">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!fetchLoading ?
                            (contributes.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-10 opacity-50">
                                        No contributions yet.
                                    </td>
                                </tr>
                            ) : (
                                contributes.map((contribute, index) => {
                                    // Reuse 
                                    const issue = issuesAll?.find(issue => issue._id == contribute.issueId);

                                    return (
                                        <tr key={index} className="bg-secondary/90">
                                            <td className="border-primary/20">
                                                <span className='text-xs font-semibold bg-secondary py-1 rounded-3xl'>
                                                    {issue?.title}
                                                </span>
                                            </td>
                                            <td className="border-primary/20">
                                                <span className='category_style text-xs font-semibold px-3 py-1 rounded-3xl'>{issue?.category}</span>
                                            </td>
                                            <td className="border-primary/20 text-primary">
                                                ${Number(contribute.amount || 0).toFixed(2)}
                                            </td>
                                            <td className="border-primary/20">
                                                {issue?.date && new Date(issue.date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </td>
                                            <td className="border-primary/20">
                                                <div className='flex gap-3 justify-end w-full'>
                                                    <span
                                                        className='text-xl cursor-pointer'
                                                        onClick={() => downloadContributionPDF(contribute, issue)}
                                                    >
                                                        <MdOutlinePictureAsPdf />
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                }
                                ))
                            )
                            :
                            (
                                <tr>
                                    <td colSpan={5} className="text-center py-10 opacity-50">
                                        <Loading></Loading>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyContribute;
