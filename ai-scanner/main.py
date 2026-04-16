from google import genai
from prompts import MAIN_PROMPT

# Create client
client = genai.Client(api_key="API KEY IS NOT THERE")

# Read code
with open("test_diff.txt", "r") as f:
    code = f.read()

# Combine prompt
full_prompt = MAIN_PROMPT + code

# Call AI (NEW WORKING MODEL)
response = client.models.generate_content(
    model="gemini-2.0-flash",
    contents=full_prompt
)

print(response.text)
