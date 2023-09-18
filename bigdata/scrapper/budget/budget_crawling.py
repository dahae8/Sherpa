# import pandas as pd
# import numpy as np
# import matplotlib.pyplot as plt
# import fitz
 
# def extract_text_from_specific_pages(pdf_path, start_page, end_page):
#     doc = fitz.open(pdf_path)
    
#     # 페이지 범위가 유효한지 확인
#     if start_page < 0 or end_page > doc.page_count or start_page > end_page:
#         print(doc.page_count)
#         return "Invalid page range."

#     extracted_text = ""
    
#     for page_num in range(start_page, end_page):
#         page = doc[page_num]
#         extracted_text += page.get_text()

#     return extracted_text

# pdf_path = 'C:/Users/SSAFY/Desktop/특화/adRec_data/ADZ 7+8월.pdf'
# start_page = 82
# end_page = 87
# text = extract_text_from_specific_pages(pdf_path, start_page, end_page)
# print(text)

from typing import List
import os
import re

def convert_text_to_csv(input_path: str, output_path: str) -> None:
    """
    input_path (str): 텍스트파일 루트
    output_path (str): CSV파일 루트
    """
    with open(input_path, 'r', encoding='utf-8') as file:
        lines = file.readlines()

    csv_lines = []
    for line in lines:
        # 금액 사이의 ","와 "%"제거
        line = line.replace(",", "")
        line = line.replace("%", "")
        
        # Split line by spaces
        parts = line.split()
        
        # Wrap texts with quotes and create CSV line
        csv_line = ",".join(['"{}"'.format(part) if re.search("[가-힣a-zA-Z()]", part) else part for part in parts])
        
        csv_lines.append(csv_line)
    
    # Save the CSV content to a file
    with open(output_path, 'w', encoding='cp949') as file:
        file.write("\n".join(csv_lines))

# Define a function to process multiple files
def convert_multiple_files(file_paths: List[str], output_dir: str) -> List[str]:
    output_paths = []
    for file_path in file_paths:
        # Create an output path for the CSV file
        base_name = os.path.basename(file_path)
        output_path = os.path.join(output_dir, base_name.replace(".txt", ".csv"))
        
        # Convert the file to CSV format
        convert_text_to_csv(file_path, output_path)
        
        output_paths.append(output_path)
    
    return output_paths

# List of input file paths
input_files = [
    "C:/Users/SSAFY/Desktop/특화/adRec_data/광고주별_매체비_현황.txt",
    "C:/Users/SSAFY/Desktop/특화/adRec_data/매체별_인터넷_광고_현황.txt",
    "C:/Users/SSAFY/Desktop/특화/adRec_data/업종별_4대_매체_광고비_현황.txt",
    "C:/Users/SSAFY/Desktop/특화/adRec_data/업종별_인터넷_광고_현황.txt"
]

# Directory to save the output CSV files
output_directory = "C:/Users/SSAFY/Desktop/특화/adRec_data/"

# Create the output directory if it doesn't exist
os.makedirs(output_directory, exist_ok=True)

# Convert the files and get the output paths
output_files = convert_multiple_files(input_files, output_directory)
output_files
print("작업이 끝났어요!!!")
