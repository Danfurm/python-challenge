import os
import pandas as pd
from bs4 import BeautifulSoup as bs
import requests
from splinter import Browser
from splinter.exceptions import ElementDoesNotExist
import re
from pprint import pprint
def init_browser():
    browser = Browser('chrome')

def scrape():
    browser = init_browser()
    url_news = "https://mars.nasa.gov/news/?page=0&per_page=40&order=publish_date+desc%2Ccreated_at+desc&search=&category=19%2C165%2C184%2C204&blank_scope=Latest"
    browser.visit(url_news)

    html = browser.html
    soup = bs(html, 'html.parser')

    news_title = soup.find('div', class_='content_title').text
    news_para = soup.find('div', class_= 'article_teaser_body').text

    url_jpl = "https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars"
    browser.visit(url_jpl)

    xpath = '//footer//a[@class="button fancybox"]'

    results = browser.find_by_xpath(xpath)
    img = results[0]
    img.click()

    browser.is_element_present_by_css("img.jpg", wait_time=1)
    html = browser.html
    soup = bs(html, 'html.parser')
    featured_img_url = soup.find("img", class_="fancybox-image")["src"]
    if "https:" not in featured_img_url: featured_img_url = "https://www.jpl.nasa.gov"+featured_img_url

    url_weather = "https://twitter.com/marswxreport?lang=en"
    browser.visit(url_weather)

    html = browser.html
    soup = bs(html, 'html.parser')

    mars_weather = soup.find(string=re.compile("Sol"))
    print(mars_weather)

    url_fact = "https://space-facts.com/mars/"
    browser.visit(url_fact)

    table = pd.read_html(url_fact)

    df = table[0]
    df.columns = ['Attribute', 'Unit']

    df.set_index('Attribute', inplace=True)

    html_table = df.to_html()
    
    url_hemi = "https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars"
    browser.visit(url_hemi)

    html = browser.html
    soup = bs(html, 'html.parser')

    hemisphere_image_urls = []
    results = soup.find_all('h3')

    xpath = '//a[@class="itemLink product-item"]/img'

    for result in results:
        title = result.text
        title = title.replace(" Enhanced", "")

        browser.find_by_xpath(xpath)[results.index(result)].click()

        browser.is_element_present_by_css("img.jpg", wait_time=1)
        html = browser.html
        soup = bs(html, 'html.parser')
        hemi_img_url = soup.find("img", class_="wide-image")["src"]
        if "https:" not in hemi_img_url:
            hemi_img_url = "https://astrogeology.usgs.gov"+hemi_img_url

        hemisphere_image_urls.append({'title': title,
                                     'img_url': hemi_img_url})

        browser.back()

    browser.quit()

    html_dict = {'news_title': news_title,
                'news_para': news_para,
                'featured_img_url': featured_img_url,
                'mars_weather': mars_weather,
                'html_table': html_table,
                'hemisphere_image_urls': hemisphere_image_urls}

    return html_dict
