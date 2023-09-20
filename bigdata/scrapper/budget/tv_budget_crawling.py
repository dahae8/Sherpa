import csv
import requests
from bs4 import BeautifulSoup

def parse_and_save_to_csv(table):
    
    # Create a CSV file for writing the data
    with open("./budget_data/TV광고단가.csv", "w", newline="", encoding="cp949") as csvfile:
        writer = csv.writer(csvfile)
        
        # Write the header to the CSV
        writer.writerow(["TV광고단가"])
        
        rows = table.find_all("tr")[1:]  # Exclude header row
        for row in rows:
            data = [td.get_text(strip=True) for td in row.find_all("td")]
            
            # Filtering out the cells with only numbers and ","
            data = [cell.replace(",", "") for cell in data if cell.replace(",", "").isdigit()]
            
            # Write the data to the CSV
            for cell in data:
                writer.writerow([cell])
    print("작성완료 되었습니다.")

def get_YTN():
  URL = "https://www.ytn.co.kr/business/tv_ad_2.php"
  response = requests.get(URL)

  # 페이지 내용을 파싱
  soup = BeautifulSoup(response.content, 'html.parser')

  # 지정된 style을 가진 모든 div 태그를 찾음
  div_tags = soup.find_all('div', style="position:relative;padding-bottom:20px")

  # 두 번째 div 태그를 선택
  second_div = div_tags[1]

  # 두 번째 div 바로 아래에 있는 table 태그를 찾음
  table = second_div.find_next('table', class_='table_navy')


  parse_and_save_to_csv(table)

get_YTN()

# def get
