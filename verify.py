import time
import sys
from playwright.sync_api import sync_playwright

port = sys.argv[1]

with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context(record_video_dir="/app")
    page = context.new_page()
    page.goto(f"http://localhost:{port}")
    page.wait_for_selector("div[tabindex='0']")
    page.focus("div[tabindex='0']")
    time.sleep(1)
    page.screenshot(path="/app/screenshot.png")
    context.close()
    browser.close()
