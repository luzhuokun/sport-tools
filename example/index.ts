import {
  getBabbleList,
  getScheduleList,
  count,
  sort,
  getBabbleList2,
  getScheduleList2,
  getResult,
} from "@sport-tools/battle";
import { bergerSchedule } from "@sport-tools/schedule";
import { TeamInfo } from "../types";

function match1<T extends TeamInfo>(
  teams: T[],
  babbleList: ReturnType<typeof getBabbleList<T>>
) {
  // 模拟分数录入 todo test
  for (const round of babbleList) {
    for (const vs of round) {
      vs.score = [2, 1];
    }
  }
  // babbleList[0][0][2] = { score: [1, 2] };
  // babbleList[0][1][2] = { abandonTeam: babbleList[0][0][1] };

  // 统计
  const scoreMap = count(teams, babbleList);

  // 存在同分，模拟手动处理同分问题 todo test
  // scoreMap.get(teams[4]).customScore = 3;

  // 排名
  const sortRes = sort(scoreMap);
  // 结果宣布
  // for (const [
  //   index,
  //   [team, { score, radioOfSameScore }],
  // ] of sortRes.entries()) {
  //   console.log(
  //     `第${index + 1}名${team.name}，总得${score}分，得失比${
  //       radioOfSameScore[0] / radioOfSameScore[1]
  //     }，得${radioOfSameScore[0]}，失${radioOfSameScore[1]}`
  //   );
  // }

  return sortRes;
}

function match2<T extends TeamInfo>(
  babbleList: ReturnType<typeof getBabbleList2<T>>
) {
  // 模拟分数录入 todo test
  for (const round of babbleList) {
    for (const vs of round) {
      vs.score = [2, 1];
    }
  }
}

function main() {
  const teamList: TeamInfo[][] = [
    ["A1", "A2", "A3", "A4", "A5", "A6"],
    ["B1", "B2", "B3", "B4", "B5", "B6"],
    ["C1", "C2", "C3", "C4", "C5", "C6"],
    ["D1", "D2", "D3", "D4", "D5", "D6"],
  ].map((item) => item.map((name) => ({ name })));
  const scheduleList = [];

  // 循环小组
  const babbleList = teamList.map((group) =>
    getBabbleList(bergerSchedule(group))
  );

  // 单败淘汰
  const COUNT = 2; // 每组取前二，每四个一组进行对决（赛前确定） todo lzk 目前只满足小组出前两名的情况
  const teamList2 = teamList
    .map((_, index) =>
      Array<string>(COUNT)
        .fill(String.fromCharCode(65 + index))
        .map((v, i) => v + (i + 1))
    )
    .flat(1);
  const babbleList2 = getBabbleList2<TeamInfo>(
    teamList2,
    babbleList.flat(2).length
  );

  babbleList.forEach((item) => {
    scheduleList.push(getScheduleList(item, scheduleList.flat(1).length));
  });
  scheduleList.push(getScheduleList2(babbleList2, scheduleList.flat(1).length));

  console.log("场次安排：", scheduleList.flat(1));

  // 第一阶段 成绩录入
  const sortResult = babbleList.map((item, index) =>
    match1(teamList[index], item)
  );

  // 第二阶段 成员信息录入
  for (let i = 0; i < babbleList2[0].length; i++) {
    babbleList2[0][i].v1 = sortResult[i][0][0];
    if (i % 2 === 0) {
      babbleList2[0][i].v2 = sortResult[i + 1][1][0];
    } else {
      babbleList2[0][i].v2 = sortResult[i - 1][1][0];
    }
  }

  // 第二阶段 成绩录入
  match2(babbleList2);

  // 结果宣布
  const result = getResult(teamList2.length, babbleList2);
  console.log(result);
}
main();
