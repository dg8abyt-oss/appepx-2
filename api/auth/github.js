export default function handler(req, res) {
  const clientId = process.env.GITHUB_CLIENT_ID; 
  const hostUrl = process.env.HOST_URL || `https://${req.headers.host}`;
  const redirectUri = encodeURIComponent(`${hostUrl}/api/auth/github-callback`);
  
  // Requesting repo access to push the vibe-coded projects
  const scope = 'repo user'; 
  
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
  
  res.redirect(302, githubAuthUrl);
}
