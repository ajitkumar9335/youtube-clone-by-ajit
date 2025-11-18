export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md px-6">

        {/* Title */}
        <h1 className="text-3xl font-semibold mb-10">Login</h1>

        {/* Email */}
        <div className="mb-6">
          <label className="block text-lg mb-2">Email</label>
          <input
            type="email"
            className="w-full border-b border-gray-400 focus:border-black outline-none py-2 text-lg"
            defaultValue="ajithkumar800@gmail.com"
          />
        </div>

        {/* Password */}
        <div className="mb-10">
          <label className="block text-lg mb-2">Password</label>
          <input
            type="password"
            className="w-full border-b border-gray-400 focus:border-black outline-none py-2 text-lg"
            defaultValue="********"
          />
        </div>

        {/* Sign In Button (Right Aligned) */}
        <div className="flex justify-end mb-10">
          <button className="text-xl font-medium hover:underline">
            Sign in
          </button>
        </div>

        {/* Create Account */}
        <button className="text-xl font-medium hover:underline">
          Create account
        </button>
      </div>
    </div>
  );
}
