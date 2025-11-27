export default async function Page() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const response = await fetch(`${baseUrl}/api/leaderboard`, {
    cache: "no-store",
  });

  const json = await response.json();
  const leaderboardData = json.data || [];

  // group wins by player + symbol
  const grouped: Record<string, { X: number; O: number }> = {};

  leaderboardData.forEach((row: any) => {
    if (!grouped[row.name]) {
      grouped[row.name] = { X: 0, O: 0 };
    }
    if (row.winner === "X") grouped[row.name].X += 1;
    if (row.winner === "O") grouped[row.name].O += 1;
  });

  // convert to array so we can sort it
  const summary = Object.entries(grouped);

  // sort by total wins (X + O), descending order
  summary.sort((a: any, b: any) => {
    const totalA = a[1].X + a[1].O;
    const totalB = b[1].X + b[1].O;
    return totalB - totalA;
  });

  return (
    <div className="flex-col mt-10">
      <div className="flex flex-col items-center flex-1">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-wide text-slate-800">
          Leaderboard
        </h1>
      </div>

      <div className="flex flex-col items-center gap-4 flex-1 mt-10">
        {summary.length === 0 && (
          <div className="font-bold text-l">No scores yet. Play a game first.</div>
        )}

        {summary.map(([name, stats]: any, index: number) => {
          const parts = [];

          if (stats.X > 0) parts.push(`X ${stats.X} ${stats.X === 1 ? "time" : "times"}`);
          if (stats.O > 0) parts.push(`O ${stats.O} ${stats.O === 1 ? "time" : "times"}`);

          return (
            <div key={name} className="font-bold text-l">
              {index + 1}. {name} won as {parts.join(" and ")}
            </div>
          );
        })}
      </div>
    </div>
  );
}
