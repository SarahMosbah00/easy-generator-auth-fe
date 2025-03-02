import { useEffect, useState } from "preact/hooks";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyEmail } from "../services/api";

export const EmailVerification: React.FC = () => {  

    const [searchParam] = useSearchParams();   
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const token = searchParam.get('token');

    useEffect(() => {
        if (!token) {
            setErrorMessage('Invalid or missing confirmation token');
            setLoading(false);
            return;
        }
        const verifyEmailFunc = async () => {
            try {
                await verifyEmail(token);
                setErrorMessage(null);
                navigate('/signin');
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setErrorMessage(error.message);
                }
            } finally {
                setLoading(false);
            }
        }
        verifyEmailFunc();
    }, [token]);

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg text-center">
      {loading ? (
        <p className="text-blue-500">Confirming your email...</p>
      ) : errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : (
        <p className="text-green-500">Email confirmed! Redirecting to Sign In...</p>
      )}
    </div>
    )
}