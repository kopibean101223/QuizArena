export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-3xl font-semibold">My Project</h1>
      <p className="text-gray-500">
        Next.js frontend connected to a FastAPI + LangChain + Socket.IO backend.
      </p>
    </main>
  );
}
