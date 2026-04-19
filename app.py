import json
import re
from pathlib import Path


DATA_PATH = Path(__file__).parent / "data" / "course_data.json"


INTENT_KEYWORDS = {
    "fees": ["fee", "fees", "price", "cost", "tuition"],
    "duration": ["duration", "length", "how long", "weeks", "months"],
    "syllabus": ["syllabus", "curriculum", "topics", "modules", "subjects", "cover"],
    "eligibility": ["eligibility", "eligible", "prerequisite", "requirements", "qualification"],
    "timings": ["timing", "timings", "schedule", "class time", "batch", "when"],
    "mode": ["mode", "online", "offline", "hybrid", "format"],
    "certification": ["certificate", "certification"],
    "contact": ["contact", "support", "email", "phone", "call", "reach"]
}


GENERIC_COURSE_KEYWORDS = ["course", "courses", "program", "programs", "available", "offer"]


def load_data():
    with DATA_PATH.open("r", encoding="utf-8") as file:
        return json.load(file)


def normalize(text):
    return re.sub(r"\s+", " ", text.strip().lower())


def detect_intent(user_input):
    text = normalize(user_input)
    for intent, keywords in INTENT_KEYWORDS.items():
        if any(keyword in text for keyword in keywords):
            return intent
    return "general"


def find_course(user_input, courses):
    text = normalize(user_input)
    for course in courses:
        possible_names = [course["name"].lower(), *course.get("aliases", [])]
        if any(alias in text for alias in possible_names):
            return course
    return None


def format_course_list(courses):
    course_names = [course["name"] for course in courses]
    return "We currently offer: " + ", ".join(course_names) + "."


def format_syllabus(course):
    items = "\n".join(f"- {topic}" for topic in course["syllabus"])
    return f"The syllabus for {course['name']} includes:\n{items}"


def answer_general_query(user_input, data):
    text = normalize(user_input)
    if any(keyword in text for keyword in GENERIC_COURSE_KEYWORDS):
        return format_course_list(data["courses"])

    return (
        "I can help with course fees, duration, syllabus, eligibility, timings, mode, "
        "certification, and contact details. "
        "Try asking something like: 'What is the fee for the AI Foundations Bootcamp?'"
    )


def answer_query(user_input, data):
    courses = data["courses"]
    course = find_course(user_input, courses)
    intent = detect_intent(user_input)

    if intent == "contact":
        contact = data["default_contact"]
        return (
            f"You can contact the admissions team at {contact['email']} or {contact['phone']}. "
            f"Support hours are {contact['hours']}."
        )

    if intent == "general":
        return answer_general_query(user_input, data)

    if course is None:
        available_courses = ", ".join(course["name"] for course in courses)
        return (
            f"I can answer that, but please mention the course name. Available courses are: "
            f"{available_courses}."
        )

    if intent == "fees":
        return f"The fee for {course['name']} is {course['fees']}."
    if intent == "duration":
        return f"The duration of {course['name']} is {course['duration']}."
    if intent == "syllabus":
        return format_syllabus(course)
    if intent == "eligibility":
        return f"Eligibility for {course['name']}: {course['eligibility']}"
    if intent == "timings":
        return f"The class timings for {course['name']} are: {course['timings']}"
    if intent == "mode":
        return f"{course['name']} is offered in this format: {course['mode']}"
    if intent == "certification":
        return f"{course['name']}: {course['certification']}"

    return answer_general_query(user_input, data)


def run_chatbot():
    data = load_data()
    print("CourseBot is ready. Ask about fees, duration, syllabus, timings, or type 'exit' to quit.")

    while True:
        user_input = input("\nYou: ").strip()
        if not user_input:
            print("Bot: Please enter a question so I can help.")
            continue
        if normalize(user_input) in {"exit", "quit", "bye"}:
            print("Bot: Thanks for chatting. Goodbye!")
            break

        response = answer_query(user_input, data)
        print(f"Bot: {response}")


if __name__ == "__main__":
    run_chatbot()
