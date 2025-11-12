// src/pages/Connections/MyConnections.jsx
import React, { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router";
import { FaWifi, FaUserFriends, FaEdit, FaTrash } from "react-icons/fa";

/**
 * Optional props you can wire:
 * - loadConnections?: () => Promise<Array<Request>>
 * - onDelete?: (id: string) => Promise<void> | void
 * - onUpdate?: (id: string, payload: { subject: string; studyMode: "Online"|"Offline" }) => Promise<void> | void
 */
const MyConnections = ({ loadConnections, onDelete, onUpdate }) => {
    // Demo data (remove when wiring API)
    const demo = useMemo(
        () => [
            {
                _id: "r1",
                partnerId: "p1",
                name: "Sadia Rahman",
                profileimage:
                    "https://c4.wallpaperflare.com/wallpaper/743/818/554/girl-image-1920x1200-wallpaper-preview.jpg",
                subject: "English",
                studyMode: "Online",
            },
            {
                _id: "r2",
                partnerId: "p2",
                name: "Zihan Last",
                profileimage: "https://randomuser.me/api/portraits/men/12.jpg",
                subject: "Mathematics",
                studyMode: "Offline",
            },
            {
                _id: "r3",
                partnerId: "p3",
                name: "Ayesha Karim",
                profileimage: "https://randomuser.me/api/portraits/women/21.jpg",
                subject: "Literature",
                studyMode: "Online",
            },
        ],
        []
    );

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");

    // Update modal state
    const [openEditId, setOpenEditId] = useState(null);
    const [editSubject, setEditSubject] = useState("");
    const [editMode, setEditMode] = useState("Online");

    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                setLoading(true);
                setErr("");
                if (loadConnections) {
                    const res = await loadConnections();
                    if (alive) setRows(res || []);
                } else {
                    // demo mode
                    if (alive) setRows(demo);
                }
            } catch (e) {
                if (alive) setErr(e?.message || "Failed to load connections.");
            } finally {
                if (alive) setLoading(false);
            }
        })();
        return () => {
            alive = false;
        };
    }, [loadConnections, demo]);

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

    // Handlers (you wire logic)
    const handleDelete = async (id) => {
        // Optional: confirm UI
        // if (!confirm("Delete this request?")) return;
        try {
            await onDelete?.(id);
            setRows((prev) => prev.filter((r) => r._id !== id));
        } catch (e) {
            console.error(e);
        }
    };

    const handleOpenEdit = (row) => {
        setOpenEditId(row._id);
        setEditSubject(row.subject || "");
        setEditMode(row.studyMode || "Online");
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const id = openEditId;
        const payload = { subject: editSubject.trim(), studyMode: editMode };
        try {
            await onUpdate?.(id, payload);
            setRows((prev) =>
                prev.map((r) => (r._id === id ? { ...r, ...payload } : r))
            );
            setOpenEditId(null);
        } catch (e2) {
            console.error(e2);
        }
    };

    // Loading state
    if (loading) {
        return (
            <main className="min-h-[calc(100vh-4rem)] bg-base-100 px-4 py-10">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-2xl md:text-3xl font-extrabold mb-4">My Connections</h1>
                    <div className="card bg-base-200/50 border border-base-300">
                        <div className="card-body">
                            <div className="skeleton h-8 w-40 mb-4" />
                            <div className="overflow-x-auto">
                                <div className="skeleton h-10 w-full mb-2" />
                                <div className="skeleton h-10 w-full mb-2" />
                                <div className="skeleton h-10 w-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    // Error state
    if (err) {
        return (
            <main className="min-h-[calc(100vh-4rem)] bg-base-100 px-4 py-10">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-2xl md:text-3xl font-extrabold mb-4">My Connections</h1>
                    <div className="alert alert-error">
                        <span>{err}</span>
                    </div>
                </div>
            </main>
        );
    }

    // Empty state
    if (!rows.length) {
        return (
            <main className="min-h-[calc(100vh-4rem)] bg-base-100 px-4 py-10">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-primary/15 to-secondary/15 shadow-sm">
                        <svg width="26" height="26" viewBox="0 0 24 24" className="opacity-80">
                            <path d="M10 18a8 8 0 1 1 5.292-14.03" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="M21 21l-4.35-4.35" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </div>
                    <h2 className="text-xl md:text-2xl font-extrabold">No requests yet</h2>
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
                                    {rows.map((r) => (
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
                                                <span className="badge badge-ghost">{r.subject}</span>
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
                                                        onClick={() => handleOpenEdit(r)}
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

                        {/* Footer (optional) */}
                        {/* <div className="p-3 flex items-center justify-end gap-2">
                            <span className="text-xs text-base-content/60">
                                {rows.length} request{rows.length > 1 ? "s" : ""}
                            </span>
                        </div> */}
                    </div>
                </div>
            </div>

            {/* Update Modal */}
            <dialog id="updateModal" className={`modal ${openEditId ? "modal-open" : ""}`}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Update Request</h3>
                    <form onSubmit={handleUpdate} className="mt-3 space-y-3">
                        <label className="form-control">
                            <span className="label-text">Subject</span>
                            <input
                                type="text"
                                value={editSubject}
                                onChange={(e) => setEditSubject(e.target.value)}
                                className="input input-bordered"
                                placeholder="e.g., Mathematics"
                                required
                            />
                        </label>

                        <label className="form-control">
                            <span className="label-text">Study Mode</span>
                            <select
                                value={editMode}
                                onChange={(e) => setEditMode(e.target.value)}
                                className="select select-bordered"
                                required
                            >
                                <option>Online</option>
                                <option>Offline</option>
                            </select>
                        </label>
                        <div className="modal-action">
                            <button type="button" className="btn btn-ghost" onClick={() => setOpenEditId(null)}>
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">Save changes</button>
                        </div>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop" onClick={() => setOpenEditId(null)}>
                    <button>close</button>
                </form>
            </dialog>
        </main>
    );
};

export default MyConnections;
