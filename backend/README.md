# set up tutorial
# set up project
### create a new project folder
```bash
mkdir word-learning-app
cd word-learning-app
```
### initialize node.js project
```bash
npm init -y
```
### add dependencies
```bash
npm install express pg cors dotenv
```
### create strucure
```word-learning-app/
├── index.js         # main entry
├── db.js            # PostgreSQL connection
├── routes/          # API routes
│   └── words.js
├── .env             # DB connection settings
└── package.json
```

# set up PostgreSQL
```bash
psql -U your_user -d postgres
```
```
CREATE DATABASE word_learning;
```
```
\c word_learning
```
```sql
-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Words table
CREATE TABLE words (
  id SERIAL PRIMARY KEY,
  word TEXT NOT NULL,
  translation TEXT NOT NULL,
  is_learned BOOLEAN DEFAULT FALSE,
  learned_at TIMESTAMP
);

-- Examples table
CREATE TABLE examples (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  word_id INT REFERENCES words(id) ON DELETE CASCADE,
  sentence TEXT NOT NULL
);
```


```sql
\copy words(word, translation) FROM '/Users/shiyinli/java1/word-learning-app/backend/words2.csv' DELIMITER ',' CSV HEADER;
```

# test
```
node index.js

curl http://localhost:3000/words/today

curl -X POST http://localhost:3000/words/20/learn \
  -H "Content-Type: application/json" \
  -d '{"userId": 1, "sentences": ["Ich habe eine Sinnkrise nach der Uni.", "Viele Menschen erleben eine Sinnkrise im mittleren Alter."]}'

curl "http://localhost:3000/words/review?userId=1"
```



