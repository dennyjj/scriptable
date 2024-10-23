//todo: parameterize bus stop id and route name

// default config
const url = 'https://rt.data.gov.hk/v1/transport/mtr/bus/getSchedule';
const headers = {
  'Content-Type': 'application/json',
};
let FS_BUS_STOP_ID = 'K17-D010';
const METHOD = 'POST';
const BODY = {
  language: 'zh',
  routeName: 'K17',
};

// array of texts passed from shortcut
// should be update to route
const params = args.plainTexts;
if (params.length) {
  const routeName = params[0];
  const busStopId = params[1];

  BODY.routeName = routeName;
  FS_BUS_STOP_ID = busStopId;
}

// send request to server
const req = new Request(url);
req.method = METHOD;
req.headers = headers;
req.body = JSON.stringify(BODY);
const data = await req.loadJSON();

// compose notification and schedule to user
let title = '';
let message = '';
if (!data.busTop.length) {
  title = 'Server停止服務';
  message = `${data.routeStatusRemarkContent}\n${data.footerRemarks}`;
} else {
  const buses = data.busStop.find((bs) => bs.busStopId === FS_BUS_STOP_ID).bus;
  const firstBus = buses[0];
  const secondBus = buses[1];
  title = 'K17下班車仲有幾耐走';
  message = `1) ${firstBus.departureTimeText}\n2) ${secondBus.departureTimeText}`;
}

const noti = new Notification();
noti.title = title;
noti.body = message;
noti.schedule();

// complete script
Script.complete();
