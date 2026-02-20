export default async function handler(req, res) {
  const { code } = req.query;
  const hostUrl = process.env.HOST_URL || `https://${req.headers.host}`;

  if (!code) {
    return res.status(400).json({ error: 'No code provided' });
  }

  try {
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: code
      })
    });

    const data = await tokenResponse.json();
    
    if (data.error) {
        throw new Error(data.error_description);
    }
    
    // Redirect back to the frontend, passing the token so localStorage can grab it
    res.redirect(302, `${hostUrl}/?token=${data.access_token}`);
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to exchange token: ' + error.message });
  }
}
