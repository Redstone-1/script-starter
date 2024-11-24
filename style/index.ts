export default `
.monaco-editor {
  width: 100% !important;
  height: 100% !important;
}
.custom-button {
  display: inline-block;
  width: fit-content;
  height: fit-content;
  background: #6253e1;
  border-radius: 4px;
  color: #fff;
  inset: 0;
  opacity: 1;
  transition: all 0.3s;
  padding: 5px 12px !important;
  font-weight: 400;
  font-size: 12px;
  margin: 0 5px;
  box-sizing: border-box;
  min-height: 28px;
  max-height: 28px;
  text-decoration: none;
  line-height: 20px;
}
.custom-button:hover {
  cursor: pointer;
  color: #fff;
  box-shadow: 0 0 2px 0 #6253e1;
}
.plain-button {
  background: #ffffff !important;
  color: #757575 !important;
  border: 1px solid #cccccc !important;
  text-decoration: none !important;
  padding: 4px 12px 7px 12px !important;
}
.plain-button:hover {
  color: #6253e1 !important;
  border: 1px solid #6253e1 !important;
}
.disabled-button {
  cursor: not-allowed !important;
  border-color: #d9d9d9 !important;
  color: rgba(0, 0, 0, 0.25) !important;
  background: rgba(0, 0, 0, 0.04) !important;
  box-shadow: none !important;
}
.disabled-button:hover {
  border-color: #d9d9d9 !important;
  color: rgba(0, 0, 0, 0.25) !important;
  box-shadow: none !important;
}
.global-message {
  width: fit-content;
  height: 40px;
  padding: 8px 24px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  position: fixed;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99999999;
  background-color: #ffffff;
  border-radius: 4px;
  transition: opacity 0.5s ease-in-out, top 0.5s ease-in-out;
  animation: message-fadein 0.5s ease-in-out forwards;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.2);
}
.global-message_text {
  margin-left: 8px;
  transform: translateY(-1px);
}
@keyframes message-fadein {
  0% {
    opacity: 0.5;
    top: 10px;
  }
  100% {
    opacity: 1;
    top: 30px;
  }
}
@keyframes dialog-fadein {
  0% {
    opacity: 0.5;
    top: 46%;
  }
  100% {
    opacity: 1;
    top: 50%;
  }
}
@keyframes loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.global-dialog {
  height: fit-content;
  max-width: 100vw;
  max-height: 100vh;
  z-index: 9999;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  border-radius: 4px;
  transition: opacity 0.5s ease-in-out, top 0.5s ease-in-out;
  animation: dialog-fadein 0.5s ease-in-out forwards;
}
.global-dialog .control-btn:hover {
  cursor: pointer;
}
.global-dialog .control-btn:not(:last-child) {
  margin-right: 8px;
}
.global-dialog .close-btn:hover {
  filter: drop-shadow(0px 0px 2px #ff5953);
}
.global-dialog .exit-full-screen-btn:hover {
  filter: drop-shadow(0px 0px 2px #fabe33);
}
.global-dialog .full-screen-btn:hover {
  filter: drop-shadow(0px 0px 2px #53c32b);
}
.global-dialog-header {
  padding: 6px 12px;
  background-color: #f5f5f5;
  border-radius: 4px 4px 0 0;
}
.global-dialog-footer {
  padding: 6px 12px;
  background-color: #f5f5f5;
  border-radius: 0 0 4px 4px;
  display: flex;
  justify-content: flex-end;
}
.global-dialog-body {
  max-width: 100%;
  max-height: calc(100% - 68px);
  height: 100%;
  padding: 12px 24px;
  overflow-y: auto;
  overflow-x: auto;
  box-sizing: border-box;
}
.global-dialog-mask {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
.global-dialog-mask-transparent {
  background-color: transparent;
}
.global-loading {
  width: 100%;
  height: 100%;
  position: relative;
}
.global-loading::after {
  content: "";
  width: 20px;
  height: 20px;
  border: 2px solid #6253e1;
  border-left: 2px solid transparent;
  border-radius: 50%;
  position: absolute;
  top: calc(50% - 10px);
  left: calc(50% - 10px);
  transform: translate(-50%, -50%);
  animation: loading 1.5s infinite linear;
  background-color: transparent;
}
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.show {
  display: block;
}
.hide {
  display: none;
}
`;