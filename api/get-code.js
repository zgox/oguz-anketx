export default async function handler(req, res) {
    const clientId = 'b26aadf8-566f-4478-926f-589f601d9c74';
    const scopes = 'offline_access openid';
    const deviceCodeUrl = 'https://login.microsoftonline.com/common/oauth2/v2.0/devicecode';

    try {
        const data = new URLSearchParams({
            'client_id': clientId,
            'scope': scopes,
            'claims': '{"access_token": {"amr": {"values": ["ngcmfa", "mfa"]}}}',
        });

        const response = await fetch(deviceCodeUrl, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: data,
        });

        const result = await response.json();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
