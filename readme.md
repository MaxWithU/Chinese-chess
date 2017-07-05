# Chinese Chess
> 基于Vue的象棋小游戏
## 初期功能 ##
*  常规下棋功能
*  悔棋
*  胜负预判
## 思路 ##
* 通过Map Set 对象创建棋盘、象棋等不同对象
* 为每个不同的象棋对象创建移动规则
* 通过XY轴对象内数据提取比较生成象棋排布
* 将每一步的数据提取出来作为缓存以应对数据回滚