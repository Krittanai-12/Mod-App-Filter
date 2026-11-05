// Keep navigation targets shared by the navbar, page layouts, and in-page actions.
export const workspacePaths = {
  workspace: '/home',
  history: '/history',
  policies: '/policies',
  api: '/api',
  settings: '/settings',
} as const;
export const adminPaths = {
  overview: '/admin',
  members: '/admin/members',
  policies: '/admin/policies',
  activity: '/admin/activity',
} as const;

export function pageForPath<T extends string>(
  paths: Record<T, string>,
  pathname: string,
  fallback: T,
): T {
  const normalized = pathname.replace(/\/$/, '') || '/';
  return (Object.keys(paths) as T[]).find((page) => paths[page] === normalized) ?? fallback;
}
