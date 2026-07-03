// app.js 🧙‍♂️ PyQuest 核心邏輯控制

// 1. 遊戲狀態 (Game State)
const gameState = {
    level: 1,
    hp: 100,
    maxHp: 100,
    exp: 0,
    maxExp: 100,
    currentQuest: 1,
    currentStep: 1, 
    enemyHp: 30,
    enemyMaxHp: 30,
    unlockedQuests: [1] // 已解鎖關卡的列表 (默認解鎖 Lv.1)
};

// 2. 10等級關卡與逐步引導數據 (10 Levels & Step-by-step Guided Content)
const questData = {
    1: {
        name: "Lv.1 勇者覺醒 ｜ print() 與文字輸出",
        enemyName: "小史萊姆",
        enemySprite: "👾",
        enemyMaxHp: 30,
        steps: [
            {
                title: "步驟 1/6: 觀察魔法咒語",
                text: "初學者的第一步，需要使用 <code>print()</code> 函數 (自訂輸出函式) 來讓魔法生效。請在編輯器中輸入：<br><strong style='color: #ff007f;'>print('Bison')</strong><br>這將會呼叫你的勇者之名。",
                tip: "注意：引號必須是半形的單引號 ' 或雙引號 \"，括號也必須是半形 () 哦！",
                placeholder: "# 在此輸入 print('Bison')",
                validate: (code, output) => {
                    return code.includes("print") && (code.includes("'Bison'") || code.includes('"Bison"')) && output.trim() === "Bison";
                }
            },
            {
                title: "步驟 2/6: 嘗試自訂文字",
                text: "太棒了！現在，請嘗試在 <code>print()</code> 裡面輸出你自己的名字，例如：<br><strong style='color: #00ffff;'>print('你的名字')</strong><br>試試看輸出不同的字元吧！",
                tip: "在 Python 中，被引號包起來的文字稱為『字串 (String)』。",
                placeholder: "# 在此輸入 print('你的名字')",
                validate: (code, output) => {
                    return code.includes("print") && output.trim().length > 0 && output.trim() !== "Bison";
                }
            },
            {
                title: "步驟 3/6: 輸出數值傷害",
                text: "現在，史萊姆對你發動了攻擊！請在編輯器中輸入以下程式碼，印出 30 的物理傷害值擊退它：<br><strong style='color: #39ff14;'>print(30)</strong>",
                tip: "輸出純數字時，不需要加上引號哦！",
                placeholder: "# 在此輸入 print(30)",
                validate: (code, output) => {
                    return code.includes("print") && output.trim() === "30";
                }
            },
            {
                title: "步驟 4/6: 印出計算結果",
                text: "你也可以讓 print 直接幫你印出算術計算的結果。請在編輯器中輸入以下代碼，輸出 5 + 5 的計算總和：<br><strong style='color: #ff007f;'>print(5 + 5)</strong>",
                tip: "與數值輸出相同，計算公式內不要加上引號，否則會變成印出字串公式本身！",
                placeholder: "# 在此輸入 print(5 + 5)",
                validate: (code, output) => {
                    return code.includes("print") && code.includes("+") && output.trim() === "10";
                }
            },
            {
                title: "步驟 5/6: 同時印出多個內容",
                text: "print 函數可以用逗號 , 隔開同時印出多個內容，輸出時中間會自動帶有一個空格。請印出：<br><strong style='color: #00ffff;'>print('Magic', 'Attack')</strong>",
                tip: "在代碼裡逗號 , 是用來分隔多個參數 (Arguments) 的。",
                placeholder: "# 用逗號隔開印出多個字串",
                validate: (code, output) => {
                    return code.includes("print") && code.includes(",") && output.trim() === "Magic Attack";
                }
            },
            {
                title: "步驟 6/6: 實戰挑戰：魔法連擊線",
                text: "史萊姆再次逼近！請利用 Python 的字串乘法運算，印出連續 10 個等號的長橫線阻擋怪物：<br><strong style='color: #39ff14;'>print('=' * 10)</strong>",
                tip: "在 Python 中，字串乘以數字會將字串重複輸出對應次數，這在排版介面時非常好用！",
                placeholder: "# 用 * 重複字串並用 print 印出",
                validate: (code, output) => {
                    return code.includes("print") && code.includes("*") && output.trim() === "==========";
                }
            }
        ]
    },
    2: {
        name: "Lv.2 魔法口袋 ｜ 變數與基本資料型態",
        enemyName: "哥布林工兵",
        enemySprite: "🧌",
        enemyMaxHp: 60,
        steps: [
            {
                title: "步驟 1/6: 建立第一個變數",
                text: "變數就像是你的魔法口袋。請建立一個名為 <code>mana</code> (魔力值) 的變數，並賦予數值 <code>50</code>：<br><strong style='color: #ff007f;'>mana = 50</strong>",
                tip: "在 Python 中，使用等號 = 來為變數賦值，左邊是變數名，右邊是數值。",
                placeholder: "# 建立 mana 變數並賦值 50",
                validate: (code, output) => {
                    return code.replace(/\s/g, "").includes("mana=50");
                }
            },
            {
                title: "步驟 2/6: 儲存魔法字串",
                text: "你也可以把咒語文字放進變數中。請建立一個名為 <code>spell</code> (咒語名稱) 的變數，並賦予字串 <code>'fireball'</code>：<br><strong style='color: #00ffff;'>spell = 'fireball'</strong>",
                tip: "字串必須用單引號或雙引號包起來哦！",
                placeholder: "# 建立 spell 變數並賦值 'fireball'",
                validate: (code, output) => {
                    return code.includes("spell") && (code.includes("'fireball'") || code.includes('"fireball"'));
                }
            },
            {
                title: "步驟 3/6: 印出變數內容",
                text: "哥布林工兵正要引爆炸藥！請輸出你剛剛在 <code>mana</code> 變數中存放的魔力值以啟動防護罩。請輸入：<br><strong style='color: #39ff14;'>mana = 50<br>print(mana)</strong>",
                tip: "輸出變數內容時，print() 括號內『不需要』加上引號，直接填寫變數名稱即可！",
                placeholder: "# 建立 mana 變數並用 print 輸出它",
                validate: (code, output) => {
                    return code.includes("mana") && code.includes("print") && output.trim() === "50";
                }
            },
            {
                title: "步驟 4/6: 定義初始生命值",
                text: "現在建立一個變數 <code>hp</code>，並賦予其整數值 <code>100</code> 代表你的初始生命力：<br><strong style='color: #ff007f;'>hp = 100</strong>",
                tip: "建立變數時要注意變數名稱必須為小寫英文，等號兩邊加空格會更好讀喔！",
                placeholder: "# 建立 hp 變數並賦值 100",
                validate: (code, output) => {
                    return code.replace(/\s/g, "").includes("hp=100");
                }
            },
            {
                title: "步驟 5/6: 削減生命值 (變數覆值)",
                text: "受到哥布林火花濺射！請將 <code>hp</code> 減去 <code>20</code>，並重新存回 <code>hp</code> 變數中：<br><strong style='color: #00ffff;'>hp = 100<br>hp = hp - 20</strong>",
                tip: "重新覆寫變數可以使用 x = x - 減少值的語法，Python 會先計算右邊再存回左邊。",
                placeholder: "# 讓 hp 減去 20 並覆值回 hp",
                validate: (code, output) => {
                    return code.includes("hp") && code.includes("-") && code.replace(/\s/g, "").includes("hp=hp-20");
                }
            },
            {
                title: "步驟 6/6: 實戰挑戰：印出剩餘生命",
                text: "最後，請將計算減血後的 <code>hp</code> 變數印出，以監控你的生命狀態：<br><strong style='color: #39ff14;'>hp = 100<br>hp = hp - 20<br>print(hp)</strong>",
                tip: "印出變數直接放進 print() 的括號內，此時應該輸出 80。",
                placeholder: "# 修改 hp 後，用 print 印出 hp 變數",
                validate: (code, output) => {
                    return code.includes("hp") && code.includes("print") && output.trim() === "80";
                }
            }
        ]
    },
    3: {
        name: "Lv.3 煉金工坊 ｜ 算術運算與字串操作",
        enemyName: "鐵甲寄居蟹",
        enemySprite: "🦀",
        enemyMaxHp: 60,
        steps: [
            {
                title: "步驟 1/6: 物理傷害計算",
                text: "寄居蟹的防禦力很高。請用 Python 幫你計算 100 的傷害減去 40 的護甲阻擋後得到的最終傷害，並將結果印出：<br><strong style='color: #ff007f;'>print(100 - 40)</strong>",
                tip: "Python 可以直接當成計算機，支援 +, -, *, / 等算術符號。",
                placeholder: "# 計算 100 減 40 的結果並輸出",
                validate: (code, output) => {
                    return code.includes("-") && code.includes("print") && output.trim() === "60";
                }
            },
            {
                title: "步驟 2/6: 利用變數做加乘",
                text: "建立一個變數 <code>atk</code> 賦值 <code>20</code>，再建立一個變數 <code>crit</code> (爆擊倍率) 賦值 <code>3</code>。印出它們相乘的總傷害值：<br><strong style='color: #00ffff;'>atk = 20<br>crit = 3<br>print(atk * crit)</strong>",
                tip: "在 Python 中，乘號是半形星號 * 哦！",
                placeholder: "# 建立變數並計算乘積輸出",
                validate: (code, output) => {
                    return code.includes("*") && code.includes("print") && output.trim() === "60";
                }
            },
            {
                title: "步驟 3/6: 字串拼接術",
                text: "把不同的魔力字串連起來能引發共鳴。請將變數 <code>spell_name = 'Lightning'</code> 與字串 <code>' Bolt'</code> (注意有空格) 相加，並用 <code>print()</code> 輸出：<br><strong style='color: #39ff14;'>spell_name = 'Lightning'<br>print(spell_name + ' Bolt')</strong>",
                tip: "字串相加會把文字無縫連在一起，這叫做字串拼接 (Concatenation)！",
                placeholder: "# 字串拼接並印出結果",
                validate: (code, output) => {
                    return code.includes("+") && code.includes("print") && output.trim() === "Lightning Bolt";
                }
            },
            {
                title: "步驟 4/6: 複製法力結界",
                text: "我們可以使用字串乘法快速複製魔法特效。請印出將字串 <code>'Ice '</code> 重複 3 次 the 結果：<br><strong style='color: #ff007f;'>print('Ice ' * 3)</strong>",
                tip: "字串乘以數字會將字串重複拷貝，注意 'Ice ' 後面帶有半形空格喔！",
                placeholder: "# 重複輸出字串 3 次",
                validate: (code, output) => {
                    return code.includes("*") && code.includes("print") && output.trim() === "Ice Ice Ice";
                }
            },
            {
                title: "步驟 5/6: 均分法能藥水",
                text: "你有 10 瓶藥水 <code>potions = 10</code>，請使用除法運算子 <code>/</code> 將藥水平分給 2 位勇者並印出結果：<br><strong style='color: #00ffff;'>potions = 10<br>print(potions / 2)</strong>",
                tip: "在 Python 中，除法運算子是 /。除法運算的結果預設會是浮點數 (如 5.0)！",
                placeholder: "# 建立 potions 變數並除以 2 輸出",
                validate: (code, output) => {
                    return code.includes("/") && code.includes("print") && parseFloat(output.trim()) === 5.0;
                }
            },
            {
                title: "步驟 6/6: 實戰挑戰：四則運算優先級",
                text: "魔法計算遵循先乘除後加減。請建立算式 <code>10 + 5 * 2</code> 並用 <code>print()</code> 印出結果：<br><strong style='color: #39ff14;'>print(10 + 5 * 2)</strong>",
                tip: "Python 會優先計算 5 * 2，所以結果應該是 20，而非 30！",
                placeholder: "# 計算 10 + 5 * 2 並輸出",
                validate: (code, output) => {
                    return code.includes("+") && code.includes("*") && output.trim() === "20";
                }
            }
        ]
    },
    4: {
        name: "Lv.4 分支岔路 ｜ If - elif - else 條件判斷",
        enemyName: "幽靈守衛",
        enemySprite: "👻",
        enemyMaxHp: 80,
        steps: [
            {
                title: "步驟 1/6: 基礎 If 條件判斷",
                text: "如果當前生命值低於 50 則印出 <code>'Danger'</code>。請宣告 <code>hp = 30</code>，並編寫 if 判斷式：<br><strong style='color: #ff007f;'>hp = 30<br>if hp < 50:<br>&nbsp;&nbsp;&nbsp;&nbsp;print('Danger')</strong>",
                tip: "Python 對縮排 (Indentation) 非常嚴格！if 條件成立的代碼行前必須按 4 個空格（或 Tab 鍵）！",
                placeholder: "# if 判斷式，注意冒號與縮排",
                validate: (code, output) => {
                    return code.includes("if") && code.includes(":") && output.trim() === "Danger";
                }
            },
            {
                title: "步驟 2/6: 抉難 If-else 分支",
                text: "如果魔力 <code>mana = 20</code> 大於或等於 30，印出 <code>'Cast'</code>，否則 (else) 印出 <code>'Wait'</code>：<br><strong style='color: #00ffff;'>mana = 20<br>if mana >= 30:<br>&nbsp;&nbsp;&nbsp;&nbsp;print('Cast')<br>else:<br>&nbsp;&nbsp;&nbsp;&nbsp;print('Wait')</strong>",
                tip: "else 必須和 if 對齊，且 else 後面也要加上冒號 : 哦！",
                placeholder: "# 實作 if-else 分支語法",
                validate: (code, output) => {
                    return code.includes("else") && code.includes(":") && output.trim() === "Wait";
                }
            },
            {
                title: "步驟 3/6: Elif 多重判定條件",
                text: "結界檢測！變數 <code>score = 85</code>，若大於等於 90 印出 <code>'A'</code>，若大於等於 80 (elif) 印出 <code>'B'</code>，其餘印出 <code>'C'</code>：<br><strong style='color: #39ff14;'>score = 85<br>if score >= 90:<br>&nbsp;&nbsp;&nbsp;&nbsp;print('A')<br>elif score >= 80:<br>&nbsp;&nbsp;&nbsp;&nbsp;print('B')<br>else:<br>&nbsp;&nbsp;&nbsp;&nbsp;print('C')</strong>",
                tip: "elif 是 else if 的縮寫，能容納多個中間條件的判定。",
                placeholder: "# 實作含 elif 的多重條件判斷",
                validate: (code, output) => {
                    return code.includes("elif") && code.includes(":") && output.trim() === "B";
                }
            },
            {
                title: "步驟 4/6: 零消耗技能判定",
                text: "建立變數 <code>cost = 0</code>，如果 <code>cost</code> 等於 0 (雙等號 <code>==</code>)，印出 <code>'Free'</code>：<br><strong style='color: #ff007f;'>cost = 0<br>if cost == 0:<br>&nbsp;&nbsp;&nbsp;&nbsp;print('Free')</strong>",
                tip: "注意：在條件判斷中，比較是否『相等』要用兩個等號 ==，單個等號 = 是賦值變數喔！",
                placeholder: "# 用 == 比較是否相等",
                validate: (code, output) => {
                    return code.includes("==") && output.trim() === "Free";
                }
            },
            {
                title: "步驟 5/6: 元素弱點檢測",
                text: "建立字串變數 <code>element = 'fire'</code>。如果 <code>element</code> 等於 <code>'water'</code>，印出 <code>'Weak'</code>，否則印出 <code>'Normal'</code>：<br><strong style='color: #00ffff;'>element = 'fire'<br>if element == 'water':<br>&nbsp;&nbsp;&nbsp;&nbsp;print('Weak')<br>else:<br>&nbsp;&nbsp;&nbsp;&nbsp;print('Normal')</strong>",
                tip: "字串相等的比對也適用 == 運算子，引號必須確實閉合。",
                placeholder: "# 比對字串變數",
                validate: (code, output) => {
                    return code.includes("==") && output.trim() === "Normal";
                }
            },
            {
                title: "步驟 6/6: 實戰挑戰：狀態機判定",
                text: "建立變數 <code>status = 'poison'</code>。如果狀態等於 <code>'freeze'</code> 印出 <code>'Frozen'</code>，否則印出 <code>'Active'</code>：<br><strong style='color: #39ff14;'>status = 'poison'<br>if status == 'freeze':<br>&nbsp;&nbsp;&nbsp;&nbsp;print('Frozen')<br>else:<br>&nbsp;&nbsp;&nbsp;&nbsp;print('Active')</strong>",
                tip: "這是狀態機控制的基礎，常用於 RPG 遊戲判定人物狀態。",
                placeholder: "# 實戰 if-else 狀態判定",
                validate: (code, output) => {
                    return code.includes("if") && output.trim() === "Active";
                }
            }
        ]
    },
    5: {
        name: "Lv.5 冒險指南 ｜ 比較與邏輯運算子",
        enemyName: "森林石魔",
        enemySprite: "🗿",
        enemyMaxHp: 85,
        steps: [
            {
                title: "步驟 1/6: 邏輯與 (And) 雙重條件",
                text: "只有同時擁有鑰匙 <code>has_key = True</code> 與金幣 <code>has_gold = True</code> 才能開門。印出 <code>has_key and has_gold</code> 的布林結果：<br><strong style='color: #ff007f;'>has_key = True<br>has_gold = True<br>print(has_key and has_gold)</strong>",
                tip: "and 運算子在兩邊條件皆為 True 時，才會回傳 True。",
                placeholder: "# 宣告布林變數並印出 and 結果",
                validate: (code, output) => {
                    return code.includes("and") && output.trim() === "True";
                }
            },
            {
                title: "步驟 2/6: 邏輯或 (Or) 彈性條件",
                text: "只要是騎士 <code>is_knight = False</code> 或法師 <code>is_mage = True</code> 其中之一即可進入。印出 <code>is_knight or is_mage</code>：<br><strong style='color: #00ffff;'>is_knight = False<br>is_mage = True<br>print(is_knight or is_mage)</strong>",
                tip: "or 運算子只要兩邊有一個為 True，就會回傳 True！",
                placeholder: "# 宣告變數並印出 or 邏輯運算",
                validate: (code, output) => {
                    return code.includes("or") && output.trim() === "True";
                }
            },
            {
                title: "步驟 3/6: 邏輯非 (Not) 否定魔法",
                text: "反轉狀態！變數 <code>is_poisoned = False</code> (未中毒)。印出否定它的布林值：<br><strong style='color: #39ff14;'>is_poisoned = False<br>print(not is_poisoned)</strong>",
                tip: "not 運算子會將 True 變 False，False 變 True。",
                placeholder: "# 使用 not 反轉布林狀態並印出",
                validate: (code, output) => {
                    return code.includes("not") && output.trim() === "True";
                }
            },
            {
                title: "步驟 4/6: 大於比較運算子",
                text: "比較等級。宣告 <code>level = 15</code>，用 <code>print()</code> 印出 <code>level > 10</code> 的布林比對結果：<br><strong style='color: #ff007f;'>level = 15<br>print(level > 10)</strong>",
                tip: "比較運算子的結果都是布林值 (True 或 False)。",
                placeholder: "# 大於比較運算子",
                validate: (code, output) => {
                    return code.includes(">") && output.trim() === "True";
                }
            },
            {
                title: "步驟 5/6: 不等於比較運算子",
                text: "檢測法力是否不為零。宣告 <code>mp = 50</code>，使用不等於運算子 <code>!=</code> 印出 <code>mp != 0</code> 的布林判定：<br><strong style='color: #00ffff;'>mp = 50<br>print(mp != 0)</strong>",
                tip: "在 Python 中，不等於使用驚嘆號與等號組成 != 符號。",
                placeholder: "# 用 != 進行不等於判定",
                validate: (code, output) => {
                    return code.includes("!=") && output.trim() === "True";
                }
            },
            {
                title: "步驟 6/6: 實戰挑戰：多重複合條件",
                text: "戰力檢測。宣告 <code>shield = 10</code> 及 <code>hp = 40</code>。請用 print 印出：護盾大於 5 且血量大於 30 的複合邏輯判定：<br><strong style='color: #39ff14;'>shield = 10<br>hp = 40<br>print(shield > 5 and hp > 30)</strong>",
                tip: "多重比較可以用 logic 運算子 line 起來，例如 shield > 5 and hp > 30。",
                placeholder: "# 結合比較運算子與 and 邏輯運算子",
                validate: (code, output) => {
                    return code.includes(">") && code.includes("and") && output.trim() === "True";
                }
            }
        ]
    },
    6: {
        name: "Lv.6 聚能魔法陣 ｜ While 條件迴圈",
        enemyName: "巨石兵",
        enemySprite: "🤖",
        enemyMaxHp: 100,
        steps: [
            {
                title: "步驟 1/6: 基礎 While 迴圈計數",
                text: "while 迴圈會在條件符合時重複執行。宣告 <code>count = 1</code>，當 <code>count <= 3</code> 時重複印出並遞增：<br><strong style='color: #ff007f;'>count = 1<br>while count <= 3:<br>&nbsp;&nbsp;&nbsp;&nbsp;print(count)<br>&nbsp;&nbsp;&nbsp;&nbsp;count = count + 1</strong>",
                tip: "千萬別忘了遞增計數 (count = count + 1)，否則會陷入無限迴圈而當機喔！",
                placeholder: "# while 迴圈計數輸出 1 到 3",
                validate: (code, output) => {
                    return code.includes("while") && output.replace(/\s/g, "") === "123";
                }
            },
            {
                title: "步驟 2/6: 削減怪物生命力",
                text: "巨石兵拍擊了地面！若當前生命值 <code>hp = 10</code> 小於 50，每次加 10 並輸出當前 HP 數值：<br><strong style='color: #00ffff;'>hp = 10<br>while hp < 50:<br>&nbsp;&nbsp;&nbsp;&nbsp;hp = hp + 10<br>&nbsp;&nbsp;&nbsp;&nbsp;print(hp)</strong>",
                tip: "每次迴圈增加數值時，可以用變數重新賦值（如 hp = hp + 10）。",
                placeholder: "# 迴圈每次加 10 hp 並輸出",
                validate: (code, output) => {
                    return code.includes("while") && output.replace(/\s/g, "") === "20304050";
                }
            },
            {
                title: "步驟 3/6: 法力聚能儀式",
                text: "法力初始 <code>mana = 10</code>。使用 while 迴圈，當 <code>mana < 40</code> 時，每次加上 10，最後印出 <code>mana</code> (印在迴圈外)：<br><strong style='color: #39ff14;'>mana = 10<br>while mana < 40:<br>&nbsp;&nbsp;&nbsp;&nbsp;mana = mana + 10<br>print(mana)</strong>",
                tip: "印在迴圈外代表最後一行的 print(mana) 程式碼不能有縮排，必須頂格！",
                placeholder: "# while 累積變數，並在迴圈外面印出結果",
                validate: (code, output) => {
                    return code.includes("while") && !code.includes("    print") && !code.includes("\tprint") && output.trim() === "40";
                }
            },
            {
                title: "步驟 4/6: 精力連擊 (重複輸出)",
                text: "精力 <code>energy = 30</code>，使用 while 迴圈，當 <code>energy >= 10</code> 時，印出 <code>'Hit'</code>，且每次減去 10：<br><strong style='color: #ff007f;'>energy = 30<br>while energy >= 10:<br>&nbsp;&nbsp;&nbsp;&nbsp;print('Hit')<br>&nbsp;&nbsp;&nbsp;&nbsp;energy = energy - 10</strong>",
                tip: "每次迴圈都要減少條件變數以保證迴圈在 3 次後停止。",
                placeholder: "# 條件削減 while 迴圈",
                validate: (code, output) => {
                    return code.includes("while") && output.trim().split("\n").filter(x => x.trim() === "Hit").length === 3;
                }
            },
            {
                title: "步驟 5/6: 倒數計時計數器",
                text: "建立計數器 <code>i = 5</code>。使用 while 迴圈，當 <code>i > 0</code> 時，印出 <code>i</code>，並每次將 <code>i</code> 減 1：<br><strong style='color: #00ffff;'>i = 5<br>while i > 0:<br>&nbsp;&nbsp;&nbsp;&nbsp;print(i)<br>&nbsp;&nbsp;&nbsp;&nbsp;i = i - 1</strong>",
                tip: "這可以用來實作冷卻時間或倒數計時器。",
                placeholder: "# while 倒數計數器",
                validate: (code, output) => {
                    return code.includes("while") && output.replace(/\s/g, "") === "54321";
                }
            },
            {
                title: "步驟 6/6: 實戰挑戰：累積防護罩",
                text: "護盾 <code>shield = 0</code>。使用 while 迴圈當 <code>shield < 30</code> 時每次加 10，最後印出 <code>shield</code> (迴圈外)：<br><strong style='color: #39ff14;'>shield = 0<br>while shield < 30:<br>&nbsp;&nbsp;&nbsp;&nbsp;shield = shield + 10<br>print(shield)</strong>",
                tip: "最後一行 print(shield) 絕對不能縮排，它會在迴圈跑完後印出最終護盾值 30。",
                placeholder: "# 累積護盾並在迴圈外面印出",
                validate: (code, output) => {
                    return code.includes("while") && output.trim() === "30";
                }
            }
        ]
    },
    7: {
        name: "Lv.7 分身斬 ｜ for 迭代迴圈與 range()",
        enemyName: "分身妖狐",
        enemySprite: "🦊",
        enemyMaxHp: 120,
        steps: [
            {
                title: "步驟 1/6: 基礎 For 迴圈重複",
                text: "分身妖狐分出了三個幻影！使用 <code>for</code> 迴圈與 <code>range(3)</code> 來發動三次 <code>'Slash'</code> (斬擊)：<br><strong style='color: #ff007f;'>for i in range(3):<br>&nbsp;&nbsp;&nbsp;&nbsp;print('Slash')</strong>",
                tip: "range(N) 會產生 0 到 N-1 的整數序列，是 for 迴圈的最佳拍檔。",
                placeholder: "# 用 for 迴圈與 range 輸出 3 次 Slash",
                validate: (code, output) => {
                    return code.includes("for") && code.includes("range") && output.trim().split("\n").filter(x => x.trim() === "Slash").length === 3;
                }
            },
            {
                title: "步驟 2/6: 數值加總魔法",
                text: "用 for 迴圈來計算 1 到 5 的累積魔力總和。建立 <code>total = 0</code>，用 for 迴圈迭代 <code>range(1, 6)</code> 並加總，最後在迴圈『外面』印出結果：<br><strong style='color: #00ffff;'>total = 0<br>for i in range(1, 6):<br>&nbsp;&nbsp;&nbsp;&nbsp;total = total + i<br>print(total)</strong>",
                tip: "注意：最後的 print() 必須和 for 對齊（不要縮排），這樣才不會每次迴圈都印出結果哦！",
                placeholder: "# 計算 1 加到 5 的總和並輸出",
                validate: (code, output) => {
                    return code.includes("for") && code.includes("range") && output.trim() === "15";
                }
            },
            {
                title: "步驟 3/6: 偶數序列打擊",
                text: "使用 <code>range(2, 7, 2)</code> 迴圈迭代。這會產生 2、4、6。在迴圈中印出每個迭代數字 <code>i</code>：<br><strong style='color: #39ff14;'>for i in range(2, 7, 2):<br>&nbsp;&nbsp;&nbsp;&nbsp;print(i)</strong>",
                tip: "range(start, stop, step) 的第三個參數是步長，此處為 2。",
                placeholder: "# 迭代偶數並印出",
                validate: (code, output) => {
                    return code.includes("for") && code.includes("range") && output.replace(/\s/g, "") === "246";
                }
            },
            {
                title: "步驟 4/6: 遍歷數值列表",
                text: "我們也可以直接用 for 遍歷一個手寫的列表 <code>[3, 2, 1]</code> 並用 <code>print()</code> 印出每個元素以發動倒數擊退：<br><strong style='color: #ff007f;'>for i in [3, 2, 1]:<br>&nbsp;&nbsp;&nbsp;&nbsp;print(i)</strong>",
                tip: "for x in list 語法能逐一提取列表中的每一個物品。",
                placeholder: "# 遍歷數值列表",
                validate: (code, output) => {
                    return code.includes("for") && output.replace(/\s/g, "") === "321";
                }
            },
            {
                title: "步驟 5/6: 鎖定目標打擊",
                text: "妖狐分身出 4 個實體。請用 for 迴圈迭代 <code>range(4)</code>，每次輸出 <code>'Target ' + str(i)</code> (注意有空格)：<br><strong style='color: #00ffff;'>for i in range(4):<br>&nbsp;&nbsp;&nbsp;&nbsp;print('Target ' + str(i))</strong>",
                tip: "i 變數是數字，字串拼接前必須用 str(i) 將其轉換為字串形態！",
                placeholder: "# 用 for 迴圈印出 Target 0 到 Target 3",
                validate: (code, output) => {
                    return code.includes("for") && code.includes("range") && output.replace(/\s/g, "").includes("Target0Target1Target2Target3");
                }
            },
            {
                title: "步驟 6/6: 實戰挑戰：雙重施法連擊",
                text: "請用 for 迴圈搭配 <code>range(2)</code>，重複印出 <code>'Double Cast'</code> 兩次發動最後攻勢：<br><strong style='color: #39ff14;'>for i in range(2):<br>&nbsp;&nbsp;&nbsp;&nbsp;print('Double Cast')</strong>",
                tip: "range(2) 會迴圈 2 次，索引分別為 0 與 1。",
                placeholder: "# 重複輸出 Double Cast 兩次",
                validate: (code, output) => {
                    return code.includes("for") && output.trim().split("\n").filter(x => x.trim() === "Double Cast").length === 2;
                }
            }
        ]
    },
    8: {
        name: "Lv.8 卷軸收納盒 ｜ List (列表) 基礎操作",
        enemyName: "貪婪史萊姆",
        enemySprite: "🧪",
        enemyMaxHp: 120,
        steps: [
            {
                title: "步驟 1/6: 建立你的收納列表",
                text: "List (列表) 可以存放多項物件。請建立一個名為 <code>inventory</code> (背包) 的列表，包含 <code>'sword'</code>、<code>'shield'</code>、<code>'potion'</code> 三個字串，並將其印出：<br><strong style='color: #ff007f;'>inventory = ['sword', 'shield', 'potion']<br>print(inventory)</strong>",
                tip: "Python 的列表使用中括號 []，裡面的元素用逗號隔開。",
                placeholder: "# 建立包含三個字串 the 列表並印出",
                validate: (code, output) => {
                    return code.includes("[") && code.includes("]") && output.includes("sword") && output.includes("potion");
                }
            },
            {
                title: "步驟 2/6: 抽取你的主要武器",
                text: "請輸出 <code>inventory</code> 背包列表中的第一個元素（索引值為 0 的元素）來擊碎史萊姆的核心：<br><strong style='color: #00ffff;'>inventory = ['sword', 'shield', 'potion']<br>print(inventory[0])</strong>",
                tip: "列表的索引從 0 開始，第一個元素是 [0]，第二個是 [1]。",
                placeholder: "# 輸出列表的第一個元素 [0]",
                validate: (code, output) => {
                    return code.includes("[0]") && output.trim() === "sword";
                }
            },
            {
                title: "步驟 3/6: 查詢背包物品數量",
                text: "請使用 <code>len()</code> 函數獲取 <code>inventory</code> 列表的長度並印出它：<br><strong style='color: #39ff14;'>inventory = ['sword', 'shield', 'potion']<br>print(len(inventory))</strong>",
                tip: "len(list) 可以回傳列表包含的物件總個數。",
                placeholder: "# 輸出 inventory 列表的長度",
                validate: (code, output) => {
                    return code.includes("len") && output.trim() === "3";
                }
            },
            {
                title: "步驟 4/6: 添加新魔法道具",
                text: "史萊姆爆出了新道具！請使用 <code>.append('scroll')</code> 往列表末端添加道具，最後印出 <code>inventory</code> 列表：<br><strong style='color: #ff007f;'>inventory = ['sword', 'shield', 'potion']<br>inventory.append('scroll')<br>print(inventory)</strong>",
                tip: "使用 list.append(item) 可以在列表最後方追加一個新元素。",
                placeholder: "# 使用 append 追加 scroll 並印出列表",
                validate: (code, output) => {
                    return code.includes("append") && output.includes("scroll") && output.includes("potion");
                }
            },
            {
                title: "步驟 5/6: 丟棄笨重盾牌",
                text: "背包過重！請使用 <code>.remove('shield')</code> 移除列表中的盾牌，最後印出 <code>inventory</code> 列表：<br><strong style='color: #00ffff;'>inventory = ['sword', 'shield', 'potion']<br>inventory.remove('shield')<br>print(inventory)</strong>",
                tip: "list.remove(value) 會尋找列表中的第一個指定內容並刪除它。",
                placeholder: "# 使用 remove 移除 shield 並印出列表",
                validate: (code, output) => {
                    return code.includes("remove") && !output.includes("shield") && output.includes("sword");
                }
            },
            {
                title: "步驟 6/6: 實戰挑戰：更新裝備武器",
                text: "請把背包中第二個道具（索引為 1 的盾牌）覆寫修改成 <code>'greatsword'</code> 並印出列表：<br><strong style='color: #39ff14;'>inventory = ['sword', 'shield', 'potion']<br>inventory[1] = 'greatsword'<br>print(inventory)</strong>",
                tip: "列表的特定元素可以直接用 list[index] = new_value 來修改。",
                placeholder: "# 修改列表索引為 1 的元素並印出",
                validate: (code, output) => {
                    return code.includes("[1]") && output.includes("greatsword") && !output.includes("shield");
                }
            }
        ]
    },
    9: {
        name: "Lv.9 終極契約 ｜ 自訂 Function (函式) 定義",
        enemyName: "雙頭奇美拉",
        enemySprite: "🦁",
        enemyMaxHp: 150,
        steps: [
            {
                title: "步驟 1/5: 定義第一個魔法招式",
                text: "Function (函式) 可以封裝你的重複魔術。請定義一個名為 <code>cast_magic</code> 的無參數函式，功能為輸出 <code>'Fire'</code>，並在下方呼叫它：<br><strong style='color: #ff007f;'>def cast_magic():<br>&nbsp;&nbsp;&nbsp;&nbsp;print('Fire')<br><br>cast_magic()</strong>",
                tip: "定義函式使用 def 關鍵字，結尾要加冒號 :，內部邏輯要縮排，最後呼叫要帶括號 ()！",
                placeholder: "# 用 def 定義 cast_magic 函式並呼叫",
                validate: (code, output) => {
                    return code.includes("def") && code.includes("cast_magic") && output.trim() === "Fire";
                }
            },
            {
                title: "步驟 2/5: 帶有單一參數的招式",
                text: "現在定義一個接受傷害參數的函式 <code>attack(dmg)</code>，功能為印出 <code>'Dealt ' + str(dmg)</code>。傳入 <code>50</code> 呼叫它：<br><strong style='color: #00ffff;'>def attack(dmg):<br>&nbsp;&nbsp;&nbsp;&nbsp;print('Dealt ' + str(dmg))<br><br>attack(50)</strong>",
                tip: "傳入的 dmg 在函式中直接做為變數使用，拼裝輸出前必須先用 str(dmg) 轉字串！",
                placeholder: "# 定義單參數函式並傳入 50 呼叫",
                validate: (code, output) => {
                    return code.includes("def") && code.includes("attack") && output.trim() === "Dealt 50";
                }
            },
            {
                title: "步驟 3/5: 自訂雙參數召喚術",
                text: "定義一個接受名字與次數雙參數的函式 <code>spawn_clone(name, num)</code>，功能為印出 <code>name * num</code>。傳入 <code>'Shadow'</code> 與 <code>2</code> 呼叫它：<br><strong style='color: #39ff14;'>def spawn_clone(name, num):<br>&nbsp;&nbsp;&nbsp;&nbsp;print(name * num)<br><br>spawn_clone('Shadow', 2)</strong>",
                tip: "函式可以接受多個參數，中間用半形逗號隔開即可。",
                placeholder: "# 定義 spawn_clone 雙參數函式並呼叫",
                validate: (code, output) => {
                    return code.includes("def") && code.includes("spawn_clone") && output.trim() === "ShadowShadow";
                }
            },
            {
                title: "步驟 4/5: 帶有數值計算的招式",
                text: "定義一個 <code>double_dmg(dmg)</code> 函式，功能為輸出 <code>dmg * 2</code> 的乘積結果。傳入 <code>30</code> 呼叫它：<br><strong style='color: #ff007f;'>def double_dmg(dmg):<br>&nbsp;&nbsp;&nbsp;&nbsp;print(dmg * 2)<br><br>double_dmg(30)</strong>",
                tip: "函式內可以直接使用算術運算，並用 print 印出計算結果。",
                placeholder: "# 定義 double_dmg 並傳入 30 呼叫",
                validate: (code, output) => {
                    return code.includes("def") && code.includes("double_dmg") && output.trim() === "60";
                }
            },
            {
                title: "步驟 5/5: 實戰挑戰：自訂問候語招式",
                text: "定義一個 <code>greet_hero(name)</code> 函式，印出 <code>'Hello ' + name</code>。傳入 <code>'Bison'</code> 呼叫它：<br><strong style='color: #39ff14;'>def greet_hero(name):<br>&nbsp;&nbsp;&nbsp;&nbsp;print('Hello ' + name)<br><br>greet_hero('Bison')</strong>",
                tip: "這是最基礎的字串傳入與輸出示範，記得 Hello 後面有空格。",
                placeholder: "# 定義 greet_hero 並傳入 Bison 呼叫",
                validate: (code, output) => {
                    return code.includes("def") && code.includes("greet_hero") && output.trim() === "Hello Bison";
                }
            }
        ]
    },
    10: {
        name: "Lv.10 封魔戰役 ｜ Return (傳回值) 與終極對決",
        enemyName: "深淵大魔王",
        enemySprite: "👿",
        enemyMaxHp: 200,
        steps: [
            {
                title: "步驟 1/5: 傳回雙倍魔力結果",
                text: "終極戰役開始！請定義 <code>calc_dmg(base)</code> 函式，使用 <code>return</code> 關鍵字傳回 <code>base * 2</code>。印出傳入 50 的呼叫結果：<br><strong style='color: #ff007f;'>def calc_dmg(base):<br>&nbsp;&nbsp;&nbsp;&nbsp;return base * 2<br><br>print(calc_dmg(50))</strong>",
                tip: "return 關鍵字會將計算好的數據傳出函式外，你可以用 print 把它印出來。",
                placeholder: "# 使用 return 傳回值並用 print 輸出",
                validate: (code, output) => {
                    return code.includes("def") && code.includes("return") && output.trim() === "100";
                }
            },
            {
                title: "步驟 2/5: 疊加兩股爆擊魔力",
                text: "定義 <code>total_dmg(a, b)</code>，利用 <code>return</code> 傳回兩數之和 <code>a + b</code>。使用 print 印出傳入 120 與 80 的呼叫結果：<br><strong style='color: #00ffff;'>def total_dmg(a, b):<br>&nbsp;&nbsp;&nbsp;&nbsp;return a + b<br><br>print(total_dmg(120, 80))</strong>",
                tip: "return 會打斷函式並立刻將結果返回，後方的代碼將不再執行。",
                placeholder: "# 定義加總函式並印出 total_dmg(120, 80) 結果",
                validate: (code, output) => {
                    return code.includes("def") && code.includes("return") && output.trim() === "200";
                }
            },
            {
                title: "步驟 3/5: 條件分支 Return 的威力",
                text: "定義 <code>test(dmg)</code> 函式：如果 <code>dmg > 50</code> 傳回 <code>'Strong'</code>，否則傳回 <code>'Weak'</code>。印出傳入 <code>60</code> 呼叫結果：<br><strong style='color: #39ff14;'>def test(dmg):<br>&nbsp;&nbsp;&nbsp;&nbsp;if dmg > 50:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return 'Strong'<br>&nbsp;&nbsp;&nbsp;&nbsp;else:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return 'Weak'<br><br>print(test(60))</strong>",
                tip: "函式遇到符合的條件 return 後，後續的 else 分支就不會被執行。",
                placeholder: "# 實作含 if-else return 判定的函式並印出",
                validate: (code, output) => {
                    return code.includes("def") && code.includes("return") && output.trim() === "Strong";
                }
            },
            {
                title: "步驟 4/5: 計算爆擊乘積 Return",
                text: "定義 <code>calc_crit(atk, mult)</code> 函式，傳回 <code>atk * mult</code> 的結果。印出傳入 <code>50</code> 與 <code>3</code> 呼叫它的傳回值：<br><strong style='color: #ff007f;'>def calc_crit(atk, mult):<br>&nbsp;&nbsp;&nbsp;&nbsp;return atk * mult<br><br>print(calc_crit(50, 3))</strong>",
                tip: "多參數的計算也可以直接 return 傳回。",
                placeholder: "# 定義計算爆擊 return 函式並印出結果",
                validate: (code, output) => {
                    return code.includes("def") && code.includes("return") && output.trim() === "150";
                }
            },
            {
                title: "步驟 5/5: 實戰挑戰：終極死亡判定",
                text: "魔王最後一擊！定義 <code>is_dead(hp)</code> 函式，如果 <code>hp <= 0</code> 傳回 <code>True</code>，否則傳回 <code>False</code>。印出傳入 <code>10</code> 呼叫結果：<br><strong style='color: #39ff14;'>def is_dead(hp):<br>&nbsp;&nbsp;&nbsp;&nbsp;if hp <= 0:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return True<br>&nbsp;&nbsp;&nbsp;&nbsp;else:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return False<br><br>print(is_dead(10))</strong>",
                tip: "10 不小於或等於 0，所以此處呼叫應傳回 False！",
                placeholder: "# 實作 boolean return 的死亡判定並輸出",
                validate: (code, output) => {
                    return code.includes("def") && code.includes("return") && output.trim() === "False";
                }
            }
        ]
    }
}

// 3. Pyodide 執行環境初始化 (Pyodide Initialization)
let pyodideInstance = null;
let stdoutBuffer = "";

async function initPyodide() {
    const loader = document.getElementById("pyodideLoader");
    const castBtn = document.getElementById("castSpellBtn");
    
    try {
        // loadPyodide 來自 index.html 引入的 CDN
        // 明確指定 indexURL 以避免本地以 file:/// 協議開啟時加載 Wasm 失敗而卡在初始化
        pyodideInstance = await loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.1/full/",
            stdout: (text) => {
                stdoutBuffer += text + "\n";
            },
            stderr: (text) => {
                stdoutBuffer += text + "\n";
            }
        });
        
        loader.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--neon-green)"></i> Pyodide (執行環境) 已就緒`;
        loader.style.borderColor = "var(--neon-green)";
        loader.style.color = "var(--neon-green)";
        
        castBtn.removeAttribute("disabled");
        
        appendSystemMessage("【系統資訊】Python 執行環境加載成功！你可以開始詠唱魔法了。");
        
        // 載入當前關卡
        loadQuest(gameState.currentQuest);
        
    } catch (error) {
        loader.innerHTML = `<i class="fa-solid fa-circle-xmark" style="color: var(--neon-pink)"></i> 執行環境載入失敗`;
        loader.style.borderColor = "var(--neon-pink)";
        appendErrorMessage("載入 Pyodide 失敗，請檢查網路連線或重整網頁。\n詳細錯誤: " + error);
    }
}

// 4. UI (使用者介面) 渲染控制
function appendSystemMessage(msg) {
    const consoleOut = document.getElementById("consoleOutput");
    consoleOut.innerHTML += `<div class="system-msg">${msg}</div>`;
    consoleOut.scrollTop = consoleOut.scrollHeight;
}

function appendPrintMessage(msg) {
    const consoleOut = document.getElementById("consoleOutput");
    consoleOut.innerHTML += `<div class="print-msg">${msg}</div>`;
    consoleOut.scrollTop = consoleOut.scrollHeight;
}

function appendErrorMessage(msg) {
    const consoleOut = document.getElementById("consoleOutput");
    consoleOut.innerHTML += `<div class="error-msg">${msg}</div>`;
    consoleOut.scrollTop = consoleOut.scrollHeight;
}

function appendSuccessMessage(msg) {
    const consoleOut = document.getElementById("consoleOutput");
    consoleOut.innerHTML += `<div class="success-msg">${msg}</div>`;
    consoleOut.scrollTop = consoleOut.scrollHeight;
}

function clearConsole() {
    document.getElementById("consoleOutput").innerHTML = "";
}

function loadQuest(questId) {
    const quest = questData[questId];
    if (!quest) return;
    document.getElementById("currentQuestName").innerText = quest.name;
    document.getElementById("enemyName").innerText = quest.enemyName;
    document.getElementById("enemySprite").innerText = quest.enemySprite;
    gameState.enemyHp = quest.enemyMaxHp;
    gameState.enemyMaxHp = quest.enemyMaxHp;
    updateEnemyHpBar();
    loadStep();
    renderQuestMap();
}

function loadStep() {
    const quest = questData[gameState.currentQuest];
    const step = quest.steps ? quest.steps[gameState.currentStep - 1] : null;
    if (!step) {
        document.getElementById("stepBadge").innerText = "開發中";
        document.getElementById("stepTitle").innerText = "敬請期待";
        document.getElementById("guideText").innerHTML = "下一等級的教學與魔物正在趕來的路上！";
        document.getElementById("guideTipText").innerText = "先重複練習前面的代碼吧。";
        return;
    }
    document.getElementById("stepBadge").innerText = `步驟 ${gameState.currentStep}/${quest.steps.length}`;
    document.getElementById("stepTitle").innerText = step.title;
    document.getElementById("guideText").innerHTML = step.text;
    document.getElementById("guideTipText").innerText = step.tip;
    const editorContainer = document.getElementById("editorContainer");
    editorContainer.classList.add("highlight-guide");
    setTimeout(() => {
        editorContainer.classList.remove("highlight-guide");
    }, 3000);
    const textarea = document.getElementById("codeTextarea");
    textarea.value = "";
    textarea.placeholder = step.placeholder !== undefined ? step.placeholder : "# 在這裡編寫你的 Python 魔法咒語...";
    updateLineNumbers();
}

function updateEnemyHpBar() {
    const hpPercent = (gameState.enemyHp / gameState.enemyMaxHp) * 100;
    document.getElementById("enemyHpBar").style.width = Math.max(0, hpPercent) + "%";
}

function updatePlayerStats() {
    document.getElementById("heroLevel").innerText = `Lv.${gameState.level}`;
    document.getElementById("hpBar").style.width = `${gameState.hp}%`;
    document.getElementById("hpValue").innerText = `${gameState.hp} / 100`;
    const expPercent = (gameState.exp / gameState.maxExp) * 100;
    document.getElementById("expBar").style.width = `${expPercent}%`;
    document.getElementById("expValue").innerText = `${gameState.exp} / ${gameState.maxExp}`;
}

async function castSpell() {
    if (!pyodideInstance) return;
    const code = document.getElementById("codeTextarea").value;
    stdoutBuffer = "";
    appendSystemMessage("【魔法詠唱中...】");
    try {
        await pyodideInstance.runPythonAsync(code);
        if (stdoutBuffer) appendPrintMessage(stdoutBuffer.trim());
        else appendSystemMessage("（魔法無聲生效，無終端輸出）");
        verifyCode(code, stdoutBuffer);
    } catch (err) {
        appendErrorMessage(err.toString());
    }
}

function showDamagePopup(amount) {
    const arena = document.querySelector(".battle-arena");
    const popup = document.createElement("div");
    popup.className = "damage-popup";
    popup.innerText = `-${Math.round(amount)} HP`;
    const rightOffset = 80 + Math.random() * 40;
    const topOffset = 70 + Math.random() * 30;
    popup.style.right = `${rightOffset}px`;
    popup.style.top = `${topOffset}px`;
    arena.appendChild(popup);
    setTimeout(() => { popup.remove(); }, 1000);
}

function playSpellFx(questId) {
    const fx = document.getElementById("spellFxOverlay");
    let type = "fire";
    if (questId >= 9) type = "ice";
    else if (questId >= 4 && questId <= 6) type = "thunder";
    fx.className = `spell-fx-overlay spell-${type}`;
    setTimeout(() => { fx.className = "spell-fx-overlay"; }, 400);
}

function showModal(title, body, iconClass = "fa-trophy", isLevelUp = false, btnText = "繼續冒險") {
    const overlay = document.getElementById("modalOverlay");
    const icon = document.getElementById("modalIcon");
    const mHeader = document.querySelector(".modal-header");
    const closeBtn = document.getElementById("modalCloseBtn");
    
    if (!tutorialActive) {
        overlay.classList.remove("tutorial-mode");
    }
    
    document.getElementById("modalTitle").innerText = title;
    document.getElementById("modalBody").innerHTML = body;
    icon.className = `fa-solid ${iconClass}`;
    closeBtn.innerText = btnText;
    if (isLevelUp) mHeader.classList.add("level-up");
    else mHeader.classList.remove("level-up");
    overlay.classList.add("show");
}

let tutorialActive = false;
let currentTutorialStep = 0;
const tutorialSteps = [
    { title: "🧙‍♂️ 歡迎來到 PyQuest 魔法世界！", body: "這是一個邊學邊玩的 Python 程式挑戰遊戲。<br>接下來我們將用 1 分鐘的導覽引導你認識各個區域，幫助你輕鬆上手！", targetId: null, btnText: "開始導覽 (1/5)", iconClass: "fa-wand-magic-sparkles" },
    { title: "🗺️ 關卡傳送地圖 (Quest Map)", body: "這裡是你的**冒險傳送地圖**。顯示 1-10 關的解鎖進度，過關後可以隨時點擊數字傳送、重複練習！", targetId: "questMap", btnText: "下一步 (2/5)", iconClass: "fa-map" },
    { title: "📋 任務引導面板 (Quest Book)", body: "這裡會顯示當前關卡的魔物、<b>步驟說明</b>與<b>技巧提示 (Tips)</b>。請仔細閱讀目標後再動手寫代碼！", targetId: "adventurePanel", btnText: "下一步 (3/5)", iconClass: "fa-book-open" },
    { title: "🔮 魔法編輯器 (Spell Editor)", body: "這是編寫程式碼的區域。為防止偷懶，系統不會預填答案，請看清左側提示<b>親自動手輸入</b>！", targetId: "editorContainer", btnText: "下一步 (4/5)", iconClass: "fa-keyboard" },
    { title: "⚡ 詠唱魔法與水晶球", body: "完成代碼後，點擊右下角<b>詠唱魔法 (Cast Spell)</b>。執行結果與可能出錯的紅色錯誤將在主控台呈現！", targetId: "magicPanel", btnText: "完成導覽，開始冒險！", iconClass: "fa-terminal" }
];

function startTutorial() {
    tutorialActive = true;
    currentTutorialStep = 0;
    showTutorialStep();
}

function showTutorialStep() {
    document.querySelectorAll(".tutorial-highlight").forEach(el => el.classList.remove("tutorial-highlight"));
    const step = tutorialSteps[currentTutorialStep];
    if (step.targetId) {
        const target = document.getElementById(step.targetId);
        if (target) {
            target.classList.add("tutorial-highlight");
            target.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }
    document.getElementById("modalOverlay").classList.add("tutorial-mode");
    showModal(step.title, step.body, step.iconClass, false, step.btnText);
}

function saveGame() {
    localStorage.setItem("pyquest_save_v2", JSON.stringify(gameState));
}

function loadGame() {
    const saved = localStorage.getItem("pyquest_save_v2");
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            Object.assign(gameState, parsed);
            if (!gameState.unlockedQuests) gameState.unlockedQuests = [1];
            appendSystemMessage("【進度加載】成功載入你上次冒險的存檔！");
        } catch (e) { console.error("Failed to parse game save", e); }
    }
}

function renderQuestMap() {
    const map = document.getElementById("questMap");
    if (!map) return;
    map.innerHTML = "";
    const totalQuests = 10;
    for (let i = 1; i <= totalQuests; i++) {
        const wrapper = document.createElement("div");
        wrapper.className = "map-node-wrapper";
        const node = document.createElement("div");
        node.className = "map-node";
        node.innerText = i;
        if (i === gameState.currentQuest) node.classList.add("current");
        else if (gameState.unlockedQuests.includes(i)) node.classList.add("completed");
        else node.classList.add("locked");
        const maxUnlocked = Math.max(...gameState.unlockedQuests, 1);
        if (i === gameState.currentQuest || gameState.unlockedQuests.includes(i) || i <= maxUnlocked + 1) {
            node.classList.remove("locked");
            node.classList.add("unlocked");
            node.addEventListener("click", () => {
                if (gameState.currentQuest !== i) {
                    gameState.currentQuest = i;
                    gameState.currentStep = 1;
                    saveGame();
                    loadQuest(i);
                    appendSystemMessage(`【傳送】已傳送至關卡 Lv.${i} 重複挑戰！`);
                }
            });
        }
        wrapper.appendChild(node);
        if (i < totalQuests) {
            const line = document.createElement("div");
            line.className = "map-connector";
            if (gameState.unlockedQuests.includes(i) && gameState.unlockedQuests.includes(i + 1)) line.classList.add("completed");
            else if (i === gameState.currentQuest || (gameState.unlockedQuests.includes(i) && i + 1 === gameState.currentQuest)) line.classList.add("active");
            wrapper.appendChild(line);
        }
        map.appendChild(wrapper);
    }
}

function verifyCode(code, output) {
    const quest = questData[gameState.currentQuest];
    if (!quest || !quest.steps) return;
    const step = quest.steps[gameState.currentStep - 1];
    if (!step) return;
    const isCorrect = step.validate(code, output);
    if (isCorrect) {
        appendSuccessMessage("【魔法詠唱成功！】");
        const damage = quest.enemyMaxHp / quest.steps.length;
        gameState.enemyHp = Math.max(0, gameState.enemyHp - damage);
        updateEnemyHpBar();
        showDamagePopup(damage);
        playSpellFx(gameState.currentQuest);
        
        // 怪物受擊抖動
        const enemySprite = document.getElementById("enemySprite");
        enemySprite.style.transform = "scale(1.3) rotate(12deg)";
        enemySprite.style.transition = "transform 0.1s";
        setTimeout(() => {
            enemySprite.style.transform = "none";
        }, 150);
        
        // 前進至下一步驟
        if (gameState.currentStep < quest.steps.length) {
            gameState.currentStep++;
            saveGame();
            setTimeout(() => {
                appendSystemMessage("\u3010\u7CFB\u7D71\u3011\u89E3\u9396\u4E0B\u4E0B\u4E00\u500B\u5F15\u5C0E\u6B65\u9A50\uFF01");
                loadStep();
            }, 800);
        } else {
            // 擊殺怪物，過關與升級
            setTimeout(() => {
                appendSuccessMessage("\u3010\u5927\u6377\uFF01\u3011\u4F60\u6210\u529F\u64CA\u6557\u4E86 " + quest.enemyName + "\uFF01");
                
                // 通關後將當前關卡加入解鎖列表
                if (!gameState.unlockedQuests.includes(gameState.currentQuest)) {
                    gameState.unlockedQuests.push(gameState.currentQuest);
                }
                
                // 檢查是否通關解鎖成就
                checkAchievements();
                
                gainExp(50); // 獲得經驗值
                
                // 前往下一等級
                const nextQuestId = gameState.currentQuest + 1;
                if (questData[nextQuestId]) {
                    if (!gameState.unlockedQuests.includes(nextQuestId)) {
                        gameState.unlockedQuests.push(nextQuestId);
                    }
                    gameState.currentQuest = nextQuestId;
                    gameState.currentStep = 1;
                    saveGame();
                    renderQuestMap(); // 更新地圖
                    appendSystemMessage("\u3010\u7CFB\u7D71\u3011\u958B\u555F\u5168\u65B0\u96E3\u6613\u5EA6\u95DC\u5361\uFF01");
                    loadQuest(gameState.currentQuest);
                } else {
                    showModal(
                        "\uD83C\uDF89 \u7562\u6775\u5927\u6E95\u8CAB\uFF01", 
                        "\u606D\u556C\u4F60\u901A\u95DC\u4E86\u5168\u90E8 10 \u500B\u7B49\u7D1A\u7684\u8003\u9A57\uFF01\u4F60\u5DF2\u7D93\u638C\u63E1\u4E86 Python \u57FA\u790E\u8A9E\u6CD5\u7684\u6838\u5FC3\u7CBE\u9AC3\uFF01", 
                        "fa-crown", 
                        false
                    );
                    appendSuccessMessage("\u3010\u50B3\u5947\uFF01\u3011\u4F60\u5DF2\u5B8C\u6210\u4E86\u76EE\u524D\u6240\u6709\u7684\u8A66\u7149\uFF01");
                }
            }, 1000);
        }
    } else {
        appendErrorMessage("【魔法失效】咒語未達到預期效果。請仔細閱讀引導提示再試一次！");
    }
}

// 檢查成就解鎖 (Achievement Check)
function checkAchievements() {
    if (gameState.currentQuest === 1) {
        showModal(
            "\uD83C\uDFC6 獲得成就：初出茅廬", 
            "解鎖稱號【Bison 覺醒者】！你成功呼叫了 print 魔法，邁出了程式設計的第一步！", 
            "fa-wand-magic-sparkles", 
            false
        );
    } else if (gameState.currentQuest === 5) {
        showModal(
            "\uD83C\uDFC6 \u7372\u5F97\u6210\u5C31\uFF1A\u908F\u8F2F\u5927\u5E2B", 
            "\u89E3\u9396\u7A31\u865F\u3010\u908F\u8F2F\u7D50\u754C\u7834\u9664\u8005\u3011\uFF01\u4F60\u6210\u529F\u901A\u904E\u4E86 If-else \u689D\u4EF6\u8207\u908F\u8F2F\u904B\u7B9B\u7684\u591A\u91CD\u8003\u9A57\uFF01", 
            "fa-puzzle-piece", 
            false
        );
    } else if (gameState.currentQuest === 7) {
        showModal(
            "\uD83C\uDFC6 \u7372\u5F97\u6210\u5C31\uFF1A\u5206\u8EAB\u5927\u5E2B", 
            "\u89E3\u9396\u7A31\u865F\u3010\u8FF4\u5708\u5E7B\u8853\u4F7F\u3011\uFF01\u4F60\u5B78\u6703\u4E86\u5229\u7528 for/while \u8FF4\u5708\u5C0D\u9B54\u7269\u767C\u52D5\u7CBE\u6E96\u7684\u9023\u7E8C\u9023\u64CA\uFF01", 
            "fa-clone", 
            false
        );
    }
}

// 獲得經驗值系統
function gainExp(amount) {
    gameState.exp += amount;
    if (gameState.exp >= gameState.maxExp) {
        gameState.exp -= gameState.maxExp;
        gameState.level++;
        
        // 觸發全版 Level Up 彈窗
        setTimeout(() => {
            showModal(
                "\u2728 LEVEL UP\uFF01 \u2728", 
                `\u606D\u556C\u52C7\u8005\uFF01\u4F60\u5347\u7D1A\u5230\u4E86\u7B49\u7D1A <strong>Lv.${gameState.level}</strong>\uFF01<br>\u89E3\u9396\u66F4\u9AD8\u7B49\u7D1A\u7684 Python \u9B54\u6CD5\u53E3\u888B\uFF0C\u53EF\u4EE5\u53BB\u631B\u6230\u66F4\u5F37\u7684\u602A\u7269\u4E86\uFF01`, 
                "fa-circle-up", 
                true
            );
        }, 300);
        
        // 角色頭像微光動效
        const avatar = document.querySelector(".avatar-box");
        avatar.style.boxShadow = "0 0 25px var(--neon-pink)";
        setTimeout(() => {
            avatar.style.boxShadow = "0 0 10px rgba(0, 255, 255, 0.2)";
        }, 1500);
    }
    updatePlayerStats();
    saveGame();
}

// 6. 事件綁定 (Event Listeners)
document.getElementById("castSpellBtn").addEventListener("click", castSpell);
document.getElementById("clearConsoleBtn").addEventListener("click", clearConsole);
document.getElementById("helpBtn").addEventListener("click", startTutorial);

document.getElementById("modalCloseBtn").addEventListener("click", () => {
    if (tutorialActive) {
        currentTutorialStep++;
        if (currentTutorialStep < tutorialSteps.length) {
            showTutorialStep();
        } else {
            // 教學導覽結束，清除高亮並保存狀態
            tutorialActive = false;
            document.querySelectorAll(".tutorial-highlight").forEach(el => {
                el.classList.remove("tutorial-highlight");
            });
            document.getElementById("modalOverlay").classList.remove("show");
            localStorage.setItem("pyquest_tutorial_seen", "true");
            appendSuccessMessage("【新手教學】導覽完成！祝你施法順利！");
        }
    } else {
        document.getElementById("modalOverlay").classList.remove("show");
    }
});

// 當網頁載入時初始化
window.addEventListener("DOMContentLoaded", () => {
    loadGame();
    initPyodide();
    updatePlayerStats();
    renderQuestMap();
    
    // 如果是首次啟動，於 1.5 秒後自動啟動新手教學導覽
    const seenTutorial = localStorage.getItem("pyquest_tutorial_seen");
    if (!seenTutorial) {
        setTimeout(() => {
            startTutorial();
        }, 1500);
    }
});

// 7. 魔法編輯器行號更新與滾動同步
const textareaElement = document.getElementById("codeTextarea");
const lineNumbersElement = document.getElementById("lineNumbers");

if (textareaElement && lineNumbersElement) {
    textareaElement.addEventListener("input", updateLineNumbers);
    textareaElement.addEventListener("scroll", () => {
        lineNumbersElement.scrollTop = textareaElement.scrollTop;
    });
}

function updateLineNumbers() {
    const textarea = document.getElementById("codeTextarea");
    const lineNumbers = document.getElementById("lineNumbers");
    if (!textarea || !lineNumbers) return;
    const lines = textarea.value.split("\n").length;
    lineNumbers.innerHTML = Array(lines)
        .fill(0)
        .map((_, i) => `<div>${i + 1}</div>`)
        .join("");
}
