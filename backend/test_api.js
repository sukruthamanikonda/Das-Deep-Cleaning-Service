(async () => {
    const base = 'http://localhost:5000';
    try {
        console.log('POST', base + '/api/auth/login');
        const loginRes = await fetch(base + '/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'admin@hygienix.local', password: 'admin123' })
        });
        console.log('login status', loginRes.status);
        const loginText = await loginRes.text();
        console.log('login body (raw):', loginText.substring(0, 2000));
        let loginJson = null;
        try { loginJson = JSON.parse(loginText); console.log('login parsed ok'); } catch (e) { console.error('login parse error', e.message); }
        if (!loginRes.ok) { console.error('Login failed'); return; }
        const token = loginJson.token;
        console.log('token:', token);

        console.log('GET', base + '/api/orders');
        const ordersRes = await fetch(base + '/api/orders', { headers: { Authorization: `Bearer ${token}` } });
        console.log('orders status', ordersRes.status);
        const ordersText = await ordersRes.text();
        console.log('orders body (raw):', ordersText.substring(0, 4000));
        try { const ordersJson = JSON.parse(ordersText); console.log('orders parsed ok', ordersJson.length); } catch (e) { console.error('orders parse error', e.message); }
    } catch (err) {
        console.error('Request error', err);
    }
})();
