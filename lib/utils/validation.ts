export function isValidSubdomain(subdomain: string): boolean {
  const subdomainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]$/;
  return (
    subdomain.length >= 3 &&
    subdomain.length <= 32 &&
    subdomainRegex.test(subdomain) &&
    !subdomain.startsWith('-') &&
    !subdomain.endsWith('-')
  );
}

export function sanitizeSubdomain(subdomain: string): string {
  return subdomain
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '')
    .replace(/^-+|-+$/g, '');
}