from bs4 import BeautifulSoup
from selenium import webdriver
from datetime import date
from datetime import timedelta
import time
import json 


#base product URL
URL = "https://e-katanalotis.gov.gr"

#final JSON
results = {}
results['fetch_date']=int(time.time())
results['images']=[]

#get product information
options = webdriver.ChromeOptions()
options.add_argument('--headless')
# executable_path param is where the Chrome driver is installed
browser = webdriver.Chrome(options=options, executable_path='/chromedriver.exe')
browser.get(URL)

#get product information
productid = browser.execute_script("return Array.from(Ember.Namespace.NAMESPACES_BY_ID['katanalotis-microsite'].__container__.cache['service:store'].recordArrayManager._liveRecordArrays.product.content).map(({id}) => id)")
browser.quit()
#get product information 
for i in range(len(productid)):
    print(productid[i])
    options = webdriver.ChromeOptions()
   
    options.add_argument('--headless')
    # executable_path param is where the Chrome driver is installed
    browser = webdriver.Chrome(options=options, executable_path='/chromedriver.exe')
    browser.get("https://e-katanalotis.gov.gr/product/"+str(productid[i]))
    
    #find product name
    html = browser.page_source
    soup = BeautifulSoup(html, features="html5lib")

    images=soup.find('div',attrs={'class':'col-12 col-lg-4 offset-lg-2 d-flex align-items-start'})
    image=images.find('img',attrs={'class':'product-img'})
    images_url = image['src']          
    browser.quit()
        
    #create a result object
    result = {}
    result['id']=productid[i]
    result['image']=images_url
    
    #append it to the list
    results['images'].append(result)
    

print('Done')
with open("products_images"+".json", "w", encoding='utf-8') as outfile:
    json.dump(results, outfile, ensure_ascii=False, indent=2)
