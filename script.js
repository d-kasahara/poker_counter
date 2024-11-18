// 最大10人分のプレイヤーデータを初期化
const playerData = Array.from({ length: 10 }, (_, i) => ({
    seat: i + 1,  // 座席番号
    raise: 0,     // レイズ回数
    call: 0,      // コール回数
    vpipHands: 0, // VPIPに関与したハンド数
    hands: 0      // 総ハンド数
  }));
  
  const tableBody = document.getElementById('player-table');
  
  // プレイヤー行を生成
  function renderTable() {
    tableBody.innerHTML = ''; // テーブルをクリア
    playerData.forEach(player => {
      const vpip = Math.floor(((player.vpipHands / player.hands) || 0) * 100);
      const pfr = Math.floor(((player.raise / player.hands) || 0) * 100);
  
      const row = `
        <tr>
          <td>${player.seat}</td>
          <td>
            <button class="raise" onclick="increment('raise', ${player.seat})">RAISE</button>
            <button class="call" onclick="increment('call', ${player.seat})">CALL</button>
          </td>
          <td>${vpip}%</td>
          <td>${pfr}%</td>
          <td>${player.hands}</td>
        </tr>
      `;
      tableBody.innerHTML += row;
    });
  }
  
  // アクションのカウント
  function increment(action, seat) {
    const player = playerData.find(p => p.seat === seat);
    if (!player) return;
  
    // レイズまたはコールした場合、VPIPに関与
    if (action === 'raise' || action === 'call') {
      player[action]++;
      player.vpipHands++;
    }
  
    renderTable(); // 更新
  }
  
  // 全員のハンド数を一括で増加（ハンド終了時）
  function incrementHands() {
    playerData.forEach(player => {
      player.hands++;
    });
    renderTable();
  }
  
  // カウントを初期化
  function resetCounts() {
    playerData.forEach(player => {
      player.raise = 0;
      player.call = 0;
      player.vpipHands = 0;
      player.hands = 0;
    });
    renderTable(); // 初期化後に再描画
  }
  
  // 初期描画
  renderTable();
  