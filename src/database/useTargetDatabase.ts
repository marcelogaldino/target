import { useSQLiteContext } from "expo-sqlite";

export type TargetCreate = {
  name: string;
  amount: string;
};

export type TargetResponse = {
  id: number;
  name: string;
  amount: string;
  current: number;
  percentage: number;
  created_at: Date;
  updated_at: Date;
};

export function useTargetDatabase() {
  const database = useSQLiteContext();

  async function create(data: TargetCreate) {
    try {
      const statement = await database.prepareAsync(
        "INSERT INTO targets (name, amount) VALUES ($name, $amount)",
      );

      statement.executeAsync({
        $name: data.name,
        $amount: data.amount,
      });
      console.log(`data`, database);
    } catch (error) {
      console.log(`asdasdasdas >>>>`, error);
    }
  }

  function listBySavedValue() {
    return database.getAllAsync<TargetResponse>(`
      SELECT
        targets.id,
        targets.name,
        targets.amount,
        COALESCE(SUM(transactions.amount), 0) AS current,
        COALESCE((SUM(transactions.amount) / targets.amount) * 100, 0) AS percentage,
        targets.created_at,
        targets.updated_at
      FROM targets
      LEFT JOIN transactions ON targets.id = transactions.target_id
      GROUP BY targets.id, targets.name, targets.amount
      ORDER BY current DESC
    `);
  }

  return {
    create,
    listBySavedValue,
  };
}
