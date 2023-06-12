import { PeriodType } from "../interfaces/enum"


export function getStartDate(type: PeriodType) {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const date = now.getDate()
    switch (type) {
      // case PeriodType.TODAY:
      //   return `${year}-${month}-${date}`
      // case PeriodType.YEAR:
      //   return `${year}-01-01`
      // case PeriodType.QUARTER_1:
      //   return `${year}-01-01`
      // case PeriodType.QUARTER_2:
      //   return `${year}-04-01`
      // case PeriodType.QUARTER_3:
      //   return `${year}-07-01`
      // case PeriodType.QUARTER_4:
      //   return `${year}-10-01`
    }
    return `${year}-${month}-01`
  }

export function getEndDate(type: PeriodType) {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    let date = now.getDate()
    switch (type) {
      // case PeriodType.TODAY:
      //   return `${year}-${month}-${date}`
      // case PeriodType.YEAR:
      //   return `${year}-12-31`
      // case PeriodType.QUARTER_1:
      //   return `${year}-03-31`
      // case PeriodType.QUARTER_2:
      //   return `${year}-06-30`
      // case PeriodType.QUARTER_3:
      //   return `${year}-09-30`
      // case PeriodType.QUARTER_4:
      //   return `${year}-12-31`
    }

    date = month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12 ? 31 : 30;
    if (month === 2) { date = year % 4 === 0 && year % 100 !== 0 || year % 400 === 0 ? 29 : 28 }
    return `${year}-${month}-${date}`
  }