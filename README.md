# German Words learning website
***A full-stack web app to help users learn new words every day, write example sentences, and review them later.***

- Backend: Node.js (Express) with PostgreSQL

- Frontend: React with TailwindCSS

- Database: PostgreSQL on Render

- Authentication: JWT (JSON Web Tokens)

- Deployment: Render (Backend + Database); Vercel (frontend)

## feature
- Daily words: Users get 3 random words per day.

- Learn by example: Mark a word as learned by providing 2 example sentences.

- Review mode: Randomly review previously learned words with your sentences.

- Authentication: Secure login/signup with JWT tokens.

- Modern UI: Styled with TailwindCSS in an elegant beige theme.

## project structure
```
LanguageLearningWebsite/
│
├── backend/            # Node.js + Express API
│   ├── routes/         # Routes: auth.js, words.js
│   ├── db.js           # Database connection (Postgres)
│   ├── index.js        # Entry point
│   └── package.json
│
├── frontend/           # React frontend
│   ├── src/
│   │   ├── pages/      # Pages: Today.js, Review.js, Login.js, Signup.js
│   │   └── App.js
│   └── package.json
│
└── README.md
```

## website url
### frontend
`https://language-learning-website-chi.vercel.app/`
### database
`postgresql://word_learning_db_user:FPaQBn03uCkfAzJqnhHii3fj21CRD9b8@dpg-d305rq7diees7390of60-a.frankfurt-postgres.render.com/word_learning_db`
### backend
`https://languagelearningwebsite-backend.onrender.com`

## screenshots
![image 1](screenshots/1.png)
![image 2](screenshots/2.png)
