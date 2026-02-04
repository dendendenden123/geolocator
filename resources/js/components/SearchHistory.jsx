import { useState, useEffect } from "react";

const SearchHistory = ({
    history = [],
    currentIp,
    onSelectHistory,
    onDeleteHistory,
    onClearHistory,
}) => {
    const [selected, setSelected] = useState([]);

    // Reset selected if history changes
    useEffect(() => {
        setSelected((prev) =>
            prev.filter((ip) => history.some((item) => item.ip === ip)),
        );
    }, [history]);

    const toggleSelect = (ip) => {
        setSelected((prev) =>
            prev.includes(ip) ? prev.filter((x) => x !== ip) : [...prev, ip],
        );
    };

    const selectAll = () => {
        if (selected.length === history.length) {
            setSelected([]);
        } else {
            setSelected(history.map((item) => item.ip));
        }
    };

    const deleteSelected = () => {
        if (onDeleteHistory) onDeleteHistory(selected);
        setSelected([]);
    };

    return (
        <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden h-full">
                <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                            Search History
                        </h2>
                        
                    </div>
                    <div className="flex items-center gap-2">
                        {history.length > 0 && (
                            <>
                                <button
                                    onClick={selectAll}
                                    className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                                >
                                    {selected.length === history.length
                                        ? "Deselect"
                                        : "All"}
                                </button>
                                <button
                                    onClick={deleteSelected}
                                    disabled={selected.length === 0}
                                    className={`text-sm px-2 py-1 rounded ${
                                        selected.length === 0
                                            ? "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                                            : "bg-red-500 text-white hover:bg-red-600"
                                    }`}
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={onClearHistory}
                                    className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                                >
                                    Clear All
                                </button>
                            </>
                        )}
                    </div>
                </div>

                <div className="p-4">
                    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                        {history.length === 0 ? (
                            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                <i className="fas fa-history text-3xl mb-3"></i>
                                <p>Your search history will appear here</p>
                            </div>
                        ) : (
                            history.map((item) => {
                                const time = new Date(
                                    item.timestamp,
                                ).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                });
                                const date = new Date(
                                    item.timestamp,
                                ).toLocaleDateString();
                                const isCurrent = item.ip === currentIp;
                                const isSelected = selected.includes(item.ip);

                                return (
                                    <div
                                        key={`${item.ip}-${item.timestamp}`}
                                        onClick={() => onSelectHistory(item.ip)}
                                        className={`p-4 rounded-lg border cursor-pointer transition-colors flex justify-between items-start ${
                                            isCurrent
                                                ? "border-primary-300 dark:border-primary-700 bg-primary-50 dark:bg-primary-900/30"
                                                : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                                        }`}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <input
                                                type="checkbox"
                                                checked={isSelected}
                                                onChange={(e) => {
                                                    e.stopPropagation();
                                                    toggleSelect(item.ip);
                                                }}
                                                className="w-4 h-4 text-primary-500 rounded border-gray-300 dark:border-gray-600"
                                            />
                                            <div>
                                                <div className="flex items-center">
                                                    <p className="font-medium text-gray-800 dark:text-white">
                                                        {item.ip}
                                                    </p>
                                                    {isCurrent && (
                                                        <span className="ml-2 px-2 py-0.5 text-xs bg-primary-500 text-white rounded-full">
                                                            Current
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                                    {item.city}, {item.country}
                                                </p>
                                                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                    <i className="far fa-clock mr-1"></i>
                                                    <span>
                                                        {time} • {date}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchHistory;
