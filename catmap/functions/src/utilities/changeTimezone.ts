const changeTimezone = (currentDate: Date, timezone: string) => {
  const timezoneDate = new Date(currentDate.toLocaleString("en-US", {
    timeZone: timezone,
  }));
  const difference = currentDate.getTime() - timezoneDate.getTime();

  return new Date(currentDate.getTime() - difference);
};

export default changeTimezone;
