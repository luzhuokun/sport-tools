export type TeamInfo = {
  name: string;
};

export type BattleInfo<T> = {
  v1: T;
  v2: T;
  score?: [number, number];
  abandonTeam?: T; // 弃赛的队
};

export type BattleInfo2<T> = Partial<
  BattleInfo<T> & {
    tempName1: string;
    lastBattle1: BattleInfo2<T>;
    tempName2: string;
    lastBattle2: BattleInfo2<T>;
  }
>;

export type CountType = {
  score: number;
  radioOfSameScore?: [number, number];
  customScore?: number;
};
