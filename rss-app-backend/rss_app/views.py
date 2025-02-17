import feedparser
import json
import requests
from bs4 import BeautifulSoup
import re
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

def fetch_rss_feed(url):
    """Fetch and parse RSS feed, extracting articles with images when available."""
    feed = feedparser.parse(url)
    # print("301",feed)
    articles = []

    for entry in feed.entries:
        image_url = None

        # Step 1: Try extracting image from the description
        if "description" in entry:
            match = re.search(r'<img[^>]+src="([^">]+)"', entry.description)
            if match:
                image_url = match.group(1)

        # Step 2: If no image found, scrape the webpage for a featured image
        if not image_url:
            try:
                response = requests.get(entry.link, timeout=5)
                soup = BeautifulSoup(response.text, "html.parser")

                # Common meta tags where featured images are stored
                og_image = soup.find("meta", property="og:image")
                twitter_image = soup.find("meta", property="twitter:image")

                if og_image and og_image["content"]:
                    image_url = og_image["content"]
                elif twitter_image and twitter_image["content"]:
                    image_url = twitter_image["content"]
            except Exception as e:
                print(f"Error fetching image for {entry.link}: {e}")
                
        articles.append({
            "title": entry.title,
            "link": entry.link,
            "description": entry.get("description", "No description available"),
            "summary": entry.get("summary", "No summary available"),
            "image": image_url,
            "published_date": entry.get("published", "Unknown"),
            "author": entry.get("author", "Unknown"),
            "category": entry.get("tags", "Uncategorized"),
            "source": feed.feed.title if "title" in feed.feed else "Unknown Source"
        })

    return articles

@csrf_exempt
def generate_rss(request):
    """Django API view to fetch and return RSS feed data."""
    url = request.GET.get("url")

    if not url:
        return JsonResponse({"error": "No URL provided"}, status=400)

    try:
        response = requests.get(url, timeout=5)
        if response.status_code != 200:
            return JsonResponse({"error": "Failed to fetch RSS feed. Invalid URL or server issue."}, status=400)

        articles = fetch_rss_feed(url)

        if not articles:
            return JsonResponse({"error": "No entries found in RSS feed."}, status=400)

        return JsonResponse({"rss_feed": articles}, safe=False)

    except requests.exceptions.RequestException as e:
        return JsonResponse({"error": f"Error fetching feed: {str(e)}"}, status=400)

    except Exception as e:
        return JsonResponse({"error": f"Unexpected error: {str(e)}"}, status=500)
