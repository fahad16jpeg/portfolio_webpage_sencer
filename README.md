# Fahad Sencer: Portfolio Website

My personal portfolio: a responsive single-page site covering my skills, experience, education, CV and projects.

## Features

- Dark theme with a teal accent, custom fonts and a subtle hero grid
- Typewriter animation for the roles in the hero section
- Animated skill bars and scroll-triggered reveal animations
- Sticky navigation that highlights the current section, plus a mobile menu
- Experience timeline and education taken from my CV
- **My Resume** section to view or download my CV as a PDF
- Project cards linking to my GitHub repositories and live demos
- Custom cursor on mouse devices, turned off automatically on touch screens
- Respects `prefers-reduced-motion`

## Tech stack

HTML · [Tailwind CSS](https://tailwindcss.com) (CDN) · custom CSS · vanilla JavaScript

## Run it locally

There's no build step. Open `index.html` in a browser, or serve the folder so the CV link and fonts load exactly as they would online:

```bash
python -m http.server 5500
# then open http://localhost:5500
```

## Project structure

```
├── index.html      # Page content and Tailwind config
├── style.css       # Custom styles: cards, timeline, buttons, cursor, animations
├── script.js       # Cursor, typewriter, skill bars, reveals, navigation
└── assets/
    └── Fahad_Sencer_CV.pdf
```

## Contact

- Email: mfahaddd753@gmail.com
- LinkedIn: [muhammad-fahad16](https://www.linkedin.com/in/muhammad-fahad16/)
- GitHub: [@fahad16jpeg](https://github.com/fahad16jpeg)
