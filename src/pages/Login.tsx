
import { AuthForm } from "@/components/ui/auth-form";

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
        <h1 className="text-4xl font-extrabold text-center tracking-tight">
          <span className="text-chili-600">Chili</span>
          <span className="text-pepper-600">Check</span>
        </h1>
        <p className="text-center text-gray-600 mt-2">
          Intelligent chili analysis powered by AI
        </p>
      </div>
      <AuthForm />
    </div>
  );
};

export default Login;
