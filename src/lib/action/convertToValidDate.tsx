export const convertToValidDate = (date: Date) => {
  const parsedDate = new Date(date);
  const now = new Date();

  const isSameDay = parsedDate.toDateString() === now.toDateString();
  const isSameWeek =
    (parsedDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24) < 7 &&
    parsedDate.getDay() <= now.getDay();
  const isSameMonth =
    parsedDate.getMonth() === now.getMonth() &&
    parsedDate.getFullYear() === now.getFullYear();
  const isSameYear = parsedDate.getFullYear() === now.getFullYear();

  if (isSameDay) {
    return (
      <div>
        {parsedDate.toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}
      </div>
    );
  } else if (isSameWeek) {
    return (
      <div>
        {parsedDate.toLocaleDateString(undefined, {
          weekday: "short",
        })}{" "}
        {parsedDate.toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}
      </div>
    );
  } else if (isSameMonth) {
    return (
      <div>
        {parsedDate.toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
        })}
      </div>
    );
  } else if (isSameYear) {
    return (
      <div>
        {parsedDate.toLocaleDateString(undefined, {
          day: "numeric",
          month: "long",
        })}
      </div>
    );
  } else {
    return (
      <div>
        {parsedDate.toLocaleDateString(undefined, {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </div>
    );
  }
};
