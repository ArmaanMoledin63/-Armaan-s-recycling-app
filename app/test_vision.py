from google.cloud import vision

try:
    client = vision.ImageAnnotatorClient()
    print("Google Cloud Vision is working!")
except Exception as e:
    print(f"Error: {e}")
