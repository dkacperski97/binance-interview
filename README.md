## Instruction

To run the application first install deps:
```
npm install
```
Then create .env file based on .env.example or code bellow
```
API_KEY=
API_SECRET=
```
API key and secret are not required by endpoints that are used so their value can be random.

To launch the app run
```
npm start
```
or
```
npm run start:dev
```

After launching the app you can call api endpoint. Bash example:
```
curl "localhost:3000/trades?symbol=BTCUSDT&startTime=1761640987662&endTime=1761640987662"
```

To launch tests run
```
npm run test
```