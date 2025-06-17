export interface DateContainerHead {
  mainContent: string;
  sideContent: string;
}

export function getDayDifference(target: Date, base: Date = new Date()): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  const baseMid = new Date(base.getFullYear(), base.getMonth(), base.getDate());
  const targetMid = new Date(target.getFullYear(), target.getMonth(), target.getDate());
  return Math.round((targetMid.getTime() - baseMid.getTime()) / msPerDay);
}

function getWeekdayName(date: Date): string {
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return weekdays[date.getDay()];
}

function formatDate(date: Date, withYear: boolean = true): string {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return withYear ? `${month}/${day}/${year}` : `${month}/${day}`;
}

export function getDateContainerHead(date: Date): DateContainerHead {
  const dayDifference = getDayDifference(date);
  const isWithinOneYear = Math.abs(dayDifference) < 365;

  const weekdayName = getWeekdayName(date);
  const formattedDate = formatDate(date, !isWithinOneYear);
  const fullDateWithWeekday = `${weekdayName}, ${formattedDate}`;

  let mainContent: string;
  let sideContent: string;

  if (dayDifference === 0) {
    mainContent = "Today";
    sideContent = fullDateWithWeekday;
  } else if (dayDifference === 1) {
    mainContent = "Tomorrow";
    sideContent = fullDateWithWeekday;
  } else if (dayDifference === -1) {
    mainContent = "Yesterday";
    sideContent = fullDateWithWeekday;
  } else if (dayDifference > 1 && dayDifference < 7) {
    mainContent = weekdayName;
    sideContent = formattedDate;
  } else if (dayDifference < -1 && dayDifference > -7) {
    mainContent = `Last ${weekdayName}`;
    sideContent = formattedDate;
  } else {
    mainContent = formattedDate;
    sideContent = weekdayName;
  }

  return { mainContent, sideContent };
}

export function getRelativeDueDate(date: string): string {
  const dayDifference = getDayDifference(new Date(date));

  if (dayDifference === 0) return "Today";
  if (dayDifference === 1) return "Tomorrow";
  if (dayDifference > 1) return `${dayDifference} days left`;
  return `${Math.abs(dayDifference)} days overdue`;
}

