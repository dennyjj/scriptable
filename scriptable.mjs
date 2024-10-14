const url = 'https://rt.data.gov.hk/v1/transport/mtr/bus/getSchedule';
const headers = {
  'Content-Type': 'application/json',
};
const FS_BUS_STOP_ID = 'K17-D010';

const req = new Request(url);
req.method = 'POST';
req.headers = headers;
req.body = JSON.stringify({
  language: 'zh',
  routeName: 'K17',
});

const data = await req.loadJSON();
const alert = new Alert();

if (data.routeStatusRemarkContent === '停止服務') {
  alert.title = data.routeStatusRemarkContent;
  alert.message = data.footerRemarks;
} else {
  const [bus] = data.busStop.find((bs) => bs.busStopId === FS_BUS_STOP_ID).bus;
  alert.title = 'K17';
  alert.message = bus.departureTimeText;
}

alert.presentAlert();
Script.complete();
