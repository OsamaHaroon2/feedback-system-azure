QUESTIONS = {
    "Mathematics": [
        {
            "type": "checkbox",
            "question": "How has AI played a role in Mathematics?",
            "options": [
                "Providing study material.",
                "Enhancing learning with AI-driven tools (e.g., simulations).",
                "Assisting with assignments/projects.",
                "Evaluating assignments/exams.",
                "Offering personalized recommendations."
            ]
        },
        {
            "type": "radio",
            "question": "Rate the overall contribution of AI in Mathematics.",
            "options": ["Very High", "High", "Moderate", "Low", "None"]
        },
        {
            "type": "slider",
            "question": "On a scale of 1 to 10, how much impact do you think AI had in Mathematics?",
            "range": [1, 10]
        },
        {
            "type": "likert",
            "question": "To what extent do you agree with the following statements?",
            "statements": [
                "AI tools helped me understand complex mathematical concepts.",
                "AI-driven tools made learning Mathematics more engaging.",
                "AI recommendations were relevant and helpful."
            ],
            "options": ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
        },
        {
            "type": "text",
            "question": "In what ways do you think AI contributed to your learning experience in Mathematics?"
        },
        {
            "type": "star",
            "question": "How would you rate AI's role in Mathematics?",
            "stars": 5
        }
    ],
    "Science": [
        {
            "type": "checkbox",
            "question": "How has AI contributed to Science?",
            "options": [
                "Performing virtual experiments.",
                "Providing AI-driven simulations for experiments.",
                "Offering personalized learning material.",
                "Enhancing visualizations of scientific concepts.",
                "Guiding research methodologies."
            ]
        },
        {
            "type": "radio",
            "question": "Rate the overall contribution of AI in Science.",
            "options": ["Very High", "High", "Moderate", "Low", "None"]
        },
        {
            "type": "slider",
            "question": "On a scale of 1 to 10, how much impact do you think AI had in Science?",
            "range": [1, 10]
        },
        {
            "type": "likert",
            "question": "To what extent do you agree with the following statements?",
            "statements": [
                "AI tools helped me understand scientific experiments.",
                "AI-driven simulations made learning Science more engaging.",
                "AI recommendations for scientific articles were relevant."
            ],
            "options": ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
        },
        {
            "type": "text",
            "question": "Describe how AI contributed to your learning experience in Science."
        },
        {
            "type": "star",
            "question": "Rate AI's role in Science.",
            "stars": 5
        }
    ],
    "History": [
        {
            "type": "checkbox",
            "question": "How has AI helped in learning History?",
            "options": [
                "Providing digital archives of historical data.",
                "Offering AI-driven timelines and summaries.",
                "Creating interactive historical simulations.",
                "Personalized recommendations for historical documentaries.",
                "Guiding research for history projects."
            ]
        },
        {
            "type": "radio",
            "question": "Rate the overall contribution of AI in History.",
            "options": ["Very High", "High", "Moderate", "Low", "None"]
        },
        {
            "type": "slider",
            "question": "On a scale of 1 to 10, how much impact do you think AI had in History?",
            "range": [1, 10]
        },
        {
            "type": "likert",
            "question": "To what extent do you agree with the following statements?",
            "statements": [
                "AI tools made historical data easier to understand.",
                "AI-driven timelines improved my grasp of historical events.",
                "AI recommendations for historical books and documentaries were helpful."
            ],
            "options": ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
        },
        {
            "type": "text",
            "question": "Explain how AI impacted your learning in History."
        },
        {
            "type": "star",
            "question": "Rate AI's role in History.",
            "stars": 5
        }
    ],
    "English": [
        {
            "type": "checkbox",
            "question": "How has AI supported learning English?",
            "options": [
                "Providing grammar correction tools.",
                "Offering AI-driven essay feedback.",
                "Suggesting personalized reading material.",
                "Enhancing vocabulary with AI tools.",
                "Facilitating real-time language translation."
            ]
        },
        {
            "type": "radio",
            "question": "Rate the overall contribution of AI in English.",
            "options": ["Very High", "High", "Moderate", "Low", "None"]
        },
        {
            "type": "slider",
            "question": "On a scale of 1 to 10, how much impact do you think AI had in English?",
            "range": [1, 10]
        },
        {
            "type": "likert",
            "question": "To what extent do you agree with the following statements?",
            "statements": [
                "AI tools improved my writing skills.",
                "AI-driven essay feedback was valuable.",
                "AI recommendations for reading were helpful."
            ],
            "options": ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
        },
        {
            "type": "text",
            "question": "Describe the role of AI in enhancing your English learning."
        },
        {
            "type": "star",
            "question": "Rate AI's contribution in English.",
            "stars": 5
        }
    ],
    "Computer Science": [
        {
            "type": "checkbox",
            "question": "How has AI contributed to Computer Science learning?",
            "options": [
                "Offering programming assistance.",
                "Providing AI-driven debugging tools.",
                "Enhancing understanding of algorithms via simulations.",
                "Recommending learning paths based on skills.",
                "Facilitating AI-driven project guidance."
            ]
        },
        {
            "type": "radio",
            "question": "Rate the overall contribution of AI in Computer Science.",
            "options": ["Very High", "High", "Moderate", "Low", "None"]
        },
        {
            "type": "slider",
            "question": "On a scale of 1 to 10, how much impact do you think AI had in Computer Science?",
            "range": [1, 10]
        },
        {
            "type": "likert",
            "question": "To what extent do you agree with the following statements?",
            "statements": [
                "AI tools simplified learning complex algorithms.",
                "AI-driven debugging tools improved my programming skills.",
                "AI learning path recommendations were relevant."
            ],
            "options": ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
        },
        {
            "type": "text",
            "question": "Describe how AI has influenced your Computer Science learning experience."
        },
        {
            "type": "star",
            "question": "Rate AI's role in Computer Science.",
            "stars": 5
        }
    ]
}

def get_questions(subject):
    """
    Retrieve questions for a given subject.
    """
    return QUESTIONS.get(subject, [])
