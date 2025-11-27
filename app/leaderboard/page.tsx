export default async function Page() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const response = await fetch(`${baseUrl}/api/leaderboard`, {
    cache: "no-store",
  });

  const json = await response.json();
  const leaderboardData = json.data || [];

  return (
    <div className="flex-col mt-10">
      <div className="flex flex-col items-center flex-1">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-wide text-slate-800">
          Leaderboard
        </h1>
      </div>

      <div className="flex flex-col items-center gap-4 flex-1 mt-10">
        {leaderboardData.length === 0 && (
          <div className="font-bold text-l">No scores yet. Play a game first.</div>
        )}

        {leaderboardData.map((row: any, index: number) => (
          <div key={row.id} className="font-bold text-l">
            {index + 1}. {row.name} won as {row.winner}
          </div>
        ))}
      </div>
    </div>
  );
}
