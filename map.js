// PyQuest - 關卡地圖首頁邏輯 (map.js)

const gameState = {
    level: 1,
    exp: 0,
    maxExp: 100,
    hp: 100,
    currentQuest: 1,
    currentStep: 1,
    enemyHp: 30,
    enemyMaxHp: 30,
    unlockedQuests: [1] // 預設解鎖第一關
};

// 1. 存檔與讀檔系統
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
        } catch (e) {
            console.error("Failed to parse game save", e);
        }
    }
}

// 2. 更新英雄數值介面
function updatePlayerStats() {
    const mapLevel = document.getElementById("mapHeroLevel");
    if (mapLevel) {
        mapLevel.innerText = `Lv.${gameState.level}`;
        const expPercent = (gameState.exp / gameState.maxExp) * 100;
        document.getElementById("mapExpBar").style.width = `${expPercent}%`;
        document.getElementById("mapExpValue").innerText = `${gameState.exp} / ${gameState.maxExp}`;
    }
}

// 3. 渲染地圖傳送節點 (物理跳轉至 game.html)
function renderQuestMap() {
    const map = document.getElementById("questMap");
    if (!map) return;
    map.innerHTML = "";
    const totalQuests = 10;
    
    // 關卡名稱簡表，用於 hover 提示
    const questNames = {
        1: "Lv.1 print() 輸出",
        2: "Lv.2 變數袋子",
        3: "Lv.3 算術運算",
        4: "Lv.4 If 條件判斷",
        5: "Lv.5 邏輯運算子",
        6: "Lv.6 While 迴圈",
        7: "Lv.7 For 迴圈",
        8: "Lv.8 List 列表",
        9: "Lv.9 自訂 Function",
        10: "Lv.10 Return 值"
    };

    for (let i = 1; i <= totalQuests; i++) {
        const wrapper = document.createElement("div");
        wrapper.className = "map-node-wrapper";
        
        const node = document.createElement("div");
        node.className = "map-node";
        node.innerText = i;
        node.title = questNames[i] || `第 ${i} 關`;
        
        if (i === gameState.currentQuest) node.classList.add("current");
        else if (gameState.unlockedQuests.includes(i)) node.classList.add("completed");
        else node.classList.add("locked");
        
        const maxUnlocked = Math.max(...gameState.unlockedQuests, 1);
        
        // 判定是否可點擊挑戰 (解鎖關卡或下一關)
        if (i === gameState.currentQuest || gameState.unlockedQuests.includes(i) || i <= maxUnlocked + 1) {
            node.classList.remove("locked");
            node.classList.add("unlocked");
            
            node.addEventListener("click", () => {
                // 設定要挑戰的關卡與初始步驟，並保存
                gameState.currentQuest = i;
                gameState.currentStep = 1;
                
                // 重設該關怪物的滿血量
                const questDataRef = {
                    1: 30, 2: 60, 3: 60, 4: 80, 5: 85,
                    6: 100, 7: 120, 8: 120, 9: 150, 10: 200
                };
                gameState.enemyHp = questDataRef[i] || 100;
                gameState.enemyMaxHp = questDataRef[i] || 100;
                
                saveGame();
                
                // 物理跳轉到獨立的 game.html 挑戰頁面！
                window.location.href = "game.html?v=2.0.0";
            });
        } else {
            // 鎖定節點加上鎖頭圖標
            node.innerHTML = `<i class="fa-solid fa-lock" style="font-size: 0.8rem; opacity: 0.6;"></i>`;
        }
        
        wrapper.appendChild(node);
        
        // 連接線繪製
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

// 4. 地圖頁面專用新手引導 (Modal 彈窗)
let tutorialActive = false;
let currentTutorialStep = 0;
const mapTutorialSteps = [
    { 
        title: "🧙‍♂️ 歡迎踏入 PyQuest 冒險世界！", 
        body: "這是一個將 Python 程式學習融入 RPG 的實戰修煉場。<br>在此地圖頁面，你可以查看解鎖進度，並隨時點擊數字節點開啟挑戰！", 
        targetId: "questMap", 
        btnText: "下一步 (1/2)", 
        iconClass: "fa-wand-magic-sparkles" 
    },
    { 
        title: "🗺️ 點擊數字節點開始！", 
        body: "<ul><li><b>藍色發光 (當前)</b>：你目前的修煉起點。</li><li><b>綠色 (通關)</b>：可隨時重複挑戰、複習代碼。</li><li><b>鎖頭 (未解鎖)</b>：通關前一關後將自動開啟！</li></ul>點擊任何已解鎖的數字，出發挑戰吧！", 
        targetId: "questMap", 
        btnText: "開始修煉！", 
        iconClass: "fa-map" 
    }
];

function showModal(title, body, iconClass = "fa-trophy", isLevelUp = false, btnText = "繼續冒險") {
    const overlay = document.getElementById("modalOverlay");
    const icon = document.getElementById("modalIcon");
    const closeBtn = document.getElementById("modalCloseBtn");
    
    document.getElementById("modalTitle").innerText = title;
    document.getElementById("modalBody").innerHTML = body;
    icon.className = `fa-solid ${iconClass}`;
    closeBtn.innerText = btnText;
    
    overlay.classList.add("show");
}

function startTutorial() {
    tutorialActive = true;
    currentTutorialStep = 0;
    showTutorialStep();
}

function showTutorialStep() {
    document.querySelectorAll(".tutorial-highlight").forEach(el => el.classList.remove("tutorial-highlight"));
    const step = mapTutorialSteps[currentTutorialStep];
    if (step.targetId) {
        const target = document.getElementById(step.targetId);
        if (target) {
            target.classList.add("tutorial-highlight");
        }
    }
    showModal(step.title, step.body, step.iconClass, false, step.btnText);
}

// 5. 事件綁定與初始化
document.getElementById("helpBtn").addEventListener("click", startTutorial);

document.getElementById("modalCloseBtn").addEventListener("click", () => {
    if (tutorialActive) {
        currentTutorialStep++;
        if (currentTutorialStep < mapTutorialSteps.length) {
            showTutorialStep();
        } else {
            tutorialActive = false;
            document.querySelectorAll(".tutorial-highlight").forEach(el => {
                el.classList.remove("tutorial-highlight");
            });
            document.getElementById("modalOverlay").classList.remove("show");
            localStorage.setItem("pyquest_tutorial_seen", "true");
        }
    } else {
        document.getElementById("modalOverlay").classList.remove("show");
    }
});

window.addEventListener("DOMContentLoaded", () => {
    loadGame();
    updatePlayerStats();
    renderQuestMap();
    
    // 首次啟動自動播放新手教學
    const seenTutorial = localStorage.getItem("pyquest_tutorial_seen");
    if (!seenTutorial) {
        setTimeout(() => {
            startTutorial();
        }, 1200);
    }
});
