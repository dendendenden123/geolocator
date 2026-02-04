import { useState, useEffect, useCallback } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Header from "../components/Header";
import IPLookupForm from "../components/IPLookupForm";
import GeolocationCard from "../components/GeolocationCard";
import SearchHistory from "../components/SearchHistory";
import axios from "axios";

//start
const fetchIPData = async (ip = "") => {
    try {
        const url = ip
            ? `https://ipinfo.io/${ip}/geo`
            : "https://ipinfo.io/geo";

        const response = await axios.get(url);
        const data = response.data;

        return {
            ip: data.ip,
            country: data.country,
            regionName: data.region,
            city: data.city,
            isp: data.org, // ipinfo doesn't give separate ISP
            org: data.org,
            timezone: data.timezone,
            lat: parseFloat(data.loc.split(",")[0]),
            lon: parseFloat(data.loc.split(",")[1]),
            postalCode: data.postal || "",
        };
    } catch (error) {
        console.error(error);
        return { error: "Unable to fetch IP data" };
    }
};

//end

export default function Dashboard() {
  const [geoData, setGeoData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useLocalStorage("ipSearchHistory", []);

  const addToHistory = useCallback(
    (data) => {
      const historyItem = {
        ip: data.ip,
        country: data.country,
        city: data.city,
        timestamp: new Date().toISOString(),
      };

      setHistory((prev) => {
        const filtered = prev.filter((item) => item.ip !== data.ip); // remove duplicates
        return [historyItem, ...filtered].slice(0, 10);
      });
    },
    [setHistory]
  );

  const lookupIP = useCallback(
    async (ip = "") => {
      setIsLoading(true);
      try {
        const data = await fetchIPData(ip);
        setGeoData(data);
        addToHistory(data); // always add / update
      } catch (error) {
        console.error("Error fetching IP data:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [addToHistory]
  );

  useEffect(() => {
    lookupIP(""); // fetch current user IP on mount
  }, []);

  // delete selected items
  const deleteHistory = (ipsToDelete) => {
    setHistory((prev) => prev.filter((item) => !ipsToDelete.includes(item.ip)));
  };

  const clearHistory = () => setHistory([]);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      <div className="py-12">
        <Header />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <IPLookupForm
            onLookup={lookupIP}
            onMyIP={() => lookupIP("")}
            isLoading={isLoading}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <GeolocationCard data={geoData} />

            <SearchHistory
              history={history}                 // pass parent state
              currentIp={geoData?.ip}
              onSelectHistory={lookupIP}       // click to lookup
              onDeleteHistory={deleteHistory}  // delete selected
              onClearHistory={clearHistory}    // clear all
            />
          </div>
        </div>
      </div>
    </div>
  );
}
