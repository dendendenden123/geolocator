import { useState } from 'react';

const IPLookupForm = ({ onLookup, onMyIP, isLoading }) => {
  const [ipInput, setIpInput] = useState('');
  const [error, setError] = useState('');

  const isValidIP = (ip) => {
    if (!ip) return false;
    
    // IPv4 regex
    const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    
    // Simplified IPv6 regex
    const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
    
    return ipv4Regex.test(ip) || ipv6Regex.test(ip);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (ipInput && !isValidIP(ipInput)) {
      setError('Please enter a valid IP address');
      return;
    }
    
    setError('');
    onLookup(ipInput);
    setIpInput('');
  };

  const handleClear = () => {
    setIpInput('');
    setError('');
  };

  const handleMyIP = () => {
    setError('');
    onMyIP();
    setIpInput('');
  };

  return (
    <div className="mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            <div className="flex-1">
              <label htmlFor="ipInput" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Enter IP Address to Lookup
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-search text-gray-400"></i>
                </div>
                <input
                  type="text"
                  id="ipInput"
                  value={ipInput}
                  onChange={(e) => {
                    setIpInput(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="e.g., 8.8.8.8 or leave empty for your IP"
                  className={`block w-full pl-10 pr-12 py-3 border rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-colors ${
                    error 
                      ? 'border-red-600 dark:border-red-600' 
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                />
                {ipInput && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <button
                      type="button"
                      onClick={handleClear}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1"
                      title="Clear"
                    >
                      <i className="fas fa-times-circle"></i>
                    </button>
                  </div>
                )}
              </div>
              {error && (
                <div className="text-red-600 text-sm mt-2">
                  <i className="fas fa-exclamation-circle mr-1"></i> {error}
                </div>
              )}
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-primary-600 hover:bg-primary-600 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i> Looking up...
                  </>
                ) : (
                  <>
                    <i className="fas fa-search mr-2"></i> Lookup IP
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleMyIP}
                className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-3 px-6 rounded-lg transition-colors flex items-center"
              >
                <i className="fas fa-user mr-2"></i> Clear
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IPLookupForm;