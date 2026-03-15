import express from 'express';
import crypto from 'node:crypto';

const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const FIRST_NAMES = ['James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Charles', 'Karen', 'Christopher', 'Lisa', 'Daniel', 'Nancy', 'Matthew', 'Betty', 'Anthony', 'Margaret', 'Mark', 'Sandra', 'Donald', 'Ashley', 'Steven', 'Dorothy', 'Paul', 'Kimberly', 'Andrew', 'Emily', 'Joshua', 'Donna', 'Kenneth', 'Michelle', 'Kevin', 'Carol', 'Brian', 'Amanda', 'George', 'Melissa', 'Timothy', 'Deborah', 'Ronald', 'Stephanie', 'Edward', 'Rebecca', 'Jason', 'Sharon', 'Jeffrey', 'Laura', 'Ryan', 'Cynthia'];
const LAST_NAMES = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts'];
const STREETS = ['Main St', 'Oak Ave', 'Maple Dr', 'Cedar Ln', 'Elm St', 'Pine Rd', 'Washington Blvd', 'Lake Ave', 'Hill St', 'Park Dr', 'Sunset Blvd', 'Broadway', 'Cherry Ln', 'Forest Ave', 'Highland Dr', 'Meadow Ln', 'River Rd', 'Spring St', 'Valley Rd', 'Walnut St', 'Birch Ln', 'Chestnut Ave', 'Dogwood Dr', 'Fairview Rd', 'Garden St'];
const CITIES = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'Charlotte', 'Indianapolis', 'San Francisco', 'Seattle', 'Denver', 'Nashville', 'Portland', 'Memphis', 'Louisville', 'Baltimore', 'Milwaukee', 'Albuquerque', 'Tucson', 'Fresno', 'Mesa', 'Sacramento'];
const STATES = [['AL','Alabama'],['AK','Alaska'],['AZ','Arizona'],['AR','Arkansas'],['CA','California'],['CO','Colorado'],['CT','Connecticut'],['DE','Delaware'],['FL','Florida'],['GA','Georgia'],['HI','Hawaii'],['ID','Idaho'],['IL','Illinois'],['IN','Indiana'],['IA','Iowa'],['KS','Kansas'],['KY','Kentucky'],['LA','Louisiana'],['ME','Maine'],['MD','Maryland'],['MA','Massachusetts'],['MI','Michigan'],['MN','Minnesota'],['MS','Mississippi'],['MO','Missouri'],['MT','Montana'],['NE','Nebraska'],['NV','Nevada'],['NH','New Hampshire'],['NJ','New Jersey'],['NM','New Mexico'],['NY','New York'],['NC','North Carolina'],['ND','North Dakota'],['OH','Ohio'],['OK','Oklahoma'],['OR','Oregon'],['PA','Pennsylvania'],['RI','Rhode Island'],['SC','South Carolina'],['SD','South Dakota'],['TN','Tennessee'],['TX','Texas'],['UT','Utah'],['VT','Vermont'],['VA','Virginia'],['WA','Washington'],['WV','West Virginia'],['WI','Wisconsin'],['WY','Wyoming']];
const COMPANIES = ['Acme Corp', 'Globex', 'Initech', 'Umbrella Corp', 'Stark Industries', 'Wayne Enterprises', 'Wonka Industries', 'Cyberdyne Systems', 'Soylent Corp', 'Massive Dynamic', 'Aperture Science', 'Oscorp', 'Hooli', 'Pied Piper', 'Dunder Mifflin'];
const INDUSTRIES = ['Technology', 'Healthcare', 'Finance', 'Education', 'Manufacturing', 'Retail', 'Energy', 'Real Estate', 'Transportation', 'Media', 'Consulting', 'Agriculture', 'Construction', 'Entertainment', 'Hospitality'];
const DOMAINS = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'protonmail.com'];
const COLOR_NAMES = ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange', 'Pink', 'Cyan', 'Magenta', 'Teal', 'Coral', 'Salmon', 'Navy', 'Lime', 'Maroon', 'Olive', 'Aqua', 'Ivory', 'Silver', 'Gold', 'Crimson', 'Indigo', 'Violet', 'Turquoise', 'Tan', 'Khaki', 'Plum', 'Orchid', 'Wheat', 'Sienna'];
const GENDERS = ['male', 'female', 'non-binary'];

const genPerson = () => {
  const first = pick(FIRST_NAMES);
  const last = pick(LAST_NAMES);
  const domain = pick(DOMAINS);
  return {
    firstName: first,
    lastName: last,
    fullName: `${first} ${last}`,
    email: `${first.toLowerCase()}.${last.toLowerCase()}${randInt(1, 999)}@${domain}`,
    phone: `(${randInt(200, 999)}) ${randInt(200, 999)}-${String(randInt(1000, 9999))}`,
    birthday: `${randInt(1950, 2005)}-${String(randInt(1, 12)).padStart(2, '0')}-${String(randInt(1, 28)).padStart(2, '0')}`,
    gender: pick(GENDERS),
    address: genAddress(),
  };
};

const genAddress = () => {
  const state = pick(STATES);
  return {
    street: `${randInt(100, 9999)} ${pick(STREETS)}`,
    city: pick(CITIES),
    state: state[1],
    stateCode: state[0],
    zip: String(randInt(10000, 99999)),
    country: 'United States',
    latitude: Math.round((Math.random() * 50 + 25) * 10000) / 10000,
    longitude: Math.round((Math.random() * -60 - 65) * 10000) / 10000,
  };
};

const genCompany = () => ({
  name: `${pick(LAST_NAMES)} ${pick(['Solutions', 'Technologies', 'Industries', 'Group', 'Partners', 'Systems', 'Labs', 'Digital', 'Dynamics', 'Ventures'])}`,
  industry: pick(INDUSTRIES),
  phone: `(${randInt(200, 999)}) ${randInt(200, 999)}-${String(randInt(1000, 9999))}`,
  website: `https://www.${pick(LAST_NAMES).toLowerCase()}${pick(['tech', 'solutions', 'co', 'io', 'inc'])}.com`,
  founded: randInt(1950, 2023),
  employees: pick(['1-10', '11-50', '51-200', '201-500', '501-1000', '1001-5000', '5000+']),
  address: genAddress(),
});

const genText = (paragraphs = 1, sentences = 5) => {
  const words = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo', 'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate', 'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia', 'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'];
  const genSentence = () => {
    const len = randInt(5, 15);
    const s = Array.from({ length: len }, () => pick(words)).join(' ');
    return s.charAt(0).toUpperCase() + s.slice(1) + '.';
  };
  return Array.from({ length: paragraphs }, () =>
    Array.from({ length: sentences }, genSentence).join(' ')
  ).join('\n\n');
};

const luhnChecksum = (num) => {
  let sum = 0;
  let alt = false;
  for (let i = num.length - 1; i >= 0; i--) {
    let n = parseInt(num[i], 10);
    if (alt) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alt = !alt;
  }
  return sum % 10;
};

const genCreditCard = () => {
  const types = [
    { name: 'Visa', prefix: '4', length: 16 },
    { name: 'Mastercard', prefix: String(randInt(51, 55)), length: 16 },
    { name: 'Amex', prefix: pick(['34', '37']), length: 15 },
    { name: 'Discover', prefix: '6011', length: 16 },
  ];
  const type = pick(types);
  let num = type.prefix;
  while (num.length < type.length - 1) {
    num += String(randInt(0, 9));
  }
  const checkDigit = (10 - luhnChecksum(num + '0')) % 10;
  num += String(checkDigit);

  return {
    number: num,
    type: type.name,
    expiry: `${String(randInt(1, 12)).padStart(2, '0')}/${randInt(26, 32)}`,
    cvv: String(randInt(type.name === 'Amex' ? 1000 : 100, type.name === 'Amex' ? 9999 : 999)),
    holder: `${pick(FIRST_NAMES)} ${pick(LAST_NAMES)}`,
    _disclaimer: 'TEST DATA ONLY - Not a real credit card number',
  };
};

const genColor = () => {
  const r = randInt(0, 255);
  const g = randInt(0, 255);
  const b = randInt(0, 255);
  return {
    hex: `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`,
    rgb: { r, g, b },
    hsl: (() => {
      const rn = r / 255; const gn = g / 255; const bn = b / 255;
      const max = Math.max(rn, gn, bn); const min = Math.min(rn, gn, bn);
      const l = (max + min) / 2;
      let h = 0; let s = 0;
      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
        else if (max === gn) h = ((bn - rn) / d + 2) / 6;
        else h = ((rn - gn) / d + 4) / 6;
      }
      return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
    })(),
    name: pick(COLOR_NAMES),
  };
};

const genMany = (fn, count) => {
  const n = Math.min(Math.max(parseInt(count, 10) || 1, 1), 100);
  return n === 1 ? fn() : Array.from({ length: n }, fn);
};

app.get('/', (_req, res) => {
  res.json({
    name: 'Random Data Generator API',
    version: '1.0.0',
    endpoints: {
      'GET /person?count=1': 'Random person with name, email, phone, address',
      'GET /company?count=1': 'Random company with name, industry, address',
      'GET /address?count=1': 'Random US address with coordinates',
      'GET /text?paragraphs=1&sentences=5': 'Random lorem ipsum text',
      'GET /credit-card?count=1': 'Random test credit card (Luhn-valid)',
      'GET /uuid?count=1': 'Random UUID v4',
      'GET /color?count=1': 'Random color (hex, rgb, hsl)',
      'GET /health': 'Health check',
    },
  });
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/person', (req, res) => res.json(genMany(genPerson, req.query.count)));
app.get('/company', (req, res) => res.json(genMany(genCompany, req.query.count)));
app.get('/address', (req, res) => res.json(genMany(genAddress, req.query.count)));
app.get('/credit-card', (req, res) => res.json(genMany(genCreditCard, req.query.count)));
app.get('/color', (req, res) => res.json(genMany(genColor, req.query.count)));

app.get('/uuid', (req, res) => {
  const count = Math.min(Math.max(parseInt(req.query.count, 10) || 1, 1), 100);
  const uuids = Array.from({ length: count }, () => crypto.randomUUID());
  res.json(count === 1 ? { uuid: uuids[0] } : { uuids });
});

app.get('/text', (req, res) => {
  const paragraphs = Math.min(parseInt(req.query.paragraphs, 10) || 1, 20);
  const sentences = Math.min(parseInt(req.query.sentences, 10) || 5, 20);
  res.json({ paragraphs, sentences, text: genText(paragraphs, sentences) });
});

app.listen(PORT, () => {
  console.log(`Random Data Generator API running on port ${PORT}`);
});
