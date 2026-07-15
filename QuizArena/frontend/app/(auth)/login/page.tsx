export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-semibold">Log in</h1>
        <form className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          />
          <button
            type="submit"
            className="w-full rounded-md bg-gray-900 px-3 py-2 text-white"
          >
            Log in
          </button>
        </form>
      </div>
    </main>
  );
}
