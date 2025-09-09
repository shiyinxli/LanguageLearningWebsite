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
```sql
INSERT INTO users (username) VALUES ('testuser');
```
# alter `users` for auth
```sql
-- 1. Add the new columns
ALTER TABLE users 
ADD COLUMN email VARCHAR(100),
ADD COLUMN password_hash TEXT,
ADD COLUMN created_at TIMESTAMP;

-- 2. Add the NOT NULL constraints (after populating data if needed)
ALTER TABLE users 
ALTER COLUMN email SET NOT NULL,
ALTER COLUMN password_hash SET NOT NULL;

-- 3. Add the UNIQUE constraint for email
ALTER TABLE users 
ADD CONSTRAINT unique_email UNIQUE (email);

-- 4. Set the default value for created_at
ALTER TABLE users 
ALTER COLUMN created_at SET DEFAULT NOW();

-- 5. Change username from TEXT to VARCHAR(50)
-- Note: This might require data validation first
ALTER TABLE users 
ALTER COLUMN username TYPE VARCHAR(50);
```
```sql
ALTER TABLE users
ADD COLUMN password TEXT DEFAULT 'changeme';
-- After updating all existing rows:
ALTER TABLE users ALTER COLUMN password SET NOT NULL;

```
```sql
\copy words(word, translation) FROM '/Users/shiyinli/java1/word-learning-app/backend/words.csv' DELIMITER ',' CSV HEADER;
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



