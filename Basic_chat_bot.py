from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage,AIMessage,SystemMessage

from dotenv import load_dotenv
import os

load_dotenv()
GOOGLE_API_KEY=os.getenv("GOOGLE_API_KEY")


llm=ChatGoogleGenerativeAI(model="gemini-2.0-flash",api_key=GOOGLE_API_KEY)


chat_history=[]
system_message=SystemMessage(content="You are a engineer a some FAAG company have strong knowledege of CS fundamentals")
chat_history.append(system_message)


while True:
    User_input=input("You: ")
    if(User_input.lower()=='exit'):
        break

    chat_history.append(HumanMessage(content=User_input))
    AI_response=""

    for chunks in llm.stream(chat_history):
        AI_response+=chunks.content
        print(chunks.content,end="",flush=True)

    print()
    chat_history.append(AIMessage(content=AI_response))


