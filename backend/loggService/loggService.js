import Service from "../models/Service.js";

export const loggService = async () => {
  const service = await Service.find({});
  console.log(service);
};
