# Course Query Chatbot

This project is a simple Python chatbot that answers course-related questions such as fees, duration, syllabus, eligibility, timings, learning mode, certification, and contact details.

## Features

- Handles common course queries from a command-line chat interface
- Uses structured JSON data for course information
- Matches user questions using lightweight intent detection
- Asks for the course name when a question is incomplete
- Includes fallback guidance for unsupported questions

## Project Structure

```text
.
|-- app.py
|-- data/
|   `-- course_data.json
`-- README.md
```

## Requirements

- Python 3.9+

## Run The Chatbot

```bash
python app.py
```

## Example Questions

- What is the fee for AI Foundations Bootcamp?
- How long is the Data Science Career Program?
- Show me the syllabus for Automation with Python
- What are the timings for the AI Foundations Bootcamp?
- Is the Data Science Career Program online?
- Do you provide certification for Automation with Python?
- How can I contact admissions?

## Notes

- The chatbot uses rule-based intent detection instead of an external LLM, which keeps it easy to run and review.
- Course data can be expanded by editing `data/course_data.json`.
- This is intentionally simple and submission-friendly for an internship assessment.x