import pandas as pd
import spacy
from spacy.matcher import PhraseMatcher

# Load job role dataset
df = pd.read_csv('D:/Projects/college/Ascendia/jobml/Top_207_IT_Job_Roles_Skills_Dataset.csv')

# Load spaCy NLP model
nlp = spacy.load("en_core_web_sm")

# Prepare skill phrases
skill_list = df['Skills'].dropna().tolist()
skill_phrases = [skill.strip() for sublist in skill_list for skill in sublist.split(',')]
patterns = [nlp.make_doc(skill.lower()) for skill in set(skill_phrases)]

# Phrase matcher
matcher = PhraseMatcher(nlp.vocab)
matcher.add("SKILLS", patterns)

def extract_skills(text):
    doc = nlp(text.lower())
    matches = matcher(doc)
    extracted_skills = list(set([doc[start:end].text for _, start, end in matches]))
    return extracted_skills

def recommend_jobs(resume_skills, top_n=3):
    recommendations = []
    for _, row in df.iterrows():
        job_title = row['Job Title']
        required_skills = row['Skills']
        if pd.isna(required_skills):
            continue
        job_skills = set(skill.strip().lower() for skill in required_skills.split(','))
        matched_skills = set(resume_skills) & job_skills
        score = len(matched_skills)
        if score > 0:
            recommendations.append((job_title, score, matched_skills))

    recommendations.sort(key=lambda x: x[1], reverse=True)
    return recommendations[:top_n]
