const data = [
  { state: "processing" },
  { state: "processing" },
  { state: "processing" },
  { state: "error", errorCode: "INCORRECT_DETAILS" }
];

const processPage = (page) => {
  if (!page) return;

  const action = {
    PROCESSING: "processing",
    ERROR: "error",
    SUCCESS: "success"
  };
  const errorCode = {
    NO_STOCK: "NO_STOCK",
    INCORRECT_DETAILS: "INCORRECT_DETAILS"
  };
  let payload = {};
  console.log(`processing payload with state: ${page.state}`);
  
  switch (page.state) {
    case action.PROCESSING:
      // this case never will be passed
      break;

    case action.SUCCESS:
      payload = { title: "Order complete", message: null };
      break;

    case action.ERROR:
      let errorPayload = { title: "Error page", message: null };
      if (page.errorCode) {
        switch (page.errorCode) {
          case errorCode.NO_STOCK:
            errorPayload.message = "No stock has been found";
            break;
          case errorCode.INCORRECT_DETAILS:
            errorPayload.message = "Incorrect details have been entered";
            break;
          default:
            errorPayload.message = "Unknown error!";
        }
      }
      payload = errorPayload;
      break;

    default:
      payload = { title: "Unkown State!", message: null };
  }

  return payload;
}

const getPage = async (task) => {
  if (!task) return;

  return new Promise((resolve, reject) => {
    if (task.state === "processing") {
      setTimeout(() => {
        resolve(task);
      }, 2000);
    } else {
      resolve(task);
    }
  });

};

const dispatcher = async (data) => {
  if (!data) return;

  let currentPage = data.shift();
  console.log("currentPage:", currentPage);
  if (currentPage.state !== "processing") {
    return processPage(currentPage);
  }

  const page = await getPage(currentPage);

  if (page.state === "processing") {
    console.log("Call dispatcher with remining log stack:", data);
    return dispatcher(data);
  }
};

const getProcessingPage = (data) => {
  if(!data) return;
  let dataLog = data;
  return dispatcher(dataLog);
}


getProcessingPage(data).then(res=>console.log("response:",res));
