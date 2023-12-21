// 贝格尔编排法
// https://github.com/evagy/bergerMethod
export function bergerSchedule<T>(arr: T[]): [T, T][][] {
  if (arr.length < 2) {
    throw new Error("对阵不足两队");
  }

  const arrLen = arr.length % 2 === 0 ? arr.length : arr.length + 1; // 队伍总数（注意这里包括了轮空队）
  const roundLen = arrLen - 1; // 轮次数量（根据单双队伍数情况）
  const vsLen = arrLen / 2; // 每轮对战数量（包含了轮空场次）

  const jump = arrLen / 2 - 1; // 步数

  const res = [[...arr]];
  for (let i = 1; i < roundLen; i++) {
    res[i] = [];

    if (i % 2 === 0) {
      res[i][arrLen - 1] = arr[arrLen - 1];
    } else {
      res[i][0] = arr[arrLen - 1];
    }

    for (let j = 0; j < arrLen; j++) {
      if (i % 2 === 0 && j === arrLen - 1) {
        continue;
      }

      if (i % 2 !== 0 && j === 0) {
        continue;
      }

      const lastPos =
        j - jump + (i % 2 === 0 ? 0 : 1) > 0
          ? j - jump
          : arrLen - 1 + (j - jump);

      res[i][j] = res[i - 1][lastPos];
    }
  }

  return res.map<[T, T][]>((item) => {
    const vs = [];
    // 如果队伍是单数，去掉第一场轮空的比赛
    for (let i = arr.length % 2; i < vsLen; i++) {
      vs.push([item[i], item[arrLen - i - 1]]);
    }
    return vs;
  });
}

// 6人
// 1 2 3 4 5 6
// 6 5 1 2 3 4
// 2 3 4 5 1 6
// 6 1 2 3 4 5
// 3 4 5 1 2 6
// 8人
// 1 2 3 4 5 6 7 8
// 8 6 7 1 2 3 4 5
// 2 3 4 5 6 7 1 8
// 8 7 1 2 3 4 5 6
// 3 4 5 6 7 1 2 8
// 8 1 2 3 4 5 6 7
// 4 5 6 7 1 2 3 8
// 10人
// 1 2 3 4 5 6 7 8 9 10
// 10 7 8 9 1 2 3 4 5 6
// 2 3 4 5 6 7 8 9 1 10
// 10 8 9 1 2 3 4 5 6 7
// 3 4 5 6 7 8 9 1 2 10
// 10 9 1 2 3 4 5 6 7 8
// 4 5 6 7 8 9 1 2 3 10
// 10 1 2 3 4 5 6 7 8 9
// 5 6 7 8 9 1 2 3 4 10
