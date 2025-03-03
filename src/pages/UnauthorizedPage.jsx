
const UnauthorizedPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
        <h1 className="text-6xl font-bold text-red-500 mb-4">401</h1>
        <h2 className="text-2xl font-semibold mb-2">Unauthorized</h2>
        <p className="text-gray-600 mb-6">You do not have permission to view this page.</p>
        <a href="/" className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all">Go Home</a>
      </div>
    </div>
  );
};

export default UnauthorizedPage
