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
    try:
        secret = get_secret()
        sec2 = secret[0]
        print(secret[1])
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
        ptn = event.get('body')['ptnum']
        print(ptn)
        logger.info('attempting to connect...')
        print(creds)
        conn = pyodbc.connect(creds)
        cursor = conn.cursor()
        logger.info('connected')
        resLst = []
        q = "SELECT patient_no, lastname, firstname, middlename, bdate, email FROM [imsreports].[patient_master] WHERE active = 'Y' AND patient_no =" + ptn
        cursor.execute(q)
        for row in cursor:
            print(row)
            resLst.append(row)
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': json.dumps(resLst)
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

  
    