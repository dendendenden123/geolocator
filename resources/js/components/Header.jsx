import { Link } from "@inertiajs/react";

const Header = () => {
    return (
        <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-10">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                        IP Geolocation Tracker
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                        Look up IP addresses and view geolocation information
                    </p>
                </div>
                <div className="flex items-center space-x-4">
                    <>
                        <Link
                            href={route("logout")}
                            className="bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <i className="fas fa-user-circle mr-1"></i> Logout
                        </Link>
                    </>
                </div>
            </div>
        </header>
    );
};

export default Header;
