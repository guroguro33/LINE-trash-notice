// dateオブジェクトのインスタンスが第何曜日か返す
function getDayOfWeekCount(date) {
  return Math.floor((date.getDate() -1) / 7) +1;  
}

// 指定ごみ収集曜日の前日に通知するためトリガーする関数
function notifyTheNightBefore() {
  // LINE Messaging API用変数を定義
  const ACCEES_TOKEN = '0Pwqb0tKtbdK6yKgv2zjMSx8t7KRLXRESms4UAa8PrR6IoKcne94dWoq9mo545KoUXs9TlPUxL7cCDRa62Iav9ToqtXy/cTJgqXCNHOPkczX6xzmDmWSvYhIwsJGArWWCqcVEQaMv5AG7zVFKFDOQgdB04t89/1O/w1cDnyilFU=';
  const URL = 'https://api.line.me/v2/bot/message/push';
  const GROUP_ID = 'C4d6512c19a74ba624c4057e3d07b4b26';
  // メッセージ本文を格納する変数
  let body = '';

  // 翌日の曜日を取得
  let date = new Date();
  // 特定の曜日の前日に通知するため、dateインスタンスの日時を1日進めて判定に使う
  date.setDate(date.getDate() + 1);
  // getDayで曜日の値を取得
  let dayIndex = date.getDay();
  // 曜日配列のdayIndex番目を取得してdayに代入
  let day = ['日', '月', '火', '水', '木', '金', '土'][dayIndex]

  // 曜日ごとのゴミ種類とメッセージを定義
  // 毎週のもの
  switch (day) {
    case '月':
      body += '明日、月曜日は燃やせるゴミの日です。準備をしましょう！' ;
      break;
    case '火':
      body += '明日、火曜日は雑貨、家電類ゴミ・プラスティックゴミの日です。準備をしましょう！' ;
      break;
    case '水':
      body += '明日、水曜日はペットボトル・古紙類ゴミの日です。準備をしましょう！' ;
      break;
    case '木':
      body += '明日、木曜日は燃やせるゴミの日です。準備をしましょう！' ;
      break;
    case '金':
      body += '明日、金曜日はビン・缶ゴミの日です。準備をしましょう！' ;
      break;
  }
  // たまにあるゴミの日
  let dayOfWeekCount = getDayOfWeekCount(date);
  // 
  if (dayOfWeekCount === 2 && day === '金') {
    body += '¥nそして水銀含有ゴミ・埋立ゴミ・スプレー缶ゴミ・ふとん類ゴミの日です。¥nせっかくなので準備をしましょう！';
  }

  // LINE Messaging APIでLINEグループへメッセージ送信
    // 翌日が平日の場合にメッセージ送信
    if (day === '月' || day === '火' || day === '水' || day === '木' || day === '金') {
      UrlFetchApp.fetch(URL, {
        'headers': {
          'content-Type': 'application/json; charset=UTF-8',
          'Authorization': 'Bearer ' + ACCEES_TOKEN,
        },
        'method': 'POST',
        'payload': JSON.stringify({
          'to': GROUP_ID,
          'messages': [{
            'type': 'text',
            'text': body,
          }]
        })
      })
    }
}
