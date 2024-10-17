//todo: parameterize bus stop id and route name

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
let title = '';
let message = '';

if (data.routeStatusRemarkContent === '停止服務') {
  title = 'Server收工夠皮';
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

Script.complete();
