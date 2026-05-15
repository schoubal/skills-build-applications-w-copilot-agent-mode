export function getCodespaceName() {
  if (process.env.REACT_APP_CODESPACE_NAME) {
    return process.env.REACT_APP_CODESPACE_NAME;
  }

  if (typeof window !== 'undefined') {
    const match = window.location.hostname.match(/^(.+?)-\d+\.app\.github\.dev$/);
    if (match) {
      return match[1];
    }
  }

  return null;
}

export function getApiUrl(endpoint) {
  const codespaceName = getCodespaceName();
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api/${endpoint}/`;
  }
  return `http://localhost:8000/api/${endpoint}/`;
}
