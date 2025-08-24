# set up tutorial
# Step 1: set up project
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

# Step 2: set up PostgreSQL
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
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL
);

CREATE TABLE words (
    id SERIAL PRIMARY KEY,
    word TEXT UNIQUE NOT NULL,
    translation TEXT NOT NULL,
    is_learned BOOLEAN DEFAULT FALSE,
    learned_at TIMESTAMP
);


CREATE TABLE examples (
    id SERIAL PRIMARY KEY,
    word_id INT REFERENCES words(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    sentence TEXT NOT NULL
);
```
```sql
INSERT INTO words (word, translation) VALUES
('Weltschmerz', '世界痛苦（指对世界现状的悲观忧郁）'),
('Fremdschämen', '替别人感到羞耻');
```
