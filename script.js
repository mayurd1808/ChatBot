const courseData = {
  courses: [
    {
      name: "AI Foundations Bootcamp",
      aliases: ["ai foundations", "bootcamp", "ai bootcamp"],
      fees: "INR 24,999",
      duration: "8 weeks",
      syllabus: [
        "Python basics for AI",
        "Prompt engineering fundamentals",
        "Introduction to machine learning",
        "Working with APIs and automation tools",
        "Mini project: FAQ chatbot"
      ],
      eligibility: "Basic programming knowledge and comfort using a computer regularly.",
      timings: "Weekend batches: Saturday and Sunday, 10:00 AM to 12:00 PM IST.",
      mode: "Online live classes with recorded sessions.",
      certification: "Certificate of completion is provided after the final project submission."
    },
    {
      name: "Data Science Career Program",
      aliases: ["data science", "career program", "ds program"],
      fees: "INR 39,999",
      duration: "16 weeks",
      syllabus: [
        "Python for data analysis",
        "Statistics and exploratory data analysis",
        "Machine learning with scikit-learn",
        "SQL and dashboards",
        "Capstone project and interview prep"
      ],
      eligibility: "Graduates, final-year students, or working professionals with basic math and programming exposure.",
      timings: "Weekday batches: Monday, Wednesday, Friday, 7:00 PM to 9:00 PM IST.",
      mode: "Hybrid learning: live online sessions plus self-paced assignments.",
      certification: "Industry-ready certificate and capstone review upon completion."
    },
    {
      name: "Automation with Python",
      aliases: ["automation", "python automation", "automation with python"],
      fees: "INR 18,500",
      duration: "6 weeks",
      syllabus: [
        "Python scripting essentials",
        "Working with files, email, and spreadsheets",
        "REST APIs and webhook basics",
        "Task scheduling and workflow automation",
        "Final automation project"
      ],
      eligibility: "Beginners with basic Python syntax knowledge.",
      timings: "Evening batches: Tuesday and Thursday, 6:30 PM to 8:00 PM IST.",
      mode: "Online instructor-led program.",
      certification: "Project-based completion certificate."
    }
  ],
  defaultContact: {
    email: "admissions@example.com",
    phone: "+91-98765-43210",
    hours: "Monday to Saturday, 9:00 AM to 6:00 PM IST"
  }
};

const intentKeywords = {
  fees: ["fee", "fees", "price", "cost", "tuition"],
  duration: ["duration", "length", "how long", "weeks", "months"],
  syllabus: ["syllabus", "curriculum", "topics", "modules", "subjects", "cover"],
  eligibility: ["eligibility", "eligible", "prerequisite", "requirements", "qualification"],
  timings: ["timing", "timings", "schedule", "class time", "batch", "when"],
  mode: ["mode", "online", "offline", "hybrid", "format"],
  certification: ["certificate", "certification"],
  contact: ["contact", "support", "email", "phone", "call", "reach"]
};

const genericCourseKeywords = ["course", "courses", "program", "programs", "available", "offer"];

const chatMessages = document.getElementById("chat-messages");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const clearChatButton = document.getElementById("clear-chat");
const chips = document.querySelectorAll(".chip");

function normalize(text) {
  return text.trim().toLowerCase().replace(/\s+/g, " ");
}

function detectIntent(message) {
  const text = normalize(message);
  for (const [intent, keywords] of Object.entries(intentKeywords)) {
    if (keywords.some((keyword) => text.includes(keyword))) {
      return intent;
    }
  }
  return "general";
}

function findCourse(message) {
  const text = normalize(message);
  return courseData.courses.find((course) => {
    const names = [course.name.toLowerCase(), ...course.aliases];
    return names.some((name) => text.includes(name));
  }) || null;
}

function formatCourseList() {
  return `We currently offer: ${courseData.courses.map((course) => course.name).join(", ")}.`;
}

function answerGeneralQuery(message) {
  const text = normalize(message);
  if (genericCourseKeywords.some((keyword) => text.includes(keyword))) {
    return formatCourseList();
  }

  return "I can help with course fees, duration, syllabus, eligibility, timings, mode, certification, and contact details. Try asking: What is the fee for AI Foundations Bootcamp?";
}

function answerQuery(message) {
  const intent = detectIntent(message);
  const course = findCourse(message);

  if (intent === "contact") {
    const contact = courseData.defaultContact;
    return `You can contact the admissions team at ${contact.email} or ${contact.phone}. Support hours are ${contact.hours}.`;
  }

  if (intent === "general") {
    return answerGeneralQuery(message);
  }

  if (!course) {
    return `I can answer that, but please mention the course name. Available courses are: ${courseData.courses.map((item) => item.name).join(", ")}.`;
  }

  if (intent === "fees") {
    return `The fee for ${course.name} is ${course.fees}.`;
  }
  if (intent === "duration") {
    return `The duration of ${course.name} is ${course.duration}.`;
  }
  if (intent === "syllabus") {
    return `The syllabus for ${course.name} includes:\n- ${course.syllabus.join("\n- ")}`;
  }
  if (intent === "eligibility") {
    return `Eligibility for ${course.name}: ${course.eligibility}`;
  }
  if (intent === "timings") {
    return `The class timings for ${course.name} are: ${course.timings}`;
  }
  if (intent === "mode") {
    return `${course.name} is offered in this format: ${course.mode}`;
  }
  if (intent === "certification") {
    return `${course.name}: ${course.certification}`;
  }

  return answerGeneralQuery(message);
}

function appendMessage(content, sender) {
  const message = document.createElement("div");
  message.className = `message ${sender}`;
  message.textContent = content;
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function handleSend(message) {
  if (!message.trim()) {
    appendMessage("Please type a question so I can help.", "bot");
    return;
  }

  appendMessage(message, "user");
  const response = answerQuery(message);

  window.setTimeout(() => {
    appendMessage(response, "bot");
  }, 180);
}

function setWelcomeMessages() {
  chatMessages.innerHTML = "";
  appendMessage("Hello! I'm CourseBot. Ask me about course fees, duration, syllabus, timings, eligibility, or contact details.", "bot");
  appendMessage(formatCourseList(), "bot");
}

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = userInput.value;
  handleSend(message);
  userInput.value = "";
  userInput.focus();
});

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const question = chip.textContent || "";
    userInput.value = question;
    handleSend(question);
    userInput.value = "";
    userInput.focus();
  });
});

clearChatButton.addEventListener("click", () => {
  setWelcomeMessages();
  userInput.focus();
});

setWelcomeMessages();
