const url = 'https://rt.data.gov.hk/v1/transport/mtr/bus/getSchedule';
const headers = {
  'Content-Type': 'application/json',
};
const FS_BUS_STOP_ID = 'K17-D010';
const METHOD = 'POST';
const BODY = {
  language: 'zh',
  routeName: 'K17',
};

const req = new Request(url);
req.method = METHOD;
req.headers = headers;
req.body = JSON.stringify(BODY);

const data = await req.loadJSON();
let result = '';

if (data.routeStatusRemarkContent === '停止服務') {
  result = `${data.routeStatusRemarkContent}\n${data.footerRemarks}`;
} else {
  const buses = data.busStop.find((bs) => bs.busStopId === FS_BUS_STOP_ID).bus;
  const firstBus = buses[0];
  const secondBus = buses[1];
  result = `1) ${firstBus.departureTimeText}\n2) ${secondBus.departureTimeText}`;
}

const noti = new Notification();
noti.title = 'K17下班車仲有幾耐走';
noti.message = result;
noti.presentNotification();

Script.complete();
