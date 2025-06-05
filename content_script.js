  appConsoleLog  = (value) => {
      if(false){
          appConsoleLog(value);
      }else{

      }
  }


// テキストエリアに自動入力する関数
function inputToTextarea(text = "日本語でかボタン") {
    appConsoleLog("inputToTextarea呼び出し");
    const editableDiv = document.querySelector('#prompt-textarea');

    if (editableDiv) {
        appConsoleLog(editableDiv)

        // 文字列をセット（既存のものを消す）
        editableDiv.innerText = text;

        // ChatGPTに反応させるには、inputイベントが必要な場合もある
        editableDiv.dispatchEvent(new Event('input', { bubbles: true }));
        
        appConsoleLog("editableDivに文字をセットしました７");
        return true;
    }
    appConsoleLog("editableDivが無かったです");
    return false;
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
}

function appMicOn(){
    const micButton = document.querySelector("#vc-record-button");
    console.log(micButton);
    appConsoleLog("マイクON");
    micButton.click();
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
    inputToTextarea();
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

  button.addEventListener("click", appMicOn);

  document.body.appendChild(button);
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
