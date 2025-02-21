import { XCircleIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Cancel() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
        <XCircleIcon className="text-red-500 w-16 h-16 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800">Payment Cancelled</h2>
        <p className="text-gray-600 mt-2">Your payment was not completed. If this was a mistake, you can try again.</p>

        <div className="mt-6 space-y-3">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={() => navigate("/checkout")}>
            Try Again
          </button>
          <button className="w-full bg-gray-600 hover:bg-gray-700 text-white" onClick={() => navigate("/")}>
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}
