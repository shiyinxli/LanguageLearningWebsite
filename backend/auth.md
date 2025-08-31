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
# install dependencies
```
npm install bcrypt jsonwebtoken
```

# test
```
# Signup
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@test.com","password":"1234"}'

# Login (get token)
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"1234"}'

# Use token for protected route
curl -X POST http://localhost:3000/words/20/learn \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{"sentences":["first sentence","second sentence"]}'
```