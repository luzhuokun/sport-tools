import type { bergerSchedule } from "@sport-tools/schedule";
import type { BattleInfo, BattleInfo2, CountType, TeamInfo } from "../../types";

export function getScheduleList<T extends TeamInfo>(
  babbleList: ReturnType<typeof getBabbleList<T>>,
  seq: number
) {
  const list = [];
  for (const [i, item] of babbleList.entries()) {
    for (const [j, { v1, v2 }] of item.entries()) {
      const num = i * item.length + j + 1;
      const round = i + 1;
      const site = 6; // 场地 todo lzk
      list.push(
        `第${seq + num}场，组内第${round}轮，${num % site || site}号台，${
          v1.name
        } vs ${v2.name}`
      );
    }
  }
  // console.log("轮次:", babbleList.length); // 单双情况不一样
  // console.log("每轮对阵:", babbleList[0].length);
  // console.log("总场次数:", list.length);
  return list;
}

export function getBabbleList<T>(teams: ReturnType<typeof bergerSchedule<T>>) {
  const list: BattleInfo<T>[][] = [];
  for (const item of teams) {
    list.push([]);
    for (const [v1, v2] of item) {
      list[list.length - 1].push({
        v1,
        v2,
      });
    }
  }
  return list;
}

export function count<T>(
  teams: T[],
  babbleList: ReturnType<typeof getBabbleList<T>>
): Map<T, CountType> {
  const scoreMap = new Map<T, CountType>(teams.map((t) => [t, { score: 0 }]));

  // 统计
  const WIN_SOURCE = 2; // 胜得分
  const LOSE_SOURCE = 1; // 负得分
  const DRAW_SOURCE = 0; // 平得分
  for (const round of babbleList) {
    for (const { v1, v2, score, abandonTeam } of round) {
      if (score && score.length) {
        const [s1, s2] = score;
        const r1 = scoreMap.get(v1);
        const r2 = scoreMap.get(v2);

        if (s1 > s2) {
          r1.score += WIN_SOURCE;
          r2.score += LOSE_SOURCE;
        }

        if (s1 === s2) {
          r1.score += DRAW_SOURCE;
          r2.score += DRAW_SOURCE;
        }

        if (s1 < s2) {
          r1.score += LOSE_SOURCE;
          r2.score += WIN_SOURCE;
        }
      } else if (abandonTeam) {
        const v = abandonTeam === v2 ? v1 : v2;
        const r = scoreMap.get(v);
        r.score += WIN_SOURCE;
      }
    }
  }

  // 计算同分的情况
  const sameScoreMap = new Map<number, T[]>();
  for (const [k, { score }] of scoreMap) {
    if (!sameScoreMap.has(score)) {
      sameScoreMap.set(score, []);
    }
    sameScoreMap.get(score).push(k);
  }
  for (const sameScoreTeam of sameScoreMap.values()) {
    if (sameScoreTeam.length < 2) {
      continue;
    }

    const radioMap = new Map<T, [number, number]>(
      sameScoreTeam.map((team) => [team, [0, 0]])
    );
    // 计算得失比率
    for (const round of babbleList) {
      for (const { v1, v2, score } of round) {
        if (sameScoreTeam.includes(v1) && sameScoreTeam.includes(v2)) {
          const [s1, s2] = score;
          const [d11, d12] = radioMap.get(v1);
          radioMap.set(v1, [s1 + d11, s2 + d12]);
          const [d21, d22] = radioMap.get(v2);
          radioMap.set(v2, [s2 + d21, s1 + d22]);
        }
      }
    }
    // 记录得失比率
    for (const [k, v] of scoreMap) {
      if (radioMap.has(k)) {
        v.radioOfSameScore = radioMap.get(k);
      }
    }
  }
  return scoreMap;
}

export function sort<T>(scoreMap: ReturnType<typeof count<T>>) {
  const sortRes = Array.from(scoreMap);
  sortRes.sort(([t1, s1], [t2, s2]) => {
    const score1 = s1.score;
    const radio1 = s1.radioOfSameScore
      ? s1.radioOfSameScore[0] / s1.radioOfSameScore[1]
      : 0;
    const customScore1 = s1.customScore || 0;
    const score2 = s2.score;
    const radio2 = s2.radioOfSameScore
      ? s2.radioOfSameScore[0] / s2.radioOfSameScore[1]
      : 0;
    const customScore2 = s2.customScore || 0;
    if (score2 === score1) {
      if (radio2 === radio1) {
        return customScore2 - customScore1;
      }
      return radio2 - radio1;
    }
    return score2 - score1;
  });
  return sortRes;
}

// 淘汰对阵
export function getBabbleList2<T>(teams: string[], seq: number) {
  const res: BattleInfo2<T>[][] = [];
  // 第一轮
  res.push([]);
  for (let i = 0; i < Math.ceil(teams.length / 4); i++) {
    const [a1, a2, b1, b2] = teams.slice(i * 4, i * 4 + 4);
    res[0].push({ tempName1: a1, tempName2: b2 });
    res[0].push({ tempName1: b1, tempName2: a2 });
  }
  let temp = 0;
  // 第二轮开始
  for (let i = 1; i < Math.ceil(Math.log2(teams.length)); i++) {
    res.push([]);
    const len = res[i - 1].length;
    for (let j = 0; j < len; j += 2) {
      res[i].push({
        tempName1: `第${seq + temp + j + 1}场胜`,
        lastBattle1: res[i - 1][j],
        tempName2: `第${seq + temp + j + 2}场胜`,
        lastBattle2: res[i - 1][j + 1],
      });
    }
    temp += len;
  }

  return res;
}

export function getScheduleList2<T>(
  babbleList: ReturnType<typeof getBabbleList2<T>>,
  seq: number
) {
  const list = [];
  for (const [index, round] of babbleList.entries()) {
    for (const item of round) {
      list.push(
        `第${seq + list.length + 1}场，淘汰第${index + 1}轮，${
          item.tempName1
        } vs ${item.tempName2}`
      );
    }
  }

  // console.log("轮次:", babbleList.length);
  // console.log("总场次数:", list.length);

  return list;
}

export function getTeamOfWin<T>(battleInfo: BattleInfo2<T>) {
  const { v1, v2, score, lastBattle1, lastBattle2 } = battleInfo;
  const [s1, s2] = score;
  if (!score) {
    console.error("存在未填写比赛结果", battleInfo);
    throw new Error("存在未填写比赛结果");
  }
  if (lastBattle1 && lastBattle2) {
    return getTeamOfWin(s1 > s2 ? lastBattle1 : lastBattle2);
  }
  return s1 > s2 ? v1 : v2;
}

export function getResult<T>(
  teamLen: number, // 2的倍数
  babbleList: ReturnType<typeof getBabbleList2<T>>
) {
  const result: T[][] = [];
  for (const [index, round] of babbleList.reverse().entries()) {
    result[index] = [];
    for (const {
      v1,
      v2,
      lastBattle1,
      lastBattle2,
      score: [s1, s2],
    } of round) {
      if (index + 1 < Math.ceil(Math.log2(teamLen))) {
        const [win, lose] =
          s1 > s2 ? [lastBattle1, lastBattle2] : [lastBattle2, lastBattle1];
        // 一 二
        if (index + 1 === 1) {
          result[index].push(getTeamOfWin(win));
          result[index].push(getTeamOfWin(lose));
        } else {
          // 三、四（不分先后）
          // 五 六 七 八（不分先后）
          result[index].push(getTeamOfWin(lose));
        }
      } else {
        const lose = s1 > s2 ? v2 : v1;
        result[index].push(lose);
      }
    }
  }
  return result;
}
