import { useEffect, useState } from "preact/hooks";
import { getProfile } from "../services/api";
import { useNavigate } from "react-router-dom";

export const Home: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

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
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  });

  return <div>{loading ? "Loading...." : message}</div>;
};
