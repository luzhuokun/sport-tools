import { customSchedule } from "../custom.schedule";

describe("单循环-1号位固定逆时针轮转编排法", () => {
  test("不足两队", () => {
    expect(() => customSchedule(["A1"])).toThrow("对阵不足两队");
  });

  test("2个队对阵", () => {
    expect(customSchedule(["A1", "A2"])).toEqual([[["A1", "A2"]]]);
  });
  test("3个队对阵", () => {
    expect(customSchedule(["A1", "A2", "A3"])).toEqual([
      [["A2", "A3"]],
      [["A1", "A3"]],
      [["A1", "A2"]],
    ]);
  });
  test("4个队对阵", () => {
    expect(customSchedule(["A1", "A2", "A3", "A4"])).toEqual([
      [
        ["A1", "A4"],
        ["A2", "A3"],
      ],
      [
        ["A1", "A3"],
        ["A4", "A2"],
      ],
      [
        ["A1", "A2"],
        ["A3", "A4"],
      ],
    ]);
  });
  test("5个队对阵", () => {
    expect(customSchedule(["A1", "A2", "A3", "A4", "A5"])).toEqual([
      [
        ["A2", "A5"],
        ["A3", "A4"],
      ],
      [
        ["A1", "A5"],
        ["A2", "A3"],
      ],
      [
        ["A1", "A4"],
        ["A5", "A3"],
      ],
      [
        ["A1", "A3"],
        ["A4", "A2"],
      ],
      [
        ["A1", "A2"],
        ["A4", "A5"],
      ],
    ]);
  });
  test("6个队对阵", () => {
    expect(customSchedule(["A1", "A2", "A3", "A4", "A5", "A6"])).toEqual([
      [
        ["A1", "A6"],
        ["A2", "A5"],
        ["A3", "A4"],
      ],
      [
        ["A1", "A5"],
        ["A6", "A4"],
        ["A2", "A3"],
      ],
      [
        ["A1", "A4"],
        ["A5", "A3"],
        ["A6", "A2"],
      ],
      [
        ["A1", "A3"],
        ["A4", "A2"],
        ["A5", "A6"],
      ],
      [
        ["A1", "A2"],
        ["A3", "A6"],
        ["A4", "A5"],
      ],
    ]);
  });
  test("7个队对阵", () => {
    expect(customSchedule(["A1", "A2", "A3", "A4", "A5", "A6", "A7"])).toEqual([
      [
        ["A2", "A7"],
        ["A3", "A6"],
        ["A4", "A5"],
      ],
      [
        ["A1", "A7"],
        ["A2", "A5"],
        ["A3", "A4"],
      ],
      [
        ["A1", "A6"],
        ["A7", "A5"],
        ["A2", "A3"],
      ],
      [
        ["A1", "A5"],
        ["A6", "A4"],
        ["A7", "A3"],
      ],
      [
        ["A1", "A4"],
        ["A5", "A3"],
        ["A6", "A2"],
      ],
      [
        ["A1", "A3"],
        ["A4", "A2"],
        ["A6", "A7"],
      ],
      [
        ["A1", "A2"],
        ["A4", "A7"],
        ["A5", "A6"],
      ],
    ]);
  });
  test("8个队对阵", () => {
    expect(
      customSchedule(["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8"])
    ).toEqual([
      [
        ["A1", "A8"],
        ["A2", "A7"],
        ["A3", "A6"],
        ["A4", "A5"],
      ],
      [
        ["A1", "A7"],
        ["A8", "A6"],
        ["A2", "A5"],
        ["A3", "A4"],
      ],
      [
        ["A1", "A6"],
        ["A7", "A5"],
        ["A8", "A4"],
        ["A2", "A3"],
      ],
      [
        ["A1", "A5"],
        ["A6", "A4"],
        ["A7", "A3"],
        ["A8", "A2"],
      ],
      [
        ["A1", "A4"],
        ["A5", "A3"],
        ["A6", "A2"],
        ["A7", "A8"],
      ],
      [
        ["A1", "A3"],
        ["A4", "A2"],
        ["A5", "A8"],
        ["A6", "A7"],
      ],
      [
        ["A1", "A2"],
        ["A3", "A8"],
        ["A4", "A7"],
        ["A5", "A6"],
      ],
    ]);
  });
  test("9个队对阵", () => {
    expect(
      customSchedule(["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9"])
    ).toEqual([
      [
        ["A2", "A9"],
        ["A3", "A8"],
        ["A4", "A7"],
        ["A5", "A6"],
      ],
      [
        ["A1", "A9"],
        ["A2", "A7"],
        ["A3", "A6"],
        ["A4", "A5"],
      ],
      [
        ["A1", "A8"],
        ["A9", "A7"],
        ["A2", "A5"],
        ["A3", "A4"],
      ],
      [
        ["A1", "A7"],
        ["A8", "A6"],
        ["A9", "A5"],
        ["A2", "A3"],
      ],
      [
        ["A1", "A6"],
        ["A7", "A5"],
        ["A8", "A4"],
        ["A9", "A3"],
      ],
      [
        ["A1", "A5"],
        ["A6", "A4"],
        ["A7", "A3"],
        ["A8", "A2"],
      ],
      [
        ["A1", "A4"],
        ["A5", "A3"],
        ["A6", "A2"],
        ["A8", "A9"],
      ],
      [
        ["A1", "A3"],
        ["A4", "A2"],
        ["A6", "A9"],
        ["A7", "A8"],
      ],
      [
        ["A1", "A2"],
        ["A4", "A9"],
        ["A5", "A8"],
        ["A6", "A7"],
      ],
    ]);
  });
});
