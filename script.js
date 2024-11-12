document.addEventListener("DOMContentLoaded", function() {
  const audio = document.querySelector("#audio");
  const languageOverlay = document.querySelector("#language-overlay");
  const eggContainer = document.querySelector("#egg-container");
  let eggTimer;

  // 言語選択時の処理
  function selectLanguage(language) {
    let audioFile = `audio/welcome_${language}.mp3`;
    let volume = 0.2; // デフォルト音量

    // 韓国語の音量だけ20%増加
    if (language === 'ko') {
      volume = 0.4;  // 20%増し
    }

    // 言語に応じたオーディオファイルの設定
    if (audio) {
      audio.src = audioFile;
      audio.volume = volume;

      // 既存のオーディオを停止して新しいオーディオを再生
      if (!audio.paused) {
        audio.pause();
      }
      audio.play();
    } else {
      console.error("Audio element not found!");
    }

    // オーバーレイを非表示に
    languageOverlay.style.display = "none";

    // イースターエッグ表示タイマー設定
    eggTimer = setTimeout(showEasterEgg, 139000); // 139秒後にイースターエッグ表示
  }
  let currentdonut = 0;
  const donutImages = [
    "images/donut.webp", "images/donut1.webp", "images/donut2.webp",
    "images/donut3.webp", "images/donut4.webp", "images/donut5.webp",
    "images/donut6.webp", "images/donut7.webp", "images/donut8.webp",
    "images/donut9.webp", "images/donut10.webp"
  ];
  
  // 画像をクリックしてもフォーカスが当たらないようにする
document.getElementById("donut").addEventListener('click', function(event) {
  event.preventDefault();
  this.blur(); // 画像をクリックしてもフォーカスを外す
});

  function changedonutImage() {
    currentdonut = (currentdonut + 1) % donutImages.length;
    const donutElement = document.getElementById("donut");
  
    // 新しい画像を事前に読み込む
    const newImage = new Image();
    newImage.src = donutImages[currentdonut];
  
    newImage.onload = function () {
      // 画像が読み込まれたら、srcを変更してフェードイン
      donutElement.style.opacity = 0;  // 画像を一時的に透明に
      setTimeout(() => {
        donutElement.src = newImage.src;
        donutElement.style.opacity = 1;  // 画像を再表示（フェードイン）
      }, 300);  // フェードインの遷移時間（300ms）
    };
  }
  
  // イースターエッグ表示関数
  function showEasterEgg() {
    if (eggContainer) {
      eggContainer.style.display = "block";  // イースターエッグを表示
      eggContainer.onclick = showMessage;
    } else {
      console.error("Egg container not found!");
    }
  }

  // イースターエッグをクリック時のメッセージ表示
  function showMessage() {
    document.body.style.backgroundColor = "black";
    const message = document.querySelector("#message");
    if (message) {
      message.style.display = "block";
    } else {
      console.error("Message element not found!");
    }
  }

  // ページロード時にオーバーレイを表示
  languageOverlay.style.display = "flex";

  // グローバルでselectLanguage関数を使用できるようにする
  window.selectLanguage = selectLanguage;
});
