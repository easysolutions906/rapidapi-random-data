**Spotlight:** Generate realistic fake data for testing — people, companies, addresses, Luhn-valid credit cards, UUIDs, colors, and lorem ipsum. Cryptographically random.

Generate realistic fake data for testing and development. People, companies, addresses, credit cards (Luhn-valid), UUIDs, colors, and lorem ipsum text. All cryptographically random.

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/person` | Random person with name, email, phone, address |
| GET | `/company` | Random company with name, industry, address |
| GET | `/address` | Random US address with coordinates |
| GET | `/credit-card` | Random Luhn-valid test credit card |
| GET | `/uuid` | Random UUID v4 |
| GET | `/color` | Random color in hex, RGB, and HSL |
| GET | `/text` | Lorem ipsum text with configurable length |

### Quick Start

```javascript
const response = await fetch('https://random-data-generator.p.rapidapi.com/person?count=3', {
  headers: {
    'x-rapidapi-key': 'YOUR_API_KEY',
    'x-rapidapi-host': 'random-data-generator.p.rapidapi.com'
  }
});
const data = await response.json();
// [{ firstName: "Sarah", lastName: "Johnson", email: "sarah.johnson42@gmail.com", phone: "(555) 234-5678", address: { ... } }, ...]
```

### Rate Limits

| Plan | Requests/month | Rate |
|------|---------------|------|
| Basic (Pay Per Use) | Unlimited | 10/min |
| Pro ($9.99/mo) | 5,000 | 50/min |
| Ultra ($29.99/mo) | 25,000 | 200/min |
| Mega ($99.99/mo) | 100,000 | 500/min |
