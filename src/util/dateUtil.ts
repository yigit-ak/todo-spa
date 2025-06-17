export interface DateContainerHead {
  mainContent: string;
  sideContent: string;
}

export function getDateContainerHead(date: Date): DateContainerHead {
  // Normalize both dates to midnight so we get whole-day differences
  const msPerDay = 1000 * 60 * 60 * 24;
  const today = new Date();
  const todayMid = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const targetMid = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const dayDifference = Math.round((targetMid.getTime() - todayMid.getTime()) / msPerDay);

  // Check if within one year (365 days) of today
  const isWithinOneYear = Math.abs(dayDifference) < 365;

  // Helpers for weekday names
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const weekdayName = weekdays[date.getDay()];

  // Build date strings, omitting year if within one year
  const month = date.getMonth() + 1;
  const dayNum = date.getDate();
  const yearNum = date.getFullYear();
  const formattedDate = isWithinOneYear
      ? `${month}/${dayNum}`
      : `${month}/${dayNum}/${yearNum}`;
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
    // In the next week
    mainContent = weekdayName;
    sideContent = formattedDate;
  } else if (dayDifference < -1 && dayDifference > -7) {
    // In the past week
    mainContent = `Last ${weekdayName}`;
    sideContent = formattedDate;
  } else {
    // Anything else: show the raw date, with weekday as secondary
    mainContent = formattedDate;
    sideContent = weekdayName;
  }

  return { mainContent, sideContent };
}
