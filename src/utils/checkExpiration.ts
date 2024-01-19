const isExpired = (createdAt: string | Date) => {
  const tokenGenerationTime = new Date(createdAt);

  // calculate difference in milliseconds
  const timeDifference = Date.now() - tokenGenerationTime.getTime();

  // check if is expired
  const isExpired = timeDifference > 15 * 60 * 1000;

  return isExpired;
};

export { isExpired };
