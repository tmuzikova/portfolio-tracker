export const getLastTuesday = () => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
  const daysSinceTuesday = (dayOfWeek + 5) % 7; // Days since the last Tuesday
  const lastTuesday = new Date();
  lastTuesday.setDate(today.getDate() - daysSinceTuesday);
  return lastTuesday.toISOString().split('T')[0];
};
