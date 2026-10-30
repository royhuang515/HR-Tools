# 人資作業工具

    npm install
    npm run dev      # 開發
    npm run build    # 輸出 dist/，整個資料夾放到內部網站即可

新增工具：建立 `src/tools/<類別>/<工具>/Index.vue`，再到 `src/registry.js` 加一筆。

測試規則層（不需安裝套件，需 Node 22+）：

    npm test

## 發佈到 GitHub Pages

1. 在 GitHub 建立新 repository（例如 `hr-tools`），不要勾選建立 README。
2. 在專案資料夾執行：

       git init
       git add .
       git commit -m "init"
       git branch -M main
       git remote add origin https://github.com/<帳號>/hr-tools.git
       git push -u origin main

3. 到 repository 的 Settings → Pages，Source 選 **GitHub Actions**。
4. 之後每次 push 到 main，會自動測試、打包並發佈。網址為
   `https://<帳號>.github.io/hr-tools/`（Actions 分頁可看進度）。
