import React, { useEffect, useMemo, useState } from "react";
import useAxios from "../../hooks/axios/useAxios";
import { HashLoader } from "react-spinners";
import Swal from "sweetalert2";
import NoPartner from "../../components/NoPartner/NoPartner";
import PartnerCard from "../../components/PartnerCard/PartnerCard";

const FindPartners = () => {
  const axios = useAxios();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // --- UI state ---
  const [term, setTerm] = useState("");
  const [sort, setSort] = useState("");

  // ✅ Pagination state
  const [page, setPage] = useState(1);
  const pageSize = 8; // change: 8 / 12 / 16

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/all-partners");
        setData(res.data || []);
      } catch (error) {
        console.log(error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [axios]);

  const onSortChange = async (v) => {
    try {
      setLoading(true);
      const res = await axios.get(`/partners/sort?expSort=${v}`);
      setData(res.data || []);
      setPage(1); // ✅ reset page on sort
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Derived pagination values
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  // Clamp page if data changes (e.g. after search)
  useEffect(() => {
    if (totalPages === 0) return;
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

  const pagedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return data.slice(start, end);
  }, [data, page, pageSize]);

  // Pagination helpers
  const startItem = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, totalItems);

  // Show limited page buttons (nice UI)
  const pageButtons = useMemo(() => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);

    // show: 1 ... (page-1,page,page+1) ... last
    const btns = new Set([1, totalPages, page - 1, page, page + 1]);
    const cleaned = [...btns].filter((n) => n >= 1 && n <= totalPages).sort((a, b) => a - b);

    // inject "..." markers
    const result = [];
    for (let i = 0; i < cleaned.length; i++) {
      if (i > 0 && cleaned[i] - cleaned[i - 1] > 1) result.push("...");
      result.push(cleaned[i]);
    }
    return result;
  }, [page, totalPages]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <HashLoader color="#73abff" size={80} />
      </div>
    );
  }

  if (data.length === 0) {
    return <NoPartner />;
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-base-100 px-4 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold">Find Partners</h1>
            <p className="text-sm text-base-content/70">
              Browse study partners and explore their profiles.
            </p>
          </div>

          {/* Controls */}
          <div className="w-full sm:w-auto flex items-center gap-2">
            {/* Sort */}
            <select
              className="select select-bordered select-sm"
              value={sort}
              onChange={(e) => {
                const v = e.target.value;
                setSort(v);
                onSortChange(v);
              }}
            >
              <option value="">Sort</option>
              <option value="Expert">Experience: Expert → Intermediate → Beginner</option>
              <option value="Intermediate">Experience: Intermediate → Expert → Beginner</option>
              <option value="Beginner">Experience: Beginner → Intermediate → Expert</option>
            </select>

            {/* Search */}
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  setLoading(true);
                  const res = await axios.get(`/partners?search=${term.trim()}`);
                  setData(res.data || []);
                  setPage(1); // ✅ reset page on search
                } catch (error) {
                  await Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `Something went wrong while Searching: ${error}`,
                  });
                } finally {
                  setLoading(false);
                }
              }}
              className="w-full"
            >
              <div className="flex flex-col sm:flex-row sm:items-stretch gap-2 w-full">
                <input
                  type="text"
                  className="input input-bordered w-full sm:w-auto flex-1"
                  placeholder="Search by subject"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                />
                <button
                  type="submit"
                  className="btn btn-primary btn-sm sm:btn-md w-full sm:w-auto py-3 sm:py-4"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Partner Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {pagedData.map((p) => (
            <PartnerCard key={p?._id || p?.id} p={p} />
          ))}
        </section>

        {/* ✅ Pagination */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-sm text-base-content/70">
            Showing <span className="font-semibold">{startItem}</span>–{" "}
            <span className="font-semibold">{endItem}</span> of{" "}
            <span className="font-semibold">{totalItems}</span>
          </div>

          <div className="join">
            <button
              className="btn btn-sm join-item"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              type="button"
            >
              Prev
            </button>

            {pageButtons.map((n, idx) =>
              n === "..." ? (
                <button
                  key={`dots-${idx}`}
                  className="btn btn-sm join-item btn-disabled"
                  type="button"
                >
                  ...
                </button>
              ) : (
                <button
                  key={n}
                  className={`btn btn-sm join-item ${page === n ? "btn-primary" : ""}`}
                  onClick={() => setPage(n)}
                  type="button"
                >
                  {n}
                </button>
              )
            )}

            <button
              className="btn btn-sm join-item"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              type="button"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default FindPartners;
