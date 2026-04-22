export function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    return false;
  }
  return true;
}

export const getInitials = (title) => {
  if (!title) return "";
  return title
    .split(" ")
    .filter((word) => word)
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};
