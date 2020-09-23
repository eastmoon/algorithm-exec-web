## SSH connection between docker container

#### 環境變數設定參考

+ [How To Pass Environment Info During Docker Builds](https://blog.bitsrc.io/1f7c5566dd0e)

#### SSHPASS

+ [Direct connection to a docker container with SSH](https://codeburst.io/56e1d2744ee5)
+ [Automatically enter SSH password with script](https://stackoverflow.com/questions/12202587)

使用第三方工具 sshpass 來執行 ssh 命令，並直接帶入密碼和遠端溝通

```
sshpass -p ${SSH_PASS} ssh -o StrictHostKeyChecking=no ${SSH_USER}@${CONTAINER_NAME} command
```

#### SSH KEY

+ [產生SSH Key並且透過KEY進行免密碼登入](https://xenby.com/b/220-%E6%95%99%E5%AD%B8-%E7%94%A2%E7%94%9Fssh-key%E4%B8%A6%E4%B8%94%E9%80%8F%E9%81%8Ekey%E9%80%B2%E8%A1%8C%E5%85%8D%E5%AF%86%E7%A2%BC%E7%99%BB%E5%85%A5)
+ [Automated ssh-keygen without passphrase, how?](https://unix.stackexchange.com/questions/69314)

產生 ssh key 並由 ssh-copy-id 來傳遞給遠端主機，並以此連線時可避免再輸入密碼
> 雖然 sshpass 也能使用 ssh-copy-id，但設定後的結果並不如預期的可迴避再次輸入密碼；對此，較適當的方式應該使用導入 .pub 檔案方式，可由於會涉及複雜傳輸腳本，故不使用此方式
