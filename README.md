# 💸 Finova — Expense Tracker & AI Financial Analytics

> A smart personal finance companion that tracks your expenses, visualizes spending patterns, and delivers AI-powered insights on your spending habits and stock fundamentals.

---

## 🌟 Features

### 📊 Expense Management
- Add, edit, and delete expenses with categories, dates, and notes
- Filter and search expenses by date range or category
- Set monthly budgets per category with overspend alerts
- CSV export of expense history

### 📈 Analytics Dashboard
- Monthly spending overview (bar & line charts)
- Spending breakdown by category (donut chart)
- Budget vs actual comparison
- Top spending days and trends

### 🤖 AI Spending Assistant
- Plain-English monthly spending insights
- Personalized suggestions to reduce overspending
- Predictive alerts — *"You may exceed your budget by ₹3,000 this month"*
- Month-over-month comparison analysis

### 📉 Stock Fundamental Analyzer
- Search any stock (NSE/BSE or US markets)
- View key fundamentals: PE, PB, EPS, ROE, Debt-to-Equity, Revenue growth
- AI-generated plain-English fundamental summary
- Strength verdict: 🟢 Strong / 🟡 Moderate / 🔴 Weak

> ⚠️ **Disclaimer:** Stock analysis is for informational purposes only and does not constitute financial advice.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [React](https://react.dev/) + [Vite](https://vitejs.dev/) |
| **Routing** | [React Router v6](https://reactrouter.com/) |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com/) |
| **Charts & Dashboard** | [Tremor](https://tremor.so/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) |
| **Database & Auth** | [Supabase](https://supabase.com/) (PostgreSQL + RLS) |
| **AI Engine** | [Claude API](https://www.anthropic.com/) / OpenAI API |
| **Stock Data** | [Financial Modeling Prep](https://financialmodelingprep.com/) / Alpha Vantage |
| **AI Streaming** | Fetch API with streaming responses |
| **Caching** | Supabase / Redis |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 🗂️ Project Structure

```
finova/
├── src/
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Signup.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Expenses.tsx
│   │   ├── Budgets.tsx
│   │   ├── Insights.tsx
│   │   ├── Stocks.tsx
│   │   └── Settings.tsx
│   ├── components/
│   │   ├── ui/              # shadcn components
│   │   ├── charts/          # Tremor chart components
│   │   ├── expenses/        # Expense CRUD components
│   │   └── ai/              # AI chat & insight components
│   ├── lib/
│   │   ├── supabase.ts
│   │   ├── ai.ts
│   │   └── stocks.ts
│   └── App.tsx
├── supabase/
│   └── migrations/          # DB schema migrations
└── .env.local
```

---

## 🗃️ Database Schema

```sql
users         → id, email, name, created_at
categories    → id, name, icon, color
expenses      → id, user_id, amount, category_id, date, note
budgets       → id, user_id, category_id, monthly_limit
```

> Row Level Security (RLS) is enabled — users can only access their own data.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A [Supabase](https://supabase.com/) account
- An [Anthropic](https://www.anthropic.com/) or OpenAI API key
- A [Financial Modeling Prep](https://financialmodelingprep.com/) API key

### Installation

```bash
# Clone the repo
git clone https://github.com/your-username/finova.git
cd finova

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

### Environment Variables

```env
# Supabase
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# AI
VITE_ANTHROPIC_API_KEY=your_anthropic_api_key

# Stock Data
VITE_FMP_API_KEY=your_financial_modeling_prep_key
```

### Run the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📸 Screenshots

> Coming soon

---

## 🗺️ Roadmap

- [x] Expense CRUD
- [x] Analytics dashboard
- [x] AI spending insights
- [x] Stock fundamental analyzer
- [ ] Recurring expense tracking
- [ ] Mobile app (React Native)
- [ ] Monthly email summary
- [ ] Shared group expenses
- [ ] Dark mode

---

## 📄 License

MIT License — feel free to use this project as a reference or starting point.

---

## 👤 Author

Built with ❤️ by **[Thaitheyasudan](https://github.com/Thaitheya)**

---

> ⚠️ **Financial Disclaimer:** Finova is a personal finance tool. Stock analysis and AI insights are for informational purposes only and do not constitute financial advice. Always consult a qualified financial advisor before making investment decisions.