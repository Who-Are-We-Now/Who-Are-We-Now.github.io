from __future__ import print_function

import os.path
import json

import google.auth
from google.auth.transport.requests import Request
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

import re

# If modifying these scopes, delete the file token.json.
SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']

# The ID and range of a sample spreadsheet.
SPREADSHEET_ID = '1VhsLpJhxCAdG90Zuxz3ArKu1u8KsLICI4koL2uAwRsk'
RANGE_NAME = 'Figure Data!A3:H'

HEADERS = ['id', 'chapter', 'file', 'caption', 'alt', 'credit', 'type', 'status']

def main():
    """Gets values from WAWN spreadsheet
    Makes figures.json file with format:
    {    
        shortnam-id : {
            files : [list of image names], 
            chapter : chapter value,
            caption : str,
            alt : str,
            credit : str, 
            type : str,
            status: str }
    }
    """
    creds, _ = google.auth.default()

    figures = {}

    try:
        service = build('sheets', 'v4', credentials=creds)

        # Call the Sheets API
        sheet = service.spreadsheets()
        result = sheet.values().get(spreadsheetId=SPREADSHEET_ID,
                                    range=RANGE_NAME).execute()
        values = result.get('values', [])

        if not values:
            print('No data found.')
            return

        re_files = re.compile(r"(\[\[|\b)(.+?\.(png|jpg|jpeg))\b")
        for row in values:
            # Print columns A and E, which correspond to indices 0 and 4.
            print('%s, %s' % (row[0], row[2]))
            shortname = row[0]
            figures[shortname] = {}
            # parse file names
            files = []
            for m in re_files.finditer(row[2]):
                files.append(m[2])
            print("FILES", files)
            figures[shortname][HEADERS[2]] = files
            # Add remaining columns
            figures[shortname][HEADERS[1]] = row[1]
            for i, entry in enumerate(row[3:]):
                figures[shortname][HEADERS[i+3]] = entry


    except HttpError as err:
        print(err)

    with open('figures.json', 'w') as f:
        json.dump(figures, f)

if __name__ == '__main__':
    main()