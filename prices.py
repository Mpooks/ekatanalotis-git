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
results['data']=[]

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


    if soup.find(id='ember46'):
     #get dates from price chart
     date_data = browser.execute_script('return Highcharts.charts[0].series[0].data.map(x => x.category)')
     #append year to date labels
     date_data = [s +'/2022' for s in date_data]

     #get prices from price chart
     price_data = browser.execute_script('return Highcharts.charts[0].series[0].data.map(x => x.y)')
    else:
        for j in range(6):
         price=soup.find('div',attrs={'class':'col-3 col-lg-7 col-xl-7 v-center d-flex flex-column align-items-end justify-content-center'})
         price_data[j]=price.find('span',attrs={'class':'product-price-number'}).text
         price_data[j]=price_data[j][0:4]
         price_data[j]=float(price_data[j])
         date_data[j]=date.today()-timedelta(days = 6-j)


    browser.quit()

    #transform dates
    if soup.find(id='ember46'):
     for j in range(len(date_data)):
         dparts = date_data[j].split("/")
         newd = '2022-'+dparts[1]+'-'+dparts[0]
         date_data[j]=newd
    else:
        for j in range(6):
            date_data[j]=str(date_data[j])
        
    #create a result object
    result = {}
    result['id']=productid[i]
    result['prices']=[]
    for j in range(len(date_data)):
        result['prices'].append({'date':date_data[j], 'price':price_data[j]})
    
    #append it to the list
    results['data'].append(result)
    

print('Done')
with open("products_prices"+".json", "w", encoding='utf-8') as outfile:
    json.dump(results, outfile, ensure_ascii=False, indent=2)
