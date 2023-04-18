
export interface HostParseResult {
  server: string;
  subdomain: string;
  apiSubdomain: string;
  domain: string;
}

export const parseHost = (resource: string): HostParseResult => {
  const [subdomain, domain] = resource.split('.');

  return {
    subdomain,
    apiSubdomain: subdomain + '-api',
    domain,
    server: resource,
  }
}

export const getApiUrlForHost = (host: string) => {
  const [subdomain, domain, tld] = host.split('.');

  return `${subdomain}-api.${domain}.${tld}`;
}
