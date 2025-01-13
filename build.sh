ionic build --prod
cordova build android --prod --release
rm -r output
rm output.apks
java -jar "bundletool.jar" build-apks --bundle=/home/hardy/Documents/ECRANPART/madaMovie/platforms/android/app/build/outputs/bundle/release/app-release.aab --output=output.apks --ks=my-release-key.jks --ks-key-alias=my-key-alias --ks-pass=pass:manoela --key-pass=pass:manoela --mode=universal
