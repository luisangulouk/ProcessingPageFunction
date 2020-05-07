const data = [
  { state: "processing" },
  { state: "success" },
  { state: "error" }
];

async function getProcessingPage(data) {
  if (!data) return;
  const action = {
    PROCESSING: "processing",
    ERROR: "error",
    SUCCESS: "success"
  };
  const errorCode = {
    NO_STOCK: "NO_STOCK",
    INCORRECT_DETAILS: "INCORRECT_DETAILS"
  };
  let stateStream = new Promise((resolve, reject) => {
    if (data[0].state === action.PROCESSING) {
      setTimeout(() => {
        resolve(data[0]);
      }, 2000);
    } else {
      resolve(data[0]);
    }
  });
  let page = await stateStream;
  console.log(page);

  switch (page.state) {
    case action.PROCESSING:
      if (data.length > 1) {
        getProcessingPage(data.slice(1));
      }
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
    default:
      payload = { title: "Unkown State!", message: null };
  }

  return payload;
}

console.log("---start processing data");
const pageState = getProcessingPage(data);
console.log(pageState);
