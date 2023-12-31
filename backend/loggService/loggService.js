import MonitorLog from "../models/MonitorLog.js";
import Service from "../models/Service.js";
import axios from "axios";

export const loggService = async () => {
  const service = await Service.find({});

  try {
    for (const SERVICE of service) {
      const startTime = new Date();

      const status = await serviceHitter(SERVICE.url);

      const endTime = new Date();

      // calculating response time
      const responseTime = endTime - startTime;

      const monitorLogData = {
        hitTime: new Date(),
        responseTime: responseTime, // Replace with actual response time
        status: status,
      };

      console.log(monitorLogData);

      const newLog = await new MonitorLog(monitorLogData);
      newLog.save();

      SERVICE?.monitorLogs?.push(newLog._id);

      if (SERVICE) {
        SERVICE.currentStatus = status;
        SERVICE.upCount =
          status >= 200 && status < 300 ? SERVICE.upCount + 1 : SERVICE.upCount;
        SERVICE.downCount =
          status >= 400 ? SERVICE.downCount + 1 : SERVICE.downCount;
      }
      SERVICE.save();
      console.log(
        `Log created successfully at ${new Date().toLocaleString()} for url: ${
          SERVICE.url
        } response time: ${responseTime} ms`
      );
    }
  } catch (err) {
    console.log(err);
  }
};

const serviceHitter = async (url) => {
  let status = 0;
  const res = await axios
    .get(url.toString())
    .then((res) => {
      status = res.status;
    })
    .catch((err) => {
      if (err.response) {
        status = err.response.status;
      }
    });
  return status;
};

export const initializeService = async (SERVICE) => {
  const service = await Service.findById(SERVICE._id);

  try {
    const startTime = new Date();

    const status = await serviceHitter(service?.url);

    const endTime = new Date();

    // calculating response time
    const responseTime = endTime - startTime;

    const monitorLogData = {
      hitTime: new Date(),
      responseTime: responseTime, // Replace with actual response time
      status: status,
    };

    console.log(monitorLogData);

    const newLog = await new MonitorLog(monitorLogData);
    newLog.save();

    service?.monitorLogs?.push(newLog._id);

    if (service) {
      service.currentStatus = status;
      service.upCount =
        status >= 200 && status < 300 ? service.upCount + 1 : service.upCount;
      service.downCount =
        (status >= 0 && status < 200) || status >= 300
          ? service.downCount + 1
          : service.downCount;
    }
    service.save();
    console.log(
      `Log created successfully at ${new Date().toLocaleString()} for url: ${
        service.url
      } response time: ${responseTime} ms`
    );
  } catch (err) {
    console.log(err);
  }
};
