appConsoleLog  = (value) => {
    if(true){
        console.log(value);
    }else{

    }
}

// 入力を消す関数
function clearTextarea() {
    appConsoleLog("clearTextarea呼び出し");
    const editableDiv = document.querySelector('#prompt-textarea');
    if (editableDiv) {
        appConsoleLog(editableDiv)

        // 文字列をセット（既存のものを消す）
        editableDiv.innerText = ""

        // ChatGPTに反応させるには、inputイベントが必要な場合もある
        editableDiv.dispatchEvent(new Event('input', { bubbles: true }));

        appConsoleLog("editableDivをクリアしました");
        return;
    }
    appConsoleLog("editableDivが無かったです");
}

function sendQuestion(){
    const sendButton = document.querySelector('button[data-testid="send-button"]');
    appConsoleLog("質問を送信");
    sendButton.click();

    // マイクがONならOFFにする
    if(isMicOn()){
      appConsoleLog("マイクがONだったので、OFFにした.");
      const micButton = document.querySelector("#vc-record-button");
      micButton.click();
      setTimeout(updateBigMicButton, 300);
    }
}

function appMicToggle(){
    const micButton = document.querySelector("#vc-record-button");
    if(isMicOn()){
      appConsoleLog("マイクは現在ONです（クリックしません）");
      return;
    }else{
      appConsoleLog("マイクOFF -> ON");
      micButton.click();
      setTimeout(updateBigMicButton, 300);
    }
}

function isMicOn(){
    const micButton = document.querySelector("#vc-record-button");
    if (!micButton) {
        appConsoleLog("マイクボタンが見つかりません");
        return false;
    }

    // マイクがONの状態を背景色の赤成分で判定
    const bgColor = getComputedStyle(micButton).backgroundColor;
    // "rgb(255, 0, 0)" のような形式を想定
    const match = bgColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (match) {
        const red = parseInt(match[1], 10);
        appConsoleLog(`マイクボタンの赤成分: ${red}`);
        const isOn = red >= 240;
        appConsoleLog(`マイクは${isOn ? "ON" : "OFF"}です`);
        return isOn;
    } else {
        appConsoleLog("背景色の取得に失敗しました");
        return false;
    }
}

function updateBigMicButton() {
    const button = document.getElementById("big-mic-button");
    if (!button) return;
    if (isMicOn()) {
        button.innerText = "マイクはONです";
        button.style.backgroundColor = "rgb(128,128,128)";
    } else {
        button.innerText = "マイクをONにする";
        button.style.backgroundColor = "rgb(128,128,255)";
    }
}

function focusBigMicButton() {
    appConsoleLog("focusBigMicButton呼び出し");
    setTimeout(updateBigMicButton, 300);
}

function blurBigMicButton() {
    appConsoleLog("blurBigMicButton呼び出し");
    setTimeout(updateBigMicButton, 300);
}


// 青い「自動入力」ボタンを画面に追加する関数
function addInputButton() {
  // 二重追加防止
  if (document.getElementById("auto-input-button")) return;

  const button = document.createElement("button");
  button.id = "auto-input-button";
  button.innerText = "テキストを入力";
  button.style.position = "fixed";
  button.style.bottom = "500px";
  button.style.right = "20px";
  button.style.zIndex = "9999";
  button.style.backgroundColor = "blue";
  button.style.color = "white";
  button.style.padding = "10px 16px";
  button.style.border = "none";
  button.style.borderRadius = "8px";
  button.style.fontSize = "14px";
  button.style.cursor = "pointer";
  button.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.3)";

  button.addEventListener("click", () => {
    debug_inputToTextarea();
  });

  document.body.appendChild(button);
}

// ページに赤いボタンを追加する関数
function addClearButton() {
  if (document.getElementById("clear-textarea-button")) return; // 重複防止

  const button = document.createElement("button");
  button.id = "clear-textarea-button";
  button.innerText = "入力を取り消す";
  // サイズ・位置・スタイル
  button.style.position = "fixed";
  button.style.bottom = "20px";         // 下から20px
  button.style.left = "20px";          // 右から20px
  button.style.zIndex = "9999";
  button.style.width = "300px";         // 横300px
  button.style.height = "300px";        // 縦300px
  button.style.backgroundColor = "red";
  button.style.color = "white";
  button.style.border = "none";
  button.style.borderRadius = "20px";   // 角丸を大きめに
  button.style.fontSize = "2rem";       // 大きな文字
  button.style.cursor = "pointer";
  button.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.3)";
  button.style.display = "flex";
  button.style.alignItems = "center";
  button.style.justifyContent = "center";

  button.addEventListener("click", clearTextarea);

  document.body.appendChild(button);
}

function addBigSendButton() {
  if (document.getElementById("big-send-button")) return; // 重複防止

  const button = document.createElement("button");
  button.id = "big-send-button";
  button.innerText = "質問を送る";
  // サイズ・位置・スタイル
  button.style.position = "fixed";
  button.style.bottom = "20px";         // 下から20px
  button.style.right = "20px";          // 右から20px
  button.style.zIndex = "9999";
  button.style.width = "300px";         // 横300px
  button.style.height = "300px";        // 縦300px
  button.style.backgroundColor = "blue";
  button.style.color = "white";
  button.style.border = "none";
  button.style.borderRadius = "20px";   // 角丸を大きめに
  button.style.fontSize = "2rem";       // 大きな文字
  button.style.cursor = "pointer";
  button.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.3)";
  button.style.display = "flex";
  button.style.alignItems = "center";
  button.style.justifyContent = "center";

  button.addEventListener("click", sendQuestion);

  document.body.appendChild(button);
}

function addBigMicButton() {
  if (document.getElementById("big-mic-button")) return; // 重複防止

  const button = document.createElement("button");
  button.id = "big-mic-button";
  button.innerText = "マイクをON";
  // サイズ・位置・スタイル
  button.style.position = "fixed";
  button.style.bottom = "340px";         // 下から20px
  button.style.right = "20px";          // 右から20px
  button.style.zIndex = "9999";
  button.style.width = "300px";         // 横300px
  button.style.height = "300px";        // 縦300px
  button.style.backgroundColor = "orange";
  button.style.color = "white";
  button.style.border = "none";
  button.style.borderRadius = "20px";   // 角丸を大きめに
  button.style.fontSize = "2rem";       // 大きな文字
  button.style.cursor = "pointer";
  button.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.3)";
  button.style.display = "flex";
  button.style.alignItems = "center";
  button.style.justifyContent = "center";

  button.addEventListener("click", appMicToggle);

  document.body.appendChild(button);
  updateBigMicButton(); // 初期表示
}


// ページの読み込み完了後にボタン追加
window.addEventListener(
  "load", () => {
    // textareaがSPAで遅れて出現する場合に備えて監視
    const observer = new MutationObserver(
      (_, obs) => {
        const editableDiv = document.querySelector('#prompt-textarea');
        if (editableDiv) {
        //addInputButton();
        addClearButton();
        addBigSendButton();
        addBigMicButton();

        // フォーカスイベントでマイクボタンの状態を更新
        editableDiv.addEventListener("focus", focusBigMicButton);
        editableDiv.addEventListener("blur", blurBigMicButton);

        obs.disconnect();
        }
      }
    );

    observer.observe(
      document.body, {
        childList: true,
        subtree: true,
      }
    );
  }
);
