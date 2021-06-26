#! /bin/bash

date

echo 'cmd start'

## 解压文件
unzip ./tests/dist.zip -d ./tests/ 

echo 'unzip file success'

## 拷贝文件，到目标文件夹
cp -rf ./tests/dist ./invite

echo 'rename folder and move to the target folder success'

rm -rf ./tests/*

echo 'cmd done'

date