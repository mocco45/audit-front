export function useInitialsAvatar(initials) {
  const names = initials.trim().split(" ");

  const filtered = names.filter((name) => name.length > 0);

  if (filtered.length > 1) {
    return filtered[0][0].toUpperCase() + filtered[1][0].toUpperCase();
  }

  return filtered[0][0].toUpperCase();
}
