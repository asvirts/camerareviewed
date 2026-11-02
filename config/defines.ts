/** Build-time public values. They are baked into static HTML. They are not secrets. */

export function publicDefine(
  env: Record<string, string>,
  processEnv: NodeJS.ProcessEnv = process.env,
) {
  const pick = (key: string) => {
    const fromShell = processEnv[key];
    if (typeof fromShell === "string" && fromShell.length > 0) return fromShell;
    return env[key] ?? "";
  };
  return {
    __AMAZON_TAG__: JSON.stringify(pick("AMAZON_TAG")),
    __GOOGLE_SITE_VERIFICATION__: JSON.stringify(pick("GOOGLE_SITE_VERIFICATION")),
    __BING_SITE_VERIFICATION__: JSON.stringify(pick("BING_SITE_VERIFICATION")),
    __CF_WEB_ANALYTICS_TOKEN__: JSON.stringify(pick("CF_WEB_ANALYTICS_TOKEN")),
  };
}
