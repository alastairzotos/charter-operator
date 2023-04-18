
export interface HostParseResult {
  subdomain: string;
  apiSubdomain: string;
  domain: string;
}

export const parseHost = (resource: string): HostParseResult => {
  const [subdomain, domain] = resource.split('.');

  return {
    subdomain,
    apiSubdomain: subdomain + '-api',
    domain
  }
}

export const getApiUrlForHost = (host: string) => {
  const [subdomain, domain, tld] = host.split('.');

  return `${subdomain}-api.${domain}.${tld}`;
}
