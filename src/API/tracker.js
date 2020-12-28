// restart ngrok every 8 hours
// URL becomess invalid after 8 hours
// URL doesn't need to be hidden, it's most likely expired

import axios from "axios";

export default axios.create({
  baseURL: "http://032318ccc16d.ngrok.io ",
});