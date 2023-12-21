// 1号位固定逆时针轮转法
export function customSchedule<T>(arr: T[]): [T, T][][] {
  if (arr.length < 2) {
    throw new Error("对阵不足两队");
  }

  const arrLen = arr.length % 2 === 0 ? arr.length : arr.length + 1; // 队伍总数
  const roundLen = arrLen - 1; // 轮次数量（根据单双队伍数情况）
  const vsLen = arrLen / 2; // 每轮对战数量（包含了轮空场次）

  const res = [[...arr]];
  for (let i = 1; i < roundLen; i++) {
    res[i] = [arr[0], res[i - 1][arrLen - 1]];
    for (let j = 2; j < arrLen; j++) {
      res[i][j] = res[i - 1][j - 1];
    }
  }

  return res.map((item) => {
    const vs: [T, T][] = [];
    for (let i = 0; i < vsLen; i++) {
      // 过滤空场次
      if (!item[i] || !item[arrLen - i - 1]) {
        continue;
      }
      vs.push([item[i], item[arrLen - i - 1]]);
    }
    return vs;
  });
}

// 6人
// 1 2 3 4 5 6
// 1 6 2 3 4 5
// 1 5 6 2 3 4
// 1 4 5 6 2 3
// 1 3 4 5 6 2
