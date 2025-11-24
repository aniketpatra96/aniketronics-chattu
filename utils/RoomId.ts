export const getRoomId: (userId1: string, userId2: string) => string = (
  userId1,
  userId2
) => {
  const sortedIds: string[] = [userId1, userId2].sort();
  const roomId: string = sortedIds.join("-");
  return roomId;
};
