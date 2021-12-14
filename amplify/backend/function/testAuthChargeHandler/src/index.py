import json
import pyodbc
import logging
import boto3
import sys
from auth import get_secret
from botocore.exceptions import ClientError

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def handler(event, context):
    logger.info(json.dumps(event['body']))
    try:
        my_secret = get_secret()
        sec2 = my_secret[0]
        print(my_secret[1])
        logger.info(sec2["dbname"])
    except ClientError as e:
        logger.info("ERROR: Unexpected error: Could not auth.")
        logger.info(e)
        return {
            'statusCode': 400,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': json.dumps("ERROR: Unexpected error: Could not auth.")
        } 
    
    #(['username', 'password', 'engine', 'host', 'port', 'dbname']) 
    creds = 'Driver={ODBC Driver 17 for SQL Server};Server='+sec2['host']+','+sec2['port']+';Database='+sec2['dbname']+';UID='+sec2['username']+';PWD='+sec2['password']+';'
    try:
        logger.info('make ptn')
        ptn = json.loads(event['body'])['ptnum'].upper()
        logger.info(ptn)
        logger.info('attempting to connect...')
        # print(creds)
        conn = pyodbc.connect(creds)
        cursor = conn.cursor()
        logger.info('connected')
        q = "SELECT patient_no, patient_balance, lastname, firstname, middlename, bdate, email FROM [imsreports].[patient_master] WHERE active = 'Y' AND patient_no = '" + ptn + "'"
        cursor.execute(q)
        # rows = cursor.fetchall()
        # resLst = ()
        # for row in rows:
        #     if not row:
        #         break;
        #     t = (row[0], row[1], row[2], row[3], row[4], row[5], row[6])
        #     print(t)
        #     print(row[0], row[1], row[2], row[3], row[4], row[5], row[6])
        #     resLst.append(t)
        # row = cursor.fetchone()
        # if row:
        #     print(row)
        #     resLst = row
        j = list(cursor.fetchall())
        print('callback')
        logger.info('backcall')
        return {
            'statusCode': 200,
            'headers': {
                "content-type":"application/json",
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': json.dumps(j, indent=4, sort_keys=True, default=str)
        } 
    except:
        logger.info("ERROR: Unexpected error: Could not complete query.")
        #logger.info(e)
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': json.dumps("ERROR: Unexpected error: Could not complete query.")
        } 

  
    