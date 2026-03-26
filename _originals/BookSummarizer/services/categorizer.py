"""Book categorization service with fuzzy matching."""

from difflib import SequenceMatcher
from typing import Dict, List


CATEGORY_KEYWORDS = {
    "Finance & Investing": [
        "money", "invest", "stock", "market", "financial", "wealth", "retire",
        "bitcoin", "wall street", "fund", "capital", "economics", "monetary",
        "portfolio", "trading", "hedge", "bogle", "buffett", "dividend",
        "forex", "cryptocurrency", "bond", "asset"
    ],
    "Psychology & Mind": [
        "brain", "mind", "psych", "emotion", "think", "cognitive", "habit",
        "behavior", "mental", "anxiety", "trauma", "stress", "mindful",
        "intelligence", "neuroscience", "perception", "memory", "learning",
        "consciousness", "brain science"
    ],
    "Self-Development": [
        "habit", "success", "productive", "career", "grit", "strength",
        "confidence", "leadership", "getting things done", "time manage",
        "motivation", "discipline", "goal", "personal growth", "success habits",
        "mindset", "potential", "achievement"
    ],
    "Relationships & Social": [
        "love", "relationship", "marriage", "friend", "social", "connect",
        "attachment", "empathy", "together", "lonely", "tribe", "communit",
        "human connection", "vulnerability", "intimacy", "bond", "family ties"
    ],
    "Parenting & Family": [
        "child", "parent", "teen", "adolesc", "toddler", "baby", "family",
        "daughter", "son", "montessori", "raising", "education", "develop child",
        "parenting", "mothering", "fathering"
    ],
    "Health & Wellness": [
        "health", "sleep", "exercise", "body", "breath", "eat", "food",
        "burnout", "energy", "wellbeing", "fitness", "medical", "nutrition",
        "diet", "workout", "wellness", "healing", "yoga", "meditation"
    ],
    "Business & Innovation": [
        "startup", "business", "entrepren", "innovati", "company", "lean",
        "design", "creative", "strategy", "management", "disrupt", "network",
        "scale", "growth", "corporate", "organizational", "team", "management"
    ],
    "Technology & AI": [
        "ai ", "artificial", "machine learn", "algorithm", "data", "tech",
        "software", "code", "program", "computer", "agent", "digital",
        "internet", "coding", "python", "javascript", "neural", "model"
    ],
    "History & Culture": [
        "history", "historical", "culture", "civilization", "ancient",
        "war", "revolution", "empire", "dynasty", "tradition", "heritage"
    ],
    "Science & Nature": [
        "science", "nature", "physics", "biology", "chemistry", "evolution",
        "ecology", "environment", "climate", "universe", "cosmos", "quantum"
    ],
    "Philosophy & Religion": [
        "philosophy", "religion", "faith", "spiritual", "belief", "existential",
        "ethics", "meaning", "purpose", "soul", "enlightenment", "buddhism",
        "christianity", "tao", "stoic"
    ],
    "Arts & Creativity": [
        "art", "music", "creative", "writing", "design", "painter", "artist",
        "aesthetic", "beauty", "literature", "poem", "fiction", "craft"
    ],
    "Sports & Movement": [
        "sport", "athletic", "training", "coaching", "movement", "physical",
        "game", "competition", "champion", "olympic", "fitness", "endurance"
    ],
}


def categorize_book(title: str, author: str = "") -> str:
    """
    Categorize a book based on title and author using keyword matching.

    Args:
        title (str): Book title
        author (str): Book author

    Returns:
        str: Category name
    """
    if not title:
        return "General"

    title_lower = title.lower()
    author_lower = (author or "").lower()
    combined = f"{title_lower} {author_lower}"

    # Score each category based on keyword matches
    scores = {}

    for category, keywords in CATEGORY_KEYWORDS.items():
        score = 0
        for keyword in keywords:
            if keyword in combined:
                # Boost score for title matches vs author matches
                if keyword in title_lower:
                    score += 2
                else:
                    score += 1

        if score > 0:
            scores[category] = score

    if scores:
        # Return category with highest score
        return max(scores, key=scores.get)

    return "General"


def find_best_category_match(
    category_name: str,
    available_categories: List[str],
    threshold: float = 0.6
) -> str:
    """
    Find the best matching category from available options using fuzzy matching.

    Args:
        category_name (str): Category to match
        available_categories (list): Available category options
        threshold (float): Minimum match ratio (0-1)

    Returns:
        str: Best matching category or first available if no match above threshold
    """
    if not available_categories:
        return category_name

    best_match = available_categories[0]
    best_ratio = 0

    for available in available_categories:
        ratio = SequenceMatcher(None, category_name.lower(), available.lower()).ratio()
        if ratio > best_ratio:
            best_ratio = ratio
            best_match = available

    if best_ratio >= threshold:
        return best_match

    # If no good match, return first available
    return available_categories[0]
