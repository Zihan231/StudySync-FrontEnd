// src/pages/Connections/MyConnections.jsx
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { NavLink } from "react-router";
import { FaWifi, FaUserFriends, FaEdit, FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../hooks/AxiosSecure/useAxiosSecure";
import AuthContext from "../../contexts/Auth/AuthContext/AuthContext";
import { HashLoader } from "react-spinners";
import Swal from "sweetalert2";


const MyConnections = () => {
    const [selected, setSelected] = useState({});
    const [updateID, setUpdateID] = useState(null);
    const subjects = useMemo(
        () => ["English", "Mathematics", "Physics", "Programming", "Chemistry", "Biology", "Economics"],
        []
    );
    const [error, setError] = useState("");
    const OpenModal = useRef();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await axiosSecure(`/partner/connected/${user?.email}`);
                const result = res.data;
                setData(result);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [axiosSecure, user]);

    const safeImg = (url) =>
        !url || url.includes("create-partner")
            ? "https://i.ibb.co/7y4m2bq/avatar-placeholder.png"
            : url.startsWith("http")
                ? url
                : `https://${url}`;

    const StudyModePill = ({ mode }) => {
        const isOnline = mode === "Online";
        return (
            <span
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${isOnline ? "bg-success/20 text-success" : "bg-error/20 text-error"
                    }`}
                title="Preferred study format"
            >
                {isOnline ? <FaWifi /> : <FaUserFriends />}
                {isOnline ? "Online" : "Offline"}
            </span>
        );
    };
    console.log(selected);
    // Handlers (you wire logic)
    const handleDelete = async (id) => {
        // Optional: confirm UI
        // if (!confirm("Delete this request?")) return;

    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setError(""); // reset previous error

        const form = e.target;
        const name = form.name.value.trim();
        const subject = form.subject.value.trim();
        const studyMode = form.studyMode.value;
        const profileImage = form.profileImage.value.trim();

        // Validate Name
        if (!name) {
            setError("Name is required.");
            return;
        }
        if (name.length < 2) {
            setError("Name must be at least 2 characters.");
            return;
        }

        // Validate Subject
        if (!subject) {
            setError("Subject is required.");
            return;
        }
        if (!subjects.includes(subject)) {
            setError("Please select a valid subject from the list.");
            return;
        }

        // Validate Study Mode
        const validModes = ["Online", "Offline"];
        if (!studyMode || !validModes.includes(studyMode)) {
            setError("Please select a valid study mode.");
            return;
        }
        // Validate Picture URL (optional)
        if (profileImage) {
            try {
                new URL(profileImage);
            } catch {
                setError("Picture URL is invalid.");
                return;
            }
        }
        const inputData = {
            name, sub: subject, stdMode: studyMode, imgURL: profileImage
        };
        const input2 = { name, subject, studyMode, profileimage: profileImage, _id: updateID };
        // console.log(inputData);
        try {
            const res = await axiosSecure.patch(`/partner/update/${updateID}`, inputData);
            console.log(res);
            const result = res.data;
            // setData(data.filter(item => item._id != updateID))
            // setData([data.filter(item => item._id != updateID), input2]);
            setData(prev =>
                prev.map(item => (item._id === updateID ? { ...item, ...input2 } : item))
            );
            OpenModal.current.close();
            // setData({...data, })
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    };

    // console.log(updateID);


    // Loading state
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[600px]">
                <HashLoader color="#73abff" size={80} />
            </div>
        );
    }

    // Error state
    // if (err) {
    //     return (
    //         <main className="min-h-[calc(100vh-4rem)] bg-base-100 px-4 py-10">
    //             <div className="max-w-7xl mx-auto">
    //                 <h1 className="text-2xl md:text-3xl font-extrabold mb-4">My Connections</h1>
    //                 <div className="alert alert-error">
    //                     <span>{err}</span>
    //                 </div>
    //             </div>
    //         </main>
    //     );
    // }

    // Empty state
    else if (data.length <= 0) {
        return (
            <main className="min-h-[calc(100vh-4rem)] bg-base-100 px-4 py-10">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-linear-to-br from-primary/15 to-secondary/15 shadow-sm">
                        <svg width="26" height="26" viewBox="0 0 24 24" className="opacity-80">
                            <path d="M10 18a8 8 0 1 1 5.292-14.03" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="M21 21l-4.35-4.35" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </div>
                    <h2 className="text-xl md:text-2xl font-extrabold">No Partners yet</h2>
                    <p className="mt-1 text-sm text-base-content/70">
                        When you send partner requests, they’ll show up here.
                    </p>
                    <div className="mt-6">
                        <NavLink to="/partners" className="btn btn-primary">Find Partners</NavLink>
                    </div>
                </div>
            </main>
        );
    }
    return (
        <main className="min-h-[calc(100vh-4rem)] bg-base-100 px-4 py-10">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl md:text-3xl font-extrabold">My Connections</h1>
                    <NavLink to="/partners" className="btn btn-primary btn-sm">Find More</NavLink>
                </div>

                {/* Table Card */}
                <div className="card bg-base-200/50 border border-base-300 shadow-sm ">
                    <div className="card-body p-0">
                        <div className="overflow-x-auto">
                            <table className="table table-zebra table-pin-rows">
                                <thead className="bg-base-200 text-base-content/80">
                                    <tr>
                                        <th className="min-w-60">Partner</th>
                                        <th>Subject</th>
                                        <th>Study Mode</th>
                                        <th className="w-40 text-right pr-6">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((r) => (
                                        <tr key={r._id} className="hover">
                                            {/* Partner cell */}
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="w-12 rounded-full ring ring-primary/20 ring-offset-2 ring-offset-base-100">
                                                            <img src={safeImg(r.profileimage)} alt={r.name} />
                                                        </div>
                                                    </div>
                                                    <div className="min-w-0">
                                                        <NavLink
                                                            to={`/partners/${r.partnerId || r._id}`}
                                                            className="font-semibold hover:text-primary truncate block"
                                                            title={r.name}
                                                        >
                                                            {r.name}
                                                        </NavLink>
                                                        <span className="text-xs text-base-content/60 block truncate">
                                                            ID: {r.partnerId || r._id}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Subject */}
                                            <td>
                                                <span
                                                    className="badge bg-base-100 text-base-content border border-base-300 shadow-sm"
                                                    style={{ minWidth: "80px", textAlign: "center" }}
                                                >
                                                    {r.subject}
                                                </span>
                                            </td>

                                            {/* Study Mode */}
                                            <td>
                                                <StudyModePill mode={r.studyMode} />
                                            </td>

                                            {/* Actions */}
                                            <td className="text-right">
                                                <div className="inline-flex gap-2">
                                                    <button
                                                        className="btn btn-ghost btn-xs"
                                                        onClick={() => {
                                                            setUpdateID(r._id);
                                                            const filtered = {
                                                                name: r.name,
                                                                subject: r.subject,
                                                                studyMode: r.studyMode,
                                                                image: r.profileimage
                                                            }
                                                            setSelected(filtered);
                                                            OpenModal.current.showModal()
                                                        }}
                                                        aria-label="Update request"
                                                        title="Update"
                                                    >
                                                        <FaEdit className="w-4 h-4" />
                                                        <span className="hidden sm:inline">Update</span>
                                                    </button>
                                                    <button
                                                        className="btn btn-error btn-xs"
                                                        onClick={() => handleDelete(r._id)}
                                                        aria-label="Delete request"
                                                        title="Delete"
                                                    >
                                                        <FaTrash className="w-4 h-4" />
                                                        <span className="hidden sm:inline">Delete</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <dialog
                ref={OpenModal}
                onClick={(e) => {
                    if (e.target === e.currentTarget) {
                        OpenModal.current.close();
                    }
                }}
                className="modal modal-bottom sm:modal-middle backdrop:bg-base-200/50 backdrop-blur-sm"
            >
                <div className="modal-box rounded-2xl bg-base-100 shadow-lg p-6">
                    <h3 className="font-bold text-xl mb-4 text-center">Update Partner</h3>

                    {/* Form */}
                    <form onSubmit={handleUpdate} method="dialog" className="space-y-4">
                        {/* Name */}
                        <label className="form-control w-full">
                            <span className="label-text">Name</span>
                            <input
                                defaultValue={selected.name}
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                className="input input-bordered w-full"
                            />
                        </label>
                        {/* Subject */}
                        <label className="form-control">
                            <div className="label"><span className="label-text">Subject</span></div>
                            <input
                                defaultValue={selected.subject}
                                name="subject"
                                list="subject-list"
                                placeholder="e.g., English, Math, Programming"
                                className="input input-bordered w-full"
                            />
                            <datalist id="subject-list">
                                {subjects.map((s) => (
                                    <option key={s} value={s} />
                                ))}
                            </datalist>
                        </label>

                        {/* Study Mode */}
                        <label className="form-control w-full">
                            <span className="label-text">Study Mode</span>
                            <select
                                name="studyMode"
                                className="select select-bordered w-full"
                                value={selected?.studyMode || ""} // controlled
                                onChange={(e) =>
                                    setSelected((prev) => ({ ...prev, studyMode: e.target.value }))
                                }
                            >
                                <option value="" disabled>
                                    Select mode
                                </option>
                                <option value="Online">Online</option>
                                <option value="Offline">Offline</option>
                            </select>

                        </label>

                        {/* Picture URL */}
                        <label className="form-control w-full">
                            <span className="label-text">Picture URL</span>
                            <input
                                defaultValue={selected?.image}
                                name="profileImage"
                                placeholder="https://example.com/photo.jpg"
                                className="input input-bordered w-full"
                            />
                        </label>

                        {/* Actions */}
                        <div className="modal-action flex justify-end gap-2 mt-4">
                            {/* Close button */}
                            <button type="reset" className="btn btn-ghost">
                                Reset
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                Save
                            </button>
                        </div>
                        {/* Actions */}
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md text-sm">
                                {error}
                            </div>
                        )}
                    </form>
                </div>
            </dialog>

        </main>
    );
};

export default MyConnections;
