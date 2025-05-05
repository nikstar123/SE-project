import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  User,
  Package,
  Heart,
  Settings,
  LogOut,
  Clock,
  Truck,
  Edit,
  Trash2,
} from "lucide-react";
import mockProducts from "../data/mockProducts";
import { motion } from "framer-motion";

const TabContent: React.FC<{ children: React.ReactNode; active: boolean }> = ({
  children,
  active,
}) => {
  if (!active) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

const ProfilePage: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("listings");

  // Mock data
  const myListings = mockProducts.slice(0, 3);
  const purchasedItems = mockProducts.slice(3, 5);
  const watchlistItems = mockProducts.slice(5, 8);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-neutral-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm p-8 text-center">
            <User size={48} className="mx-auto mb-4 text-neutral-400" />
            <h1 className="text-2xl font-semibold mb-4">Sign In Required</h1>
            <p className="text-neutral-600 mb-6">
              Please sign in to view your profile and manage your listings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login" className="btn btn-primary">
                Sign In
              </Link>
              <Link to="/register" className="btn btn-outline">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="container mx-auto px-4">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-primary-800 to-primary-700 h-32 md:h-48 relative">
            <div className="absolute -bottom-16 left-8">
              <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white flex items-center justify-center">
                <User size={64} className="text-neutral-300" />
              </div>
            </div>
          </div>

          <div className="pt-20 pb-6 px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-2xl font-bold text-neutral-800">
                  {user?.name}
                </h1>
                <p className="text-neutral-600">{user?.email}</p>
              </div>

              <div className="flex space-x-3 mt-4 md:mt-0">
                <button className="btn btn-primary">
                  <Edit size={18} className="mr-2" />
                  Edit Profile
                </button>
                <button className="btn btn-outline" onClick={logout}>
                  <LogOut size={18} className="mr-2" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs and Content */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-neutral-200">
            <div className="flex overflow-x-auto scrollbar-hide">
              <button
                className={`px-6 py-4 font-medium text-sm flex items-center whitespace-nowrap ${
                  activeTab === "listings"
                    ? "text-primary-700 border-b-2 border-primary-700"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
                onClick={() => setActiveTab("listings")}
              >
                <Package size={18} className="mr-2" />
                My Listings
              </button>

              <button
                className={`px-6 py-4 font-medium text-sm flex items-center whitespace-nowrap ${
                  activeTab === "purchases"
                    ? "text-primary-700 border-b-2 border-primary-700"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
                onClick={() => setActiveTab("purchases")}
              >
                <Truck size={18} className="mr-2" />
                Purchases
              </button>

              <button
                className={`px-6 py-4 font-medium text-sm flex items-center whitespace-nowrap ${
                  activeTab === "watchlist"
                    ? "text-primary-700 border-b-2 border-primary-700"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
                onClick={() => setActiveTab("watchlist")}
              >
                <Heart size={18} className="mr-2" />
                Watchlist
              </button>

              <button
                className={`px-6 py-4 font-medium text-sm flex items-center whitespace-nowrap ${
                  activeTab === "settings"
                    ? "text-primary-700 border-b-2 border-primary-700"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
                onClick={() => setActiveTab("settings")}
              >
                <Settings size={18} className="mr-2" />
                Settings
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* My Listings Tab */}
            <TabContent active={activeTab === "listings"}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">My Listings</h2>
                <Link to="/sell" className="btn btn-primary">
                  Create New Listing
                </Link>
              </div>

              {myListings.length > 0 ? (
                <div className="space-y-4">
                  {myListings.map((listing) => (
                    <div
                      key={listing.id}
                      className="border border-neutral-200 rounded-lg p-4 flex flex-col md:flex-row items-start md:items-center"
                    >
                      <img
                        src={listing.images[0]}
                        alt={listing.title}
                        className="w-full md:w-20 h-20 object-cover rounded-md mb-4 md:mb-0"
                      />

                      <div className="md:ml-4 flex-grow">
                        <h3 className="font-medium text-lg">{listing.title}</h3>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <span className="badge badge-primary">
                            ${listing.price.toFixed(2)}
                          </span>
                          <span className="badge badge-secondary capitalize">
                            {listing.condition.replace("-", " ")}
                          </span>
                          <span className="flex items-center text-sm text-neutral-500">
                            <Clock size={14} className="mr-1" />
                            Expires:{" "}
                            {new Date(listing.expiresAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4 md:mt-0">
                        <Link
                          to={`/edit-listing/${listing.id}`}
                          className="btn btn-outline py-1 px-3"
                        >
                          <Edit size={16} className="mr-1" />
                          Edit
                        </Link>
                        <button className="btn btn-outline py-1 px-3 border-red-500 text-red-500 hover:bg-red-50">
                          <Trash2 size={16} className="mr-1" />
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-neutral-50 rounded-lg">
                  <Package
                    size={48}
                    className="mx-auto mb-4 text-neutral-400"
                  />
                  <h3 className="text-xl font-medium mb-2">No Listings Yet</h3>
                  <p className="text-neutral-600 mb-6">
                    You haven't created any listings yet. Start selling today!
                  </p>
                  <Link to="/sell" className="btn btn-primary">
                    Create Your First Listing
                  </Link>
                </div>
              )}
            </TabContent>

            {/* Purchases Tab */}
            <TabContent active={activeTab === "purchases"}>
              <h2 className="text-xl font-semibold mb-6">Purchase History</h2>

              {purchasedItems.length > 0 ? (
                <div className="space-y-4">
                  {purchasedItems.map((purchase) => (
                    <div
                      key={purchase.id}
                      className="border border-neutral-200 rounded-lg p-4 flex flex-col md:flex-row items-start md:items-center"
                    >
                      <img
                        src={purchase.images[0]}
                        alt={purchase.title}
                        className="w-full md:w-20 h-20 object-cover rounded-md mb-4 md:mb-0"
                      />

                      <div className="md:ml-4 flex-grow">
                        <h3 className="font-medium text-lg">
                          {purchase.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <span className="badge badge-primary">
                            ${purchase.price.toFixed(2)}
                          </span>
                          <span className="badge badge-secondary">
                            Purchased
                          </span>
                          <span className="flex items-center text-sm text-neutral-500">
                            <Clock size={14} className="mr-1" />
                            Date:{" "}
                            {new Date(purchase.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 md:mt-0">
                        <Link
                          to={`/product/${purchase.id}`}
                          className="btn btn-outline py-1 px-3"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-neutral-50 rounded-lg">
                  <Truck size={48} className="mx-auto mb-4 text-neutral-400" />
                  <h3 className="text-xl font-medium mb-2">No Purchases Yet</h3>
                  <p className="text-neutral-600 mb-6">
                    You haven't purchased any items yet. Start browsing to find
                    great deals!
                  </p>
                  <Link to="/browse" className="btn btn-primary">
                    Browse Items
                  </Link>
                </div>
              )}
            </TabContent>

            {/* Watchlist Tab */}
            <TabContent active={activeTab === "watchlist"}>
              <h2 className="text-xl font-semibold mb-6">My Watchlist</h2>

              {watchlistItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {watchlistItems.map((item) => (
                    <div key={item.id} className="card group relative">
                      <Link
                        to={`/product/${item.id}`}
                        className="block relative overflow-hidden aspect-[4/3]"
                      >
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </Link>

                      <div className="p-4">
                        <h3 className="font-medium text-lg text-neutral-800 truncate">
                          {item.title}
                        </h3>
                        <p className="text-primary-700 font-semibold mt-1">
                          ${item.price.toFixed(2)}
                        </p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="badge badge-primary capitalize">
                            {item.condition.replace("-", " ")}
                          </span>
                          <button className="text-red-500 hover:text-red-600">
                            <Heart size={18} fill="currentColor" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-neutral-50 rounded-lg">
                  <Heart size={48} className="mx-auto mb-4 text-neutral-400" />
                  <h3 className="text-xl font-medium mb-2">
                    Your Watchlist is Empty
                  </h3>
                  <p className="text-neutral-600 mb-6">
                    Save items you're interested in by clicking the heart icon
                    on product pages.
                  </p>
                  <Link to="/browse" className="btn btn-primary">
                    Browse Items
                  </Link>
                </div>
              )}
            </TabContent>

            {/* Settings Tab */}
            <TabContent active={activeTab === "settings"}>
              <h2 className="text-xl font-semibold mb-6">Account Settings</h2>

              <div className="space-y-8">
                {/* Profile Information */}
                <div className="border border-neutral-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium mb-4">
                    Profile Information
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={user?.name}
                        className="input w-full"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={user?.email}
                        className="input w-full"
                        placeholder="Your email address"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="input w-full"
                        placeholder="Your phone number"
                      />
                    </div>

                    <div className="pt-2">
                      <button className="btn btn-primary">Save Changes</button>
                    </div>
                  </div>
                </div>

                {/* Change Password */}
                <div className="border border-neutral-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium mb-4">Change Password</h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        className="input w-full"
                        placeholder="••••••••"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="input w-full"
                        placeholder="••••••••"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        className="input w-full"
                        placeholder="••••••••"
                      />
                    </div>

                    <div className="pt-2">
                      <button className="btn btn-primary">
                        Update Password
                      </button>
                    </div>
                  </div>
                </div>

                {/* Notification Preferences */}
                <div className="border border-neutral-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium mb-4">
                    Notification Preferences
                  </h3>

                  <div className="space-y-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-primary-700 rounded"
                        defaultChecked
                      />
                      <span className="ml-2 text-neutral-700">
                        Email notifications for new bids
                      </span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-primary-700 rounded"
                        defaultChecked
                      />
                      <span className="ml-2 text-neutral-700">
                        Email notifications for messages
                      </span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-primary-700 rounded"
                        defaultChecked
                      />
                      <span className="ml-2 text-neutral-700">
                        Email notifications for watchlist items
                      </span>
                    </label>

                    <div className="pt-2">
                      <button className="btn btn-primary">
                        Save Preferences
                      </button>
                    </div>
                  </div>
                </div>

                {/* Delete Account */}
                <div className="border border-red-200 rounded-lg p-6 bg-red-50">
                  <h3 className="text-lg font-medium text-red-700 mb-4">
                    Delete Account
                  </h3>
                  <p className="text-neutral-700 mb-4">
                    Once you delete your account, there is no going back. Please
                    be certain.
                  </p>
                  <button className="btn bg-red-600 hover:bg-red-700 text-white">
                    Delete Account
                  </button>
                </div>
              </div>
            </TabContent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
