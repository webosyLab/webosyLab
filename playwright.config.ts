import {defineConfig} from '@playwright/test';
export default defineConfig({testDir:'./tests',use:{baseURL:'http://127.0.0.1:5173',launchOptions:{executablePath:'/usr/bin/chromium',args:['--no-sandbox']}},webServer:{command:'npm run dev -- --port 5173',url:'http://127.0.0.1:5173',reuseExistingServer:true},reporter:'list'});
