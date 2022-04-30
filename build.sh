dir=$(dirname $0)
cd $dir

rm -rf dist
rm -rf ./*.tar.gz

cd ./server && npm run build
cd ../quaint && npm run build
cd ../dist && tar -zcvf ../quaint.tar.gz * && cd ..

scp ./quaint.tar.gz root@8.140.187.127:/root/tars
