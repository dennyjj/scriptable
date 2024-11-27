// Next k17 bus depart from tai po market station to fu shin for Scriptable

// default config
const url = 'https://rt.data.gov.hk/v1/transport/mtr/bus/getSchedule';
const headers = {
  'Content-Type': 'application/json',
};
const TPH_BUS_STOP_ID = 'K17-U010';
const METHOD = 'POST';
const BODY = {
  language: 'zh',
  routeName: 'K17',
};

// send request to server
const req = new Request(url);
req.method = METHOD;
req.headers = headers;
req.body = JSON.stringify(BODY);
const data = await req.loadJSON();

// compose notification and schedule to user
let title = '';
let message = '';
if (!data.busStop || !data.busTop.length) {
  title = 'K17停止服務';
  message = `${data.routeStatusRemarkContent}\n${data.footerRemarks}`;
} else {
  const buses = data.busStop.find((bs) => bs.busStopId === TPH_BUS_STOP_ID).bus;
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
