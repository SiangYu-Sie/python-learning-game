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
        enemyMaxHp: 50,
        steps: [
            {
                title: "步驟 1/3: 建立第一個變數",
                text: "變數就像是你的魔法口袋。請建立一個名為 <code>mana</code> (魔力值) 的變數，並賦予數值 <code>50</code>：<br><strong style='color: #ff007f;'>mana = 50</strong>",
                tip: "在 Python 中，使用等號 = 來為變數賦值，左邊是變數名，右邊是數值。",
                placeholder: "# 建立 mana 變數並賦值 50",
                validate: (code, output) => {
                    return code.replace(/\s/g, "").includes("mana=50");
                }
            },
            {
                title: "步驟 2/3: 儲存魔法字串",
                text: "你也可以把咒語文字放進變數中。請建立一個名為 <code>spell</code> (咒語名稱) 的變數，並賦予字串 <code>'fireball'</code>：<br><strong style='color: #00ffff;'>spell = 'fireball'</strong>",
                tip: "字串必須用單引號或雙引號包起來哦！",
                placeholder: "# 建立 spell 變數並賦值 'fireball'",
                validate: (code, output) => {
                    return code.includes("spell") && (code.includes("'fireball'") || code.includes('"fireball"'));
                }
            },
            {
                title: "步驟 3/3: 實戰挑戰：檢查魔力",
                text: "哥布林工兵正要引爆炸藥！請輸出你剛剛在 <code>mana</code> 變數中存放的魔力值以啟動防護罩。請輸入：<br><strong style='color: #39ff14;'>mana = 50<br>print(mana)</strong>",
                tip: "輸出變數內容時，print() 括號內『不需要』加上引號，直接填寫變數名稱即可！",
                placeholder: "# 建立 mana 變數並用 print 輸出它",
                validate: (code, output) => {
                    return code.includes("mana") && code.includes("print") && output.trim() === "50";
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
                title: "步驟 1/3: 物理傷害計算",
                text: "寄居蟹的防禦力很高。請用 Python 幫你計算 100 的基礎傷害減去 40 的護甲阻擋後得到的最終傷害，並將結果印出：<br><strong style='color: #ff007f;'>print(100 - 40)</strong>",
                tip: "Python 可以直接當成計算機，支援 +, -, *, / 等算術符號。",
                placeholder: "# 計算 100 減 40 的結果並輸出",
                validate: (code, output) => {
                    return code.includes("-") && code.includes("print") && output.trim() === "60";
                }
            },
            {
                title: "步驟 2/3: 利用變數做加乘",
                text: "建立一個變數 <code>atk</code> 賦值 <code>20</code>，再建立一個變數 <code>crit</code> (爆擊倍率) 賦值 <code>3</code>。印出它們相乘的總傷害值：<br><strong style='color: #00ffff;'>atk = 20<br>crit = 3<br>print(atk * crit)</strong>",
                tip: "在 Python 中，乘號是半形星號 * 哦！",
                placeholder: "# 建立變數並計算乘積輸出",
                validate: (code, output) => {
                    return code.includes("*") && code.includes("print") && output.trim() === "60";
                }
            },
            {
                title: "步驟 3/3: 實戰挑戰：字串拼接術",
                text: "把不同的魔力字串連起來能引發共鳴。請將變數 <code>spell_name = 'Lightning'</code> 與字串 <code>' Bolt'</code> (注意有空格) 相加，並用 <code>print()</code> 輸出：<br><strong style='color: #39ff14;'>spell_name = 'Lightning'<br>print(spell_name + ' Bolt')</strong>",
                tip: "字串相加會把文字無縫連在一起，這叫做字串拼接 (Concatenation)！",
                placeholder: "# 拼接字串並輸出 'Lightning Bolt'",
                validate: (code, output) => {
                    return code.includes("+") && code.includes("print") && output.trim() === "Lightning Bolt";
                }
            }
        ]
    },
    4: {
        name: "Lv.4 分支岔路 ｜ if - elif - else 條件分支",
        enemyName: "地精法師",
        enemySprite: "🧙",
        enemyMaxHp: 75,
        steps: [
            {
                title: "步驟 1/3: 基礎 If 治療條件",
                text: "當地精打傷你時，你需要治療。如果你的生命值變數 <code>hp = 20</code> 小於 30，請用 <code>print()</code> 輸出 <code>'Heal'</code>：<br><strong style='color: #ff007f;'>hp = 20<br>if hp < 30:<br>&nbsp;&nbsp;&nbsp;&nbsp;print('Heal')</strong>",
                tip: "注意：if 敘述末尾必須有冒號 :，且下一行必須縮排（按 4 個空格）！",
                placeholder: "# 撰寫基礎 if 判斷式",
                validate: (code, output) => {
                    return code.includes("if") && code.includes(":") && output.trim() === "Heal";
                }
            },
            {
                title: "步驟 2/3: 屬性反制 If-Else",
                text: "地精法師的防禦護盾會變換屬性。如果 <code>enemy_type = 'water'</code>，請輸出 <code>'thunder'</code>；否則輸出 <code>'fire'</code>。請宣告屬性並撰寫判斷式：<br><strong style='color: #00ffff;'>enemy_type = 'water'<br>if enemy_type == 'water':<br>&nbsp;&nbsp;&nbsp;&nbsp;print('thunder')<br>else:<br>&nbsp;&nbsp;&nbsp;&nbsp;print('fire')</strong>",
                tip: "比較變數是否相等時，要使用兩個等號 == 哦！單等號 = 是賦值。",
                placeholder: "# 撰寫 if-else 分支語法",
                validate: (code, output) => {
                    return code.includes("if") && code.includes("else") && output.trim() === "thunder";
                }
            },
            {
                title: "步驟 3/3: 實戰挑戰：三分支判斷",
                text: "根據當前魔力 <code>mp = 45</code> 決定招式：若 <code>mp > 80</code> 輸出 <code>'Meteor'</code>；大於 30 輸出 <code>'Fireball'</code>；否則輸出 <code>'Punch'</code>：<br><strong style='color: #39ff14;'>mp = 45<br>if mp > 80:<br>&nbsp;&nbsp;&nbsp;&nbsp;print('Meteor')<br>elif mp > 30:<br>&nbsp;&nbsp;&nbsp;&nbsp;print('Fireball')<br>else:<br>&nbsp;&nbsp;&nbsp;&nbsp;print('Punch')</strong>",
                tip: "多條件判斷在 Python 中使用 elif (Else If) 關鍵字。",
                placeholder: "# 撰寫 if-elif-else 結構",
                validate: (code, output) => {
                    return code.includes("if") && code.includes("elif") && code.includes("else") && output.trim() === "Fireball";
                }
            }
        ]
    },
    5: {
        name: "Lv.5 冒險指南 ｜ 邏輯運算與比較運算",
        enemyName: "寶箱怪",
        enemySprite: "📦",
        enemyMaxHp: 85,
        steps: [
            {
                title: "步驟 1/3: 邏輯與 And 運算",
                text: "寶箱怪有陷阱防護。若有鑰匙 <code>has_key = True</code> 且無詛咒 <code>is_cursed = False</code>，才能安全開啟寶箱並輸出 <code>'Open'</code>：<br><strong style='color: #ff007f;'>has_key = True<br>is_cursed = False<br>if has_key and not is_cursed:<br>&nbsp;&nbsp;&nbsp;&nbsp;print('Open')</strong>",
                tip: "not 會翻轉布林值，not False 會得到 True。and 必須兩者都為 True 才成立。",
                placeholder: "# 使用 and 與 not 進行判斷",
                validate: (code, output) => {
                    return code.includes("and") && code.includes("not") && output.trim() === "Open";
                }
            },
            {
                title: "步驟 2/3: 邏輯或 Or 運算",
                text: "當你 <code>mp = 30</code> 大於 50 或是持有藥水 <code>has_potion = True</code>，魔法陣即為準備就緒狀態並輸出 <code>'Ready'</code>：<br><strong style='color: #00ffff;'>mp = 30<br>has_potion = True<br>if mp > 50 or has_potion:<br>&nbsp;&nbsp;&nbsp;&nbsp;print('Ready')</strong>",
                tip: "or 運算子只要兩邊有一個是 True，整個條件就會成立。",
                placeholder: "# 使用 or 邏輯運算子進行判斷",
                validate: (code, output) => {
                    return code.includes("or") && output.trim() === "Ready";
                }
            },
            {
                title: "步驟 3/3: 實戰挑戰：解除寶箱封印",
                text: "寶箱怪的致命弱點：若怪物虛弱 <code>is_weak = True</code> 且你沒有盲目 <code>is_blind = False</code>，輸出 <code>'Attack'</code>：<br><strong style='color: #39ff14;'>is_weak = True<br>is_blind = False<br>if is_weak and not is_blind:<br>&nbsp;&nbsp;&nbsp;&nbsp;print('Attack')</strong>",
                tip: "將邏輯運算子 and 與 not 結合，打擊寶箱怪吧！",
                placeholder: "# 結合 and 與 not 進行實戰挑戰",
                validate: (code, output) => {
                    return code.includes("and") && code.includes("not") && output.trim() === "Attack";
                }
            }
        ]
    },
    6: {
        name: "Lv.6 聚能魔法陣 ｜ while 條件迴圈",
        enemyName: "巨石兵",
        enemySprite: "🗿",
        enemyMaxHp: 100,
        steps: [
            {
                title: "步驟 1/3: 基礎 While 迴圈累加",
                text: "巨石兵防禦極高，你需要用迴圈聚能！當 <code>power</code> 小於 5 時，將其每次加 1 並輸出。請建立 <code>power = 0</code> 並撰寫 <code>while</code> 迴圈：<br><strong style='color: #ff007f;'>power = 0<br>while power < 5:<br>&nbsp;&nbsp;&nbsp;&nbsp;power = power + 1<br>&nbsp;&nbsp;&nbsp;&nbsp;print(power)</strong>",
                tip: "while 迴圈會在條件符合時持續重複執行。注意不要造成無限迴圈 (Infinite Loop) 哦！",
                placeholder: "# 撰寫 while 迴圈從 0 累加至 5",
                validate: (code, output) => {
                    return code.includes("while") && output.replace(/\s/g, "") === "12345";
                }
            },
            {
                title: "步驟 2/3: HP 緩慢恢復中",
                text: "巨石兵拍擊了地面！若當前生命值 <code>hp = 10</code> 小於 50，每次加 10 並輸出當前 HP 數值：<br><strong style='color: #00ffff;'>hp = 10<br>while hp < 50:<br>&nbsp;&nbsp;&nbsp;&nbsp;hp = hp + 10<br>&nbsp;&nbsp;&nbsp;&nbsp;print(hp)</strong>",
                tip: "每次迴圈增加數值時，可以用變數重新賦值（如 hp = hp + 10）。",
                placeholder: "# 迴圈每次加 10 hp 並輸出",
                validate: (code, output) => {
                    return code.includes("while") && output.replace(/\s/g, "") === "20304050";
                }
            },
            {
                title: "步驟 3/3: 實戰挑戰：狂熱連擊",
                text: "每次揮劍消耗 15 點精力 <code>energy = 50</code>。使用 while 迴圈，當精力值大於或等於 15 時，扣除 15 精力並輸出 <code>'Strike'</code>：<br><strong style='color: #39ff14;'>energy = 50<br>while energy >= 15:<br>&nbsp;&nbsp;&nbsp;&nbsp;energy = energy - 15<br>&nbsp;&nbsp;&nbsp;&nbsp;print('Strike')</strong>",
                tip: "大於或等於在 Python 中寫作 >= 運算子。",
                placeholder: "# 使用 while 扣除能量並印出 Strike",
                validate: (code, output) => {
                    return code.includes("while") && output.trim().split("\n").filter(x => x.trim() === "Strike").length === 3;
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
                title: "步驟 1/3: 基礎 For 迴圈重複",
                text: "分身妖狐分出了三個幻影！使用 <code>for</code> 迴圈與 <code>range(3)</code> 來發動三次 <code>'Slash'</code> (斬擊)：<br><strong style='color: #ff007f;'>for i in range(3):<br>&nbsp;&nbsp;&nbsp;&nbsp;print('Slash')</strong>",
                tip: "range(N) 會產生 0 到 N-1 的整數序列，是 for 迴圈的最佳拍檔。",
                placeholder: "# 用 for 迴圈與 range 輸出 3 次 Slash",
                validate: (code, output) => {
                    return code.includes("for") && code.includes("range") && output.trim().split("\n").filter(x => x.trim() === "Slash").length === 3;
                }
            },
            {
                title: "步驟 2/3: 數值加總魔法",
                text: "用 for 迴圈來計算 1 到 5 的累積魔力總和。建立 <code>total = 0</code>，用 for 迴圈迭代 <code>range(1, 6)</code> 並加總，最後在迴圈『外面』印出結果：<br><strong style='color: #00ffff;'>total = 0<br>for i in range(1, 6):<br>&nbsp;&nbsp;&nbsp;&nbsp;total = total + i<br>print(total)</strong>",
                tip: "注意：最後的 print() 必須和 for 對齊（不要縮排），這樣才不會每次迴圈都印出結果哦！",
                placeholder: "# 計算 1 加到 5 的總和並輸出",
                validate: (code, output) => {
                    return code.includes("for") && code.includes("range") && output.trim() === "15";
                }
            },
            {
                title: "步驟 3/3: 實戰挑戰：連續鎖定打擊",
                text: "妖狐分身出 5 個實體。請用 for 迴圈迭代 <code>range(5)</code>，每次輸出 <code>'Attack ' + str(i)</code> (注意有空格) 以擊打所有狐妖：<br><strong style='color: #39ff14;'>for i in range(5):<br>&nbsp;&nbsp;&nbsp;&nbsp;print('Attack ' + str(i))</strong>",
                tip: "i 變數是數字，字串拼接前必須用 str(i) 將其轉換為字串形態！",
                placeholder: "# 用 for 迴圈印出 Attack 0 到 Attack 4",
                validate: (code, output) => {
                    return code.includes("for") && code.includes("range") && output.replace(/\s/g, "").includes("Attack0Attack1Attack2Attack3Attack4");
                }
            }
        ]
    },
    8: {
        name: "Lv.8 卷軸收納盒 ｜ List (列表) 基礎操作",
        enemyName: "貪婪史萊姆",
        enemySprite: "🧪",
        enemyMaxHp: 140,
        steps: [
            {
                title: "步驟 1/3: 建立你的收納列表",
                text: "List (列表) 可以存放多項物件。請建立一個名為 <code>inventory</code> (背包) 的列表，包含 <code>'sword'</code>、<code>'shield'</code>、<code>'potion'</code> 三個字串，並將其印出：<br><strong style='color: #ff007f;'>inventory = ['sword', 'shield', 'potion']<br>print(inventory)</strong>",
                tip: "Python 的列表使用中括號 []，裡面的元素用逗號隔開。",
                placeholder: "# 建立包含三個字串的列表並印出",
                validate: (code, output) => {
                    return code.includes("[") && code.includes("]") && output.includes("sword") && output.includes("potion");
                }
            },
            {
                title: "步驟 2/3: 抽取你的主要武器",
                text: "請輸出 <code>inventory</code> 背包列表中的第一個元素（索引值為 0 的元素）來擊碎史萊姆的核心：<br><strong style='color: #00ffff;'>inventory = ['sword', 'shield', 'potion']<br>print(inventory[0])</strong>",
                tip: "列表的索引從 0 開始，第一個元素是 [0]，第二個是 [1]。",
                placeholder: "# 輸出列表的第一個元素 [0]",
                validate: (code, output) => {
                    return code.includes("[0]") && output.trim() === "sword";
                }
            },
            {
                title: "步驟 3/3: 實戰挑戰：添加卷軸與查數",
                text: "史萊姆吞了你的道具！請使用 <code>.append('scroll')</code> 將新道具加入背包，並輸出背包目前的道具數量（使用 <code>len()</code> 函數）：<br><strong style='color: #39ff14;'>inventory = ['sword', 'shield', 'potion']<br>inventory.append('scroll')<br>print(len(inventory))</strong>",
                tip: "len(list) 函數能回傳列表的長度。原本有 3 個，追加 1 個後應為 4 個。",
                placeholder: "# 使用 append 添加道具並印出 len 長度",
                validate: (code, output) => {
                    return code.includes("append") && code.includes("len") && output.trim() === "4";
                }
            }
        ]
    },
    9: {
        name: "Lv.9 終極契約 ｜ 自訂 Function (函式) 定義",
        enemyName: "雙頭奇美拉",
        enemySprite: "🦁",
        enemyMaxHp: 180,
        steps: [
            {
                title: "步驟 1/3: 定義第一個魔法招式",
                text: "Function (函式) 可以封裝你的重複魔術。請定義一個名為 <code>cast_magic</code> 的無參數函式，功能為輸出 <code>'Fire'</code>，並在下方呼叫它：<br><strong style='color: #ff007f;'>def cast_magic():<br>&nbsp;&nbsp;&nbsp;&nbsp;print('Fire')<br><br>cast_magic()</strong>",
                tip: "定義函式使用 def 關鍵字，結尾要加冒號 :，內部邏輯要縮排，最後呼叫要帶括號 ()！",
                placeholder: "# 用 def 定義 cast_magic 函式並呼叫",
                validate: (code, output) => {
                    return code.includes("def") && code.includes("cast_magic") && output.trim() === "Fire";
                }
            },
            {
                title: "步驟 2/3: 注入威力的傷害參數",
                text: "給函式傳入參數能改變其效果。定義 <code>deal_damage(dmg)</code>，功能為印出 <code>'Deal ' + str(dmg) + ' damage'</code>。呼叫它並傳入數值 <code>100</code>：<br><strong style='color: #00ffff;'>def deal_damage(dmg):<br>&nbsp;&nbsp;&nbsp;&nbsp;print('Deal ' + str(dmg) + ' damage')<br><br>deal_damage(100)</strong>",
                tip: "函式的小括號內可以放變數做為參數，呼叫時再將真實數據傳入。",
                placeholder: "# 定義 deal_damage 帶入參數 dmg 並呼叫之",
                validate: (code, output) => {
                    return code.includes("def") && code.includes("deal_damage") && output.trim() === "Deal 100 damage";
                }
            },
            {
                title: "步驟 3/3: 實戰挑戰：自訂召喚招式",
                text: "奇美拉飛了起來！定義一個接受名字與傷害雙參數的函式 <code>spell_attack(name, dmg)</code>，功能為印出 <code>'Cast ' + name + ' for ' + str(dmg) + '!'</code>。傳入 <code>'Ice'</code> 與 <code>80</code> 呼叫它：<br><strong style='color: #39ff14;'>def spell_attack(name, dmg):<br>&nbsp;&nbsp;&nbsp;&nbsp;print('Cast ' + name + ' for ' + str(dmg) + '!')<br><br>spell_attack('Ice', 80)</strong>",
                tip: "函式可以接受多個參數，用逗號隔開即可。",
                placeholder: "# 定義 spell_attack 雙參數函式並呼叫",
                validate: (code, output) => {
                    return code.includes("def") && code.includes("spell_attack") && output.trim() === "Cast Ice for 80!";
                }
            }
        ]
    },
    10: {
        name: "Lv.10 封魔戰役 ｜ Return (傳回值) 與終極對決",
        enemyName: "深淵大魔王",
        enemySprite: "👿",
        enemyMaxHp: 250,
        steps: [
            {
                title: "步驟 1/3: 傳回雙倍魔力結果",
                text: "終極戰役開始！大魔王身上有反噬結界。請定義 <code>calc_dmg(base)</code> 函式，使用 <code>return</code> 關鍵字傳回 <code>base * 2</code>。印出傳入 50 的呼叫結果：<br><strong style='color: #ff007f;'>def calc_dmg(base):<br>&nbsp;&nbsp;&nbsp;&nbsp;return base * 2<br><br>print(calc_dmg(50))</strong>",
                tip: "return 關鍵字會將計算好的數據傳出函式外，你可以用 print 把它印出來。",
                placeholder: "# 使用 return 傳回值並用 print 輸出",
                validate: (code, output) => {
                    return code.includes("def") && code.includes("return") && output.trim() === "100";
                }
            },
            {
                title: "步驟 2/3: 疊加兩股爆擊魔力",
                text: "定義 <code>total_dmg(a, b)</code>，利用 <code>return</code> 傳回兩數之和 <code>a + b</code>。使用 print 印出傳入 120 與 80 的呼叫結果：<br><strong style='color: #00ffff;'>def total_dmg(a, b):<br>&nbsp;&nbsp;&nbsp;&nbsp;return a + b<br><br>print(total_dmg(120, 80))</strong>",
                tip: "return 會打斷函式並立刻將結果返回，後方的代碼將不再執行。",
                placeholder: "# 定義加總函式並印出 total_dmg(120, 80) 結果",
                validate: (code, output) => {
                    return code.includes("def") && code.includes("return") && output.trim() === "200";
                }
            },
            {
                title: "步驟 3/3: 實戰挑戰：終極禁忌魔法",
                text: "大魔王只剩 250 HP，請完成終極禁忌魔法。定義 <code>ultimate_spell(atk)</code> 函式：如果 <code>atk > 100</code> 傳回 <code>atk * 3</code>，否則傳回 <code>atk</code>。印出傳入 <code>100</code> (原力傷害) 呼叫該函式的傳回值：<br><strong style='color: #39ff14;'>def ultimate_spell(atk):<br>&nbsp;&nbsp;&nbsp;&nbsp;if atk > 100:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return atk * 3<br>&nbsp;&nbsp;&nbsp;&nbsp;else:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return atk<br><br>print(ultimate_spell(100))</strong>",
                tip: "在 return 中可以使用條件分支。100 不大於 100，所以應傳回 100！這是一次完美的冒險！",
                placeholder: "# 實作含條件分支 return 的終極魔法並印出結果",
                validate: (code, output) => {
                    return code.includes("def") && code.includes("return") && output.trim() === "100";
                }
            }
        ]
    }
};

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

// 載入關卡數據 (Load Quest Data)
function loadQuest(questId) {
    const quest = questData[questId];
    if (!quest) return;
    
    // 更新頂部與標籤
    document.getElementById("currentQuestName").innerText = quest.name;
    document.getElementById("enemyName").innerText = quest.enemyName;
    document.getElementById("enemySprite").innerText = quest.enemySprite;
    
    // 重設怪物 HP
    gameState.enemyHp = quest.enemyMaxHp;
    gameState.enemyMaxHp = quest.enemyMaxHp;
    updateEnemyHpBar();
    
    // 載入當前步驟
    loadStep();
    
    // 更新地圖節點高亮
    renderQuestMap();
}

// 載入步驟數據 (Load Step Data)
function loadStep() {
    const quest = questData[gameState.currentQuest];
    const step = quest.steps ? quest.steps[gameState.currentStep - 1] : null;
    
    if (!step) {
        // 如果沒有步驟，說明該關卡還未實作 (2-10 關卡)
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
    
    // 引導高亮動效 (Guided Highlights)
    const editorContainer = document.getElementById("editorContainer");
    editorContainer.classList.add("highlight-guide");
    setTimeout(() => {
        editorContainer.classList.remove("highlight-guide");
    }, 3000);
    
    // 清空編輯器讓使用者手動輸入，並設定引導 placeholder 提示
    const textarea = document.getElementById("codeTextarea");
    textarea.value = "";
    if (step.placeholder !== undefined) {
        textarea.placeholder = step.placeholder;
    } else {
        textarea.placeholder = "# 在這裡編寫你的 Python 魔法咒語...";
    }
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

// 5. 詠唱魔法執行 (Cast Spell Execution)
async function castSpell() {
    if (!pyodideInstance) return;
    
    const code = document.getElementById("codeTextarea").value;
    stdoutBuffer = ""; // 重設緩衝區
    
    appendSystemMessage("【魔法詠唱中...】");
    
    try {
        // 在 Pyodide 前端沙盒執行 Python 代碼
        await pyodideInstance.runPythonAsync(code);
        
        // 輸出 print 的內容
        if (stdoutBuffer) {
            appendPrintMessage(stdoutBuffer.trim());
        } else {
            appendSystemMessage("（魔法無聲生效，無終端輸出）");
        }
        
        // 驗證代碼是否正確 (Verification)
        verifyCode(code, stdoutBuffer);
        
    } catch (err) {
        // 捕獲 Python 的 Traceback 錯誤
        appendErrorMessage(err.toString());
    }
}

// 傷害數字彈窗 (Damage Text Popup)
function showDamagePopup(amount) {
    const arena = document.querySelector(".battle-arena");
    const popup = document.createElement("div");
    popup.className = "damage-popup";
    popup.innerText = `-${Math.round(amount)} HP`;
    
    // 定位在怪物 sprite 附近
    const rightOffset = 80 + Math.random() * 40;
    const topOffset = 70 + Math.random() * 30;
    popup.style.right = `${rightOffset}px`;
    popup.style.top = `${topOffset}px`;
    
    arena.appendChild(popup);
    
    setTimeout(() => {
        popup.remove();
    }, 1000);
}

// 魔法視覺特效 (Spell Flash Visual FX)
function playSpellFx(questId) {
    const fx = document.getElementById("spellFxOverlay");
    let type = "fire";
    
    if (questId >= 9) {
        type = "ice";
    } else if (questId >= 4 && questId <= 6) {
        type = "thunder";
    }
    
    fx.className = `spell-fx-overlay spell-${type}`;
    setTimeout(() => {
        fx.className = "spell-fx-overlay";
    }, 400);
}

// 滿版成就/升級彈窗 (Achievements / Level-up Modals)
function showModal(title, body, iconClass = "fa-trophy", isLevelUp = false) {
    const overlay = document.getElementById("modalOverlay");
    const icon = document.getElementById("modalIcon");
    const mHeader = document.querySelector(".modal-header");
    
    document.getElementById("modalTitle").innerText = title;
    document.getElementById("modalBody").innerHTML = body;
    icon.className = `fa-solid ${iconClass}`;
    
    if (isLevelUp) {
        mHeader.classList.add("level-up");
    } else {
        mHeader.classList.remove("level-up");
    }
    
    overlay.classList.add("show");
}

// Local Storage 存檔/讀檔 (Local Storage Save/Load)
function saveGame() {
    localStorage.setItem("pyquest_save_v2", JSON.stringify(gameState));
}

function loadGame() {
    const saved = localStorage.getItem("pyquest_save_v2");
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            Object.assign(gameState, parsed);
            if (!gameState.unlockedQuests) {
                gameState.unlockedQuests = [1];
            }
            appendSystemMessage("\u3010\u9032\u5EA6\u52A0\u8F09\u3011\u6210\u529F\u8F09\u5165\u4F60\u4E0A\u6B21\u5192\u96AA\u7684\u5B58\u6A94\uFF01");
        } catch (e) {
            console.error("Failed to parse game save", e);
        }
    }
}

// Quest Map Rendering (渲染傳送地圖)
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
        
        // 判定關卡節點狀態
        if (i === gameState.currentQuest) {
            node.classList.add("current");
        } else if (gameState.unlockedQuests.includes(i)) {
            node.classList.add("completed");
        } else {
            node.classList.add("locked");
        }
        
        // 只要當前關卡已解鎖、已完成，或是最大解鎖關卡 + 1，即允許點擊進入重複挑戰
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
        
        // 連接線 (最後一關後無連線)
        if (i < totalQuests) {
            const line = document.createElement("div");
            line.className = "map-connector";
            
            if (gameState.unlockedQuests.includes(i) && gameState.unlockedQuests.includes(i + 1)) {
                line.classList.add("completed");
            } else if (i === gameState.currentQuest || (gameState.unlockedQuests.includes(i) && i + 1 === gameState.currentQuest)) {
                line.classList.add("active");
            }
            wrapper.appendChild(line);
        }
        map.appendChild(wrapper);
    }
}

// 驗證代碼是否正確並觸發對應的戰鬥回饋與成就 (Verify Code & Attack Feedbacks)
function verifyCode(code, output) {
    const quest = questData[gameState.currentQuest];
    if (!quest || !quest.steps) return;
    
    const step = quest.steps[gameState.currentStep - 1];
    if (!step) return;
    
    const isCorrect = step.validate(code, output);
    
    if (isCorrect) {
        appendSuccessMessage("\u3010\u9B54\u6CD5\u8A65\u5531\u6210\u529F\uFF01\u3011");
        
        // 動態按題目數量計算扣減傷害
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
document.getElementById("modalCloseBtn").addEventListener("click", () => {
    document.getElementById("modalOverlay").classList.remove("show");
});

// 當網頁載入時初始化
window.addEventListener("DOMContentLoaded", () => {
    loadGame();
    initPyodide();
    updatePlayerStats();
    renderQuestMap();
});
