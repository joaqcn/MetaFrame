import requests
from bs4 import BeautifulSoup
import json

URL = "https://wiki.warframe.com/w/Warframes"
BASE_URL = "https://wiki.warframe.com"

def scrape_warframes():
    response = requests.get(URL)
    soup = BeautifulSoup(response.text, "html.parser")

    warframes = []
    
    for frame in soup.select(".WarframeNavBoxImage2 a"):
        name = frame.get("title")
        img_tag = frame.find("img")
        if img_tag:
            img_url = BASE_URL + img_tag.get("src")
            warframes.append({"name": name, "image": img_url})

    with open("warframes.json", "w", encoding="utf-8") as f:
        json.dump(warframes, f, indent=4, ensure_ascii=False)

    print("✅ Warframes JSON file generated!")

if __name__ == "__main__":
    scrape_warframes()
