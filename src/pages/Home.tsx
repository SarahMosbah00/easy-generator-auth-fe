import { useEffect, useState } from "preact/hooks";
import { getProfile, signout } from "../services/api";
import { Link, useNavigate } from "react-router-dom";

export const Home: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      await signout();
      navigate("/signin");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(error.message);
      }
    }
  }

  useEffect(() => {
    const fetchProfile = async () => {
      try {
       const data = await getProfile();
       setMessage(data.message);
      } catch (error: unknown) {
        if (error instanceof Error) {
          if (error.message === "Unauthorized") {
            navigate("/signin");
          }
          setMessage(error.message);
        }
      } 
    };
    fetchProfile();
  });

  return (
    <div className="flex h-screen">
 
    <aside className="w-64  bg-gradient-to-r from-orange-500 to-red-500 text-white flex flex-col justify-between p-4 h-full">
      <div>
        <nav>
          <ul>
            <li className="mb-4">
              <Link to="/" className="block p-3 text-lg hover:bg-gray-700 rounded">Home</Link>
            </li>
          </ul>
        </nav>
      </div>
      <button 
        className="bg-white text-black p-3 rounded text-lg hover:cursor-pointer"
        onClick={onLogout}
      >
       Logout
      </button>
    </aside>
    <main className="flex-1 p-6 flex items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-900">{message}</h1>
    </main>
  </div>
  )
};
