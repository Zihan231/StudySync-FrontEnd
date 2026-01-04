// src/pages/Dashboard/DashboardConnections.jsx
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { NavLink } from "react-router";
import { FaWifi, FaUserFriends, FaEdit, FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../hooks/AxiosSecure/useAxiosSecure";
import AuthContext from "../../contexts/Auth/AuthContext/AuthContext";
import { HashLoader } from "react-spinners";
import Swal from "sweetalert2";

const DashboardConnections = () => {
  const [selected, setSelected] = useState({});
  const [updateID, setUpdateID] = useState(null);

  const subjects = useMemo(
    () => [
      "English",
      "Mathematics",
      "Physics",
      "Programming",
      "Chemistry",
      "Biology",
      "Statistics",
      "Economics",
      "History",
    ],
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
        setData(res.data || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) fetchData();
  }, [axiosSecure, user?.email]);

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
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
          isOnline ? "bg-success/20 text-success" : "bg-error/20 text-error"
        }`}
        title="Preferred study format"
      >
        {isOnline ? <FaWifi /> : <FaUserFriends />}
        {isOnline ? "Online" : "Offline"}
      </span>
    );
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Do you want to delete?",
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Cancel`,
    });

    if (!result.isConfirmed) {
      Swal.fire("Action Canceled !!!", "", "info");
      return;
    }

    try {
      const res = await axiosSecure.delete(`/partner/delete/${id}`);
      const r = res.data;

      if (r.acknowledged && r.deletedCount === 1) {
        setData((prev) => prev.filter((item) => item._id !== id));
        Swal.fire("Deleted!", "", "success");
      }
    } catch (err) {
      Swal.fire("Something Went Wrong. Please try again...", "", "info");
      console.log(err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const name = form.name.value.trim();
    const subject = form.subject.value.trim();
    const studyMode = form.studyMode.value;
    const profileImage = form.profileImage.value.trim();

    if (!name) return setError("Name is required.");
    if (name.length < 2) return setError("Name must be at least 2 characters.");

    if (!subject) return setError("Subject is required.");
    if (!subjects.includes(subject))
      return setError("Please select a valid subject from the list.");

    const validModes = ["Online", "Offline"];
    if (!studyMode || !validModes.includes(studyMode))
      return setError("Please select a valid study mode.");

    if (profileImage) {
      try {
        new URL(profileImage);
      } catch {
        return setError("Picture URL is invalid.");
      }
    }

    const inputData = { name, sub: subject, stdMode: studyMode, imgURL: profileImage };
    const input2 = { name, subject, studyMode, profileimage: profileImage, _id: updateID };

    try {
      await axiosSecure.patch(`/partner/update/${updateID}`, inputData);
      setData((prev) => prev.map((item) => (item._id === updateID ? { ...item, ...input2 } : item)));

      Swal.fire({ title: "Profile Updated Successfully !", icon: "success", draggable: true });
      OpenModal.current.close();
    } catch (err) {
      Swal.fire({ title: "Failed !!!", icon: "error", draggable: true });
      OpenModal.current.close();
      console.log(err);
    }
  };

  // ✅ Loader (fits inside dashboard)
  if (loading) {
    return (
      <div className="min-h-[420px] flex items-center justify-center">
        <HashLoader color="#73abff" size={70} />
      </div>
    );
  }

  // ✅ Empty state (fits inside dashboard)
  if (!loading && data.length <= 0) {
    return (
      <div className="min-h-[420px] flex items-center justify-center">
        <div className="max-w-xl text-center">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-linear-to-br from-primary/15 to-secondary/15 shadow-sm">
            <svg width="26" height="26" viewBox="0 0 24 24" className="opacity-80">
              <path
                d="M10 18a8 8 0 1 1 5.292-14.03"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M21 21l-4.35-4.35"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold">No Partners yet</h2>
          <p className="mt-1 text-sm text-base-content/70">
            When you send partner requests, they’ll show up here.
          </p>
          <div className="mt-6">
            <NavLink to="/partners" className="btn btn-primary">
              Find Partners
            </NavLink>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge badge-accent badge-outline">Connections</span>
            <span className="text-xs opacity-70">Your accepted partners</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold">My Connections</h1>
        </div>

        <NavLink to="/partners" className="btn btn-primary btn-sm">
          Find More
        </NavLink>
      </div>

      {/* Table card */}
      <div className="card bg-base-200/50 border border-base-300 shadow-sm">
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
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-12 rounded-full ring ring-primary/20 ring-offset-2 ring-offset-base-100">
                            <img src={safeImg(r.profileimage)} alt={r.name} />
                          </div>
                        </div>
                        <div className="min-w-0">
                          <NavLink
                            to={`/partners/${r.partner_id}`}
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

                    <td>
                      <span
                        className="badge bg-base-100 text-base-content border border-base-300 shadow-sm"
                        style={{ minWidth: "80px", textAlign: "center" }}
                      >
                        {r.subject}
                      </span>
                    </td>

                    <td>
                      <StudyModePill mode={r.studyMode} />
                    </td>

                    <td className="text-right">
                      <div className="inline-flex gap-2">
                        <button
                          className="btn btn-ghost btn-xs"
                          onClick={() => {
                            setUpdateID(r._id);
                            setSelected({
                              name: r.name,
                              subject: r.subject,
                              studyMode: r.studyMode,
                              image: r.profileimage,
                            });
                            OpenModal.current.showModal();
                          }}
                          title="Update"
                        >
                          <FaEdit className="w-4 h-4" />
                          <span className="hidden sm:inline">Update</span>
                        </button>

                        <button
                          className="btn btn-error btn-xs"
                          onClick={() => handleDelete(r._id)}
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

      {/* Modal */}
      <dialog
        ref={OpenModal}
        onClick={(e) => {
          if (e.target === e.currentTarget) OpenModal.current.close();
        }}
        className="modal modal-bottom sm:modal-middle backdrop:bg-base-200/50 backdrop-blur-sm"
      >
        <div className="modal-box rounded-2xl bg-base-100 shadow-lg p-6">
          <h3 className="font-bold text-xl mb-4 text-center">Update Partner</h3>

          <form onSubmit={handleUpdate} method="dialog" className="space-y-4">
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

            <label className="form-control">
              <div className="label">
                <span className="label-text">Subject</span>
              </div>
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

            <label className="form-control w-full">
              <span className="label-text">Study Mode</span>
              <select
                name="studyMode"
                className="select select-bordered w-full"
                value={selected?.studyMode || ""}
                onChange={(e) => setSelected((prev) => ({ ...prev, studyMode: e.target.value }))}
              >
                <option value="" disabled>
                  Select mode
                </option>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
              </select>
            </label>

            <label className="form-control w-full">
              <span className="label-text">Picture URL</span>
              <input
                defaultValue={selected?.image}
                name="profileImage"
                placeholder="https://example.com/photo.jpg"
                className="input input-bordered w-full"
              />
            </label>

            <div className="modal-action flex justify-end gap-2 mt-4">
              <button type="reset" className="btn btn-ghost">
                Reset
              </button>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md text-sm">
                {error}
              </div>
            )}
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default DashboardConnections;
