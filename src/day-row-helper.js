const pickDayFromId = (id) => {
  const result = /\d{4}-\d{2}-(\d{2})/.exec(id);
  if (result === null || result.length !== 2) return null;
  return Number(result[1]);
};

const isUnappliedDay = (row) => {
  return Array.from(row.getElementsByClassName('vapply'))
    .flatMap((applyCell) =>
      Array.from(applyCell.getElementsByClassName('png-add')))
    .length > 0;
};

const isWorkday = (row) => {
  return ['odd', 'even']
    .some((className) => row.className.includes(className));
};

const getTargetDayRows = (excludedDays) => {
  const isNotExcludedDay = (row) => {
    return !excludedDays.includes(pickDayFromId(row.id));
  };
  const dayRows = Array.from(document.getElementsByClassName('days'));
  return dayRows
    .filter(isWorkday)
    .filter(isUnappliedDay)
    .filter(isNotExcludedDay);
};

const getTargetButtons = (className, excludedDays) => {
  return getTargetDayRows(excludedDays)
    .flatMap((row) => Array.from(row.getElementsByClassName(className)));
};

export { getTargetButtons };
