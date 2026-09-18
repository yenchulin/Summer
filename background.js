chrome.runtime.onInstalled.addListener(() => {
    //create context menu
    chrome.contextMenus.create({
        id: "wording",
        title: "Summarize with Summer",
        contexts: ["selection"],
    });
});

// listener for context menu
chrome.contextMenus.onClicked.addListener(function (info, tab) {    
    chrome.storage.sync.get("chatGPT_api_key", async function (result) {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
            return;
        }
        const api_key = result.chatGPT_api_key;

        await chrome.tabs.sendMessage(tab.id, { api_key: api_key, info: info });
    });
});
