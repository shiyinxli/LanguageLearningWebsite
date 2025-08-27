# install tailwind in React
```
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```
# update tailwind.config.js
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

# update css entry
usually in src/index.css and src/App.css, replace everything with
```js
@tailwind base;
@tailwind components;
@tailwind utilities;
```

# restart dev server
```
npm start
```
# test it
in App.js, add
```jsx
<h1 className="text-3xl font-bold text-blue-600">Hello Tailwind!</h1>
```