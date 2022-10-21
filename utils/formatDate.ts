const FormatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  // 时分秒为0 则不展示
  const time = hour === 0 && minute === 0 && second === 0 ? '' : `${hour}:${minute}:${second}`;
  return `${year}-${month}-${day} ${time}`;
};
export default FormatDate;
