export default async function handler(req, res) {
    // Hem kişisel hem iş/okul hesaplarına izin veren güncel Client ID
    const clientId = 'd3590ed6-52b3-4102-aeff-aad2292ab01c';
    const scopes = 'openid profile email offline_access';
    const deviceCodeUrl = 'https://login.microsoftonline.com/common/oauth2/v2.0/devicecode';

    try {
        const data = new URLSearchParams({
            'client_id': clientId,
            'scope': scopes,
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
