# Course Query Chatbot

This project is a simple browser-based chatbot that answers course-related questions such as fees, duration, syllabus, eligibility, timings, learning mode, certification, and contact details.

## Features

- Works as a static website on GitHub Pages
- Handles common course queries through a chat interface
- Uses lightweight JavaScript intent detection
- Includes quick question chips for demo purposes
- Asks for the course name when a question is incomplete

## Project Structure

```text
.
|-- index.html
|-- style.css
|-- script.js
|-- app.py
|-- data/
|   `-- course_data.json
`-- README.md
```

## Run Locally

Open `index.html` in a browser, or deploy the repository to GitHub Pages.

## Example Questions

- What is the fee for AI Foundations Bootcamp?
- How long is the Data Science Career Program?
- Show me the syllabus for Automation with Python
- What are the timings for the AI Foundations Bootcamp?
- Is the Data Science Career Program online?
- Do you provide certification for Automation with Python?
- How can I contact admissions?

## Notes

- GitHub Pages cannot run Python code, so the live version uses `index.html`, `style.css`, and `script.js`.
- The included `app.py` is still available if you want a simple Python CLI version.
- This is intentionally lightweight and submission-friendly for an internship assessment.
