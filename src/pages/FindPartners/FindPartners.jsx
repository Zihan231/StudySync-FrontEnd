import React, { useEffect, useState } from "react";

import useAxios from "../../hooks/axios/useAxios";
import { HashLoader } from "react-spinners";
import Swal from "sweetalert2";
import NotFound from "../NotFound/NotFound";
import NoPartner from "../../components/NoPartner/NoPartner";
import PartnerCard from "../../components/PartnerCard/PartnerCard";

const FindPartners = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const axios = useAxios();
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await axios.get("/all-partners");
            const partners = await res.data;
            setData(partners)
            setLoading(false);
        }
        fetchData();
    }, [axios]);
    console.log(data);

    // --- UI state ---
    const [term, setTerm] = useState("");
    const [sort, setSort] = useState("");

    const onSortChange = (v) => console.log("Sort by:", v);





    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[600px]">
                <HashLoader color="#73abff" size={80} />
            </div>
        );
    }
    else if (data.length == 0) {
        return <NoPartner></NoPartner>;
    }
    else {
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
                                    setSort(e.target.value);
                                    onSortChange(e.target.value);
                                }}
                            >
                                <option value="">Sort</option>
                                <option value="newest">Newest</option>
                                <option value="rating_desc">Rating: High → Low</option>
                                <option value="rating_asc">Rating: Low → High</option>
                                <option value="exp_desc">Experience: Expert → Beginner</option>
                                <option value="exp_asc">Experience: Beginner → Expert</option>
                            </select>

                            {/* Search (properly aligned) */}
                            <form
                                onSubmit={async (e) => {
                                    e.preventDefault();
                                    try {
                                        setLoading(true);
                                        const res = await axios.get(`/partners?search=${term.trim()}`);
                                        const searchedData = await res.data;
                                        setData(searchedData);
                                    } catch (error) {
                                        await Swal.fire({
                                            icon: "error",
                                            title: "Oops...",
                                            text: `Something went wrong while Searching: ${error}`,
                                        });
                                    } finally {
                                        setLoading(false);
                                    }

                                    // onSearch(term.trim());
                                }}
                                className="input-group input-group-sm"
                            >
                                <div className="flex items-center gap-1">
                                    <input
                                        type="text"
                                        className="input input-bordered w-48 sm:w-56"
                                        placeholder="Search by subject"
                                        value={term}
                                        onChange={(e) => setTerm(e.target.value)}
                                    />
                                    <button type="submit" className="btn btn-primary btn-sm py-4">
                                        Search
                                    </button>
                                </div>
                            </form>
                        </div>


                    </div>

                    {/* Partner Cards */}
                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.map((p) => (
                            <PartnerCard p={p}></PartnerCard>
                        ))}
                    </section>
                </div>
            </main>
        );
    }
};

export default FindPartners;
