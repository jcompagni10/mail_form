import React from "react";

export default ({ progress, isSent }) => (
  <div className={"btn-wrapper progress" + progress}>
    <div className="border-cover cover1" />
    <div className="border-cover cover2" />
    <button className="send-btn" />
    <div className="btn-circle" />
    <div disabled={isSent} className="btn-text">
      {isSent ? "Sent!" : "Send"}
    </div>
  </div>
);
