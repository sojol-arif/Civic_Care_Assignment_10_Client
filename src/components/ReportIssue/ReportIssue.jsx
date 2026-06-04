import { use, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineFileUpload } from "react-icons/md";
import { BsCamera } from "react-icons/bs";
import { IoSendOutline } from "react-icons/io5";
import { AuthContext } from "../../contexts/AuthContext";
import { useDocumentTitle } from "../../hooks/dynamic_title/DynamicTitle";
import Swal from "sweetalert2";

const CATEGORIES = [
    "Road & Pavement",
    "Street Lighting",
    "Sewage & Drainage",
    "Parks & Green Spaces",
    "Public Buildings",
    "Waste & Sanitation",
    "Water Supply",
    "Traffic & Signals",
    "Noise & Pollution",
    "Other",
];

const today = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
});

export default function ReportIssue() {
    useDocumentTitle("Report Issue");

    const { user } = use(AuthContext);
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [dragOver, setDragOver] = useState(false);
    const [previewFiles, setPreviewFiles] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    const handleFiles = (files) => {
        const valid = Array.from(files).filter((f) => f.type.startsWith("image/"));
        const previews = valid.map((f) => ({
            name: f.name,
            url: URL.createObjectURL(f),
            file: f,
        }));
        setPreviewFiles((prev) => [...prev, ...previews].slice(0, 5));
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        handleFiles(e.dataTransfer.files);
    };

    const removePreview = (idx) => {
        setPreviewFiles((prev) => prev.filter((_, i) => i !== idx));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const form = e.target;
        const newIssue = {
            title: form.title.value,
            category: form.category.value,
            amount: parseFloat(form.amount.value) || 0,
            location: form.location.value,
            description: form.description.value,
            email: user?.email,
            date: new Date().toISOString(),
            status: "ongoing",
            image: previewFiles[0]?.url || "",
        };

        try {
            const res = await fetch("http://localhost:3000/issues", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(newIssue),
            });
            const data = await res.json();

            if (data.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Report submitted successfully!",
                    showConfirmButton: false,
                    timer: 1800,
                });
                navigate("/myIssues");
            }
        } catch {
            Swal.fire({ icon: "error", title: "Submission failed", text: "Please try again." });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            {/* ── Hero Header ── */}
            <div className="bg-primary [--color-primary:#2d6a4f] py-14 md:py-20">
                <div className="main-container">
                    <p className="text-xs font-semibold tracking-widest uppercase text-white/60 mb-3">
                        Civic Care Platform
                    </p>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-white heading-font mb-3">
                        Submit New Report
                    </h1>
                    <p className="text-white/70 text-sm md:text-base max-w-xl">
                        Help us maintain our community's standards by reporting local
                        infrastructure or sanitation issues.
                    </p>
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm mt-6 text-white/60">
                        <Link to="/" className="hover:text-white transition-colors">Home</Link>
                        <span>›</span>
                        <span className="text-white font-semibold">Report Issue</span>
                    </div>
                </div>
            </div>

            {/* ── Form Section ── */}
            <div className="main-container section-space pb-0">
                <div className="max-w-3xl mx-auto">
                    <form onSubmit={handleSubmit}>

                        {/* Reporter Info Row */}
                        <div className="bg-secondary border border-base-300 rounded-2xl px-5 py-4 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs font-semibold tracking-wide uppercase text-base-content/50 mb-1">
                                    Reporter Email
                                </p>
                                <p className="text-sm font-semibold truncate" >
                                    {user?.email || "citizen.alex@civiccare.gov"}
                                </p>
                            </div>
                            <div className="sm:text-right">
                                <p className="text-xs font-semibold tracking-wide uppercase text-base-content/50 mb-1">
                                    Reporting Date
                                </p>
                                <p className="text-sm font-semibold" >
                                    {today}
                                </p>
                            </div>
                        </div>

                        {/* Main Form Card */}
                        <div className="bg-base-100 border border-base-300 rounded-3xl p-6 md:p-8 flex flex-col gap-6">

                            {/* Issue Title */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold">
                                    Issue Title <span className="text-error">*</span>
                                </label>
                                <input
                                    name="title"
                                    type="text"
                                    required
                                    placeholder="e.g., Pothole on Main St"
                                    className="input w-full rounded border border-base-300
                                               bg-secondary focus:outline-none focus:border-primary
                                               placeholder:text-base-content/40"
                                />
                            </div>

                            {/* Category + Budget */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-semibold">
                                        Category <span className="text-error">*</span>
                                    </label>
                                    <select
                                        name="category"
                                        required
                                        defaultValue=""
                                        className="select w-full rounded border border-base-300
                                                   bg-secondary focus:outline-none focus:border-primary"
                                    >
                                        <option value="" disabled>Select a category</option>
                                        {CATEGORIES.map((cat) => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-semibold">
                                        Suggested Fix Budget ($)
                                    </label>
                                    <input
                                        name="amount"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        placeholder="Estimated cost"
                                        className="input w-full rounded border border-base-300
                                                   bg-secondary focus:outline-none focus:border-primary
                                                   placeholder:text-base-content/40"
                                    />
                                </div>
                            </div>

                            {/* Location */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold">
                                    Location <span className="text-error">*</span>
                                </label>
                                <div className="relative">
                                    <CiLocationOn className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xl text-base-content/40" />
                                    <input
                                        name="location"
                                        type="text"
                                        required
                                        placeholder="Street address or landmark"
                                        className="input w-full rounded border border-base-300
                                                   bg-secondary
                                                   focus:outline-none focus:border-primary
                                                   placeholder:text-base-content/40"
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold">
                                    Detailed Description <span className="text-error">*</span>
                                </label>
                                <textarea
                                    name="description"
                                    required
                                    rows={5}
                                    placeholder="Provide as much detail as possible to help our field team…"
                                    className="textarea w-full rounded border border-base-300
                                               bg-secondary resize-none
                                               focus:outline-none focus:border-primary
                                               placeholder:text-base-content/40"
                                />
                            </div>

                            {/* Photo Evidence */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold">Photo Evidence</label>

                                {/* Drop zone */}
                                <div
                                    onClick={() => fileInputRef.current.click()}
                                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                                    onDragLeave={() => setDragOver(false)}
                                    onDrop={handleDrop}
                                    className={`
                                        relative flex flex-col items-center justify-center gap-3
                                        rounded-2xl border-2 border-dashed cursor-pointer
                                        py-10 px-4 transition-all duration-200
                                        ${dragOver
                                            ? "border-primary bg-primary/10"
                                            : "border-base-300 bg-secondary hover:border-primary/60 hover:bg-primary/5"
                                        }
                                    `}
                                >
                                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                                        <BsCamera className="text-2xl text-primary" />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-semibold flex items-center gap-1 justify-center">
                                            <MdOutlineFileUpload className="text-lg text-primary" />
                                            Click to upload or drag and drop images
                                        </p>
                                        <p className="text-xs text-base-content/50 mt-1">
                                            PNG, JPG up to 10MB — max 5 images
                                        </p>
                                    </div>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        className="hidden"
                                        onChange={(e) => handleFiles(e.target.files)}
                                    />
                                </div>

                                {/* Image Previews */}
                                {previewFiles.length > 0 && (
                                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mt-1">
                                        {previewFiles.map((f, idx) => (
                                            <div key={idx} className="relative group rounded overflow-hidden aspect-square border border-base-300">
                                                <img
                                                    src={f.url}
                                                    alt={f.name}
                                                    className="w-full h-full object-cover"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removePreview(idx)}
                                                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100
                                                               transition-opacity flex items-center justify-center
                                                               text-white text-xl font-bold"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Divider */}
                            <div className="border-t border-base-300" />

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={submitting}
                                className="btn w-full rounded py-3 text-base font-semibold
                                           border-none text-white flex items-center justify-center gap-2
                                           bg-accent disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {submitting ? (
                                    <span className="loading loading-spinner loading-sm" />
                                ) : (
                                    <>
                                        <IoSendOutline className="text-lg" />
                                        Submit Report
                                    </>
                                )}
                            </button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
