# git 操作

- 查看某段代码是谁写的 blame 责怪！
  git blame <file-name>
- 查看历史
  git log
- 查看标签
  git tag
- 查看分支
  git branch
- 新增本地分支
  git branch <file-name>
- 修改分支名
  git branch -m <new-file-name>
- 删除本地分支
  git branch -d <local-branchname>
- 切换分支
  git checkout -b <file-name>
- 放弃工作区修改
  git checkout <file-name> 单个文件
  git checkout . 放弃所有
- 提交一个还原 commit 修改的操作
  git revert <commit-id>
- git reset <commit-id>
  默认就是-mixed 参数。
- git reset --mixed HEAD^
  回退至上个版本，它将重置 HEAD 到另外一个 commit,并且重置暂存区以便和 HEAD 相匹配，但是也到此为止。工作区不会被更改。
- git reset --soft HEAD~3
  回退至三个版本之前，只回退了 commit 的信息，暂存区和工作区与回退之前保持一致。如果还要提交，直接 commit 即可
- git reset --hard <commit-id>
  彻底回退到指定 commit-id 的状态，暂存区和工作区也会变为指定 commit-id 版本的内容
