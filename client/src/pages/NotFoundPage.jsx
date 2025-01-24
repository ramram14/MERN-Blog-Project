import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
        <h1 className="text-6xl font-bold text-red-600">404</h1>
        <p className="text-xl text-gray-700 mt-4">Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
        <button
          onClick={() => navigate('/')} // Mengarahkan kembali ke homepage
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Go to Homepage
        </button>
      </div>
    </>
  )
}