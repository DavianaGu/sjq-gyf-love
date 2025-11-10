import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Music() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [lyricsOpen, setLyricsOpen] = useState({});
  const [currentSong, setCurrentSong] = useState(null);

  const songs = [
    {
      title: "沦陷 - JuggShots",
      src: "/music/lunxian.mp3",
      lyrics: `
弥漫的烟
散不出留在房间
我在窗前
捧着书本和茶点
我总是失望对于自己和明天
灯光下的微点
又晃了我的眼
I'm thinking about you
耳机播放着鼓点
I can't live without you
保持我们初见时的新鲜
I'm thinking about you
找个舒适的距间
可我的性格总让我感觉亏欠
不确定的地点和一个待定的时间
我怎么也会走进一场未知的沦陷
一想到你就没有任何不适的感觉
未来的每一天
都多爱你一遍
现在是回忆陪我在作伴
重复的桥段里面谁是病患
等待着忽然间一个笑容
别打扰了我的梦
Cause I can't live without you
I'm thinking about you
耳机播放着鼓点
I can't live without you
保持我们初见时的新鲜
I'm thinking about you
找个舒适的距间
可我的性格总让我感觉亏欠
不确定的地点和一个待定的时间
我怎么也会走进一场未知的沦陷
一想到你就没有任何不适的感觉
未来的每一天
都多爱你一遍
I'm thinking about you
耳机播放着鼓点
I can't live without you
保持我们初见时的新鲜
I'm thinking about you
找个舒适的距间
可我的性格总让我感觉亏欠
不确定的地点和一个待定的时间
我怎么也会走进一场未知的沦陷
一想到你就没有任何不适的感觉
未来的每一天
都多爱你一遍
      `,
    },
    {
      title: "Down 4u(沦陷英文版) - JuggShots",
      src: "/music/down4u.mp3",
      lyrics: `
Getting so close When I'm starring at your face
Can we just slow down wanna follow your pace
Diving into your eyes girl got me in a daze
Gimme a little taste
But don't just keep me waiting
I'm thinking about you
We ain't got too much time
I can't live without you
Missing your perfume fills all of my mind
I'm thinking about you
Getting our souls intertwined
Don't say another word just say you gon be mine
Our story is a perfect song now it needs an interlude
Feels like floating up in the sky when I'm so down 4 you
Don't be afraid of any tricks I'm telling you the truth
This love I can't refuse
Cos I'm so down 4 you
Your hesitation got me so obsessed
Toss and turn at night baby is that a test
I didn't know that I would be such a mess
Cast a spell in my head
Cos I can't live without you
I'm thinking about you
We ain't got too much time
I can't live without you
Missing your perfume fills all of my mind
I'm thinking about you
Getting our souls intertwined
Don't say another word just say you gon' be mine
Our story is a perfect song now it needs an interlude
Feels like floating up in the sky when I'm so down 4 you
Don't be afraid of any tricks I'm telling you the truth
This love I can't refuse
Cos I'm so down 4 you
I'm thinking about you
We ain't got too much time
I can't live without you
Missing your perfume fills all of my mind
I'm thinking about you
Getting our souls intertwined
Don't say another word just say you gon' be mine
Our story is a perfect song now it needs an interlude
Feels like floating up in the sky when I'm so down 4 you
Don't be afraid of any tricks I'm telling you the truth
This love I can't refuse
Cos I'm so down 4 you
      `,
    },
    {
      title: "눈,코,입(眼鼻嘴) - TAEYANG(太阳)",
      src: "/music/yanbizui.mp3",
      lyrics: `
미안해 미안해 하지마
不要说对不起 对不起
내가 초라해지잖아
只会让我更落魄
빨간 예쁜 입술로
用你好看的红色嘴唇
어서 나를 죽이고 가
快来杀了我再走吧
나는 괜찮아
我没关系的
마지막으로 나를 바라봐줘
最后看我一眼吧
아무렇지 않은 듯 웃어줘
没有事一样的笑吧
네가 보고 싶을 때
让我想你的时候
기억할 수 있게
让我能记得
나의 머릿속에 네 얼굴 그릴 수 있게
能让我在脑海里画出你的样子
널 보낼 수 없는 나의 욕심이
无法放你走的我的贪心
집착이 되어 널 가뒀고
变成偏执囚禁你
혹시 이런 나 땜에 힘들었니
是不是因为这样的我累了
아무 대답 없는 너
没有任何回答的你
바보처럼 왜
为什么像傻子一样
너를 지우지 못해
无法抹去你
넌 떠나버렸는데
你已经离开了
너의 눈 코 입
你的眼鼻嘴
날 만지던 네 손길
曾抚摸我的你的手
작은 손톱까지 다
连小小的手指甲都
여전히 널 느낄 수 있지만
尽管依然能够感受到你
꺼진 불꽃처럼
像结束了的烟火一样
타들어가버린
燃尽的
우리 사랑 모두 다
我们的爱情全都
너무 아프지만 이젠 널 추억이라 부를게
虽然很痛 但如今你称之为回忆吧
사랑해 사랑했지만
爱你 虽然爱你
내가 부족했었나 봐
可能我还不够吧
혹시 우연이라도
或许 即使偶然间
한순간만이라도 널
仅仅是一瞬间
볼 수 있을까
能见你吗
하루하루가 불안해져
一天一天越来越不安
네 모든 게 갈수록 희미해져
关于你的所有都开始模糊
사진 속에 너는 왜
照片里的你 为什么
해맑게 웃는데
笑得那么灿烂
우리에게 다가오는 이별을 모른 채
连走向我们的离别都没有察觉
널 보낼 수 없는 나의 욕심이
无法放你走的我的贪心
집착이 되어 널 가뒀고
变成偏执囚禁你
혹시 이런 나 땜에 힘들었니
是不是因为这样的我累了
아무 대답 없는 너
没有任何回答的你
바보처럼 왜
为什么像傻子一样
너를 지우지 못해
无法抹去你
넌 떠나버렸는데
你已经离开了
너의 눈 코 입
你的 眼鼻嘴
날 만지던 네 손길
曾抚摸我的你的手
작은 손톱까지 다
连小小的手指甲都
여전히 널 느낄 수 있지만
尽管依然能够感受到你
꺼진 불꽃처럼
像结束了的烟火一样
타들어가버린
燃尽的
우리 사랑 모두 다
我们的爱情全都
너무 아프지만 이젠 널 추억이라 부를게
虽然很痛 但如今你称之为回忆吧
나만을 바라보던 너의 까만 눈
只望着我的你的黑色眼睛
향기로운 숨을 담은 너의 코
带着迷人香气的你的鼻子
사랑해 사랑해
我爱你 我爱你
내게 속삭이던 그 입술을 난..
向我诉说的那个嘴唇 我..
너의 눈 코 입
你的 眼鼻嘴
날 만지던 네 손길
曾抚摸我的你的手
작은 손톱까지 다
连小小的手指甲都
여전히 널 느낄 수 있지만
尽管依然能够感受到你
꺼진 불꽃처럼
像结束了的烟火一样
타들어가버린
燃尽的
우리 사랑 모두 다
我们的爱情全都
너무 아프지만 이젠 널 추억이라 부를게
虽然很痛 但如今你称之为回忆吧
      `,
    },
    {
      title: "ANGEL(天使) - 尹美莱/Tiger JK/Bizzy",
      src: "/music/angel.mp3",
      lyrics: `
You will always be my
You will always be my
넌 나의 A N G E L
슬픈 나를 항상 미소 짓게 해
누가 뭐라 해도
You you
내 맘을 녹여 너의
I Love you you
Cause you will always be my
넌 나의 A N G E L
슬픈 나를 항상 미소 짓게 해
누가 뭐라 해도
You you
내 맘을 녹여 너의
I Love you you
Cause you will always be my
윤달에 생일은 여덟 번
내 생에 위기는 여러 번
굽혀진 팔자로 걸었던
걷고 걷고 걸었던 취해
하늘에 말을 걸어
신에게 시비를 걸었던
막막한 앞날에 막말해
솔직히 몰래 떨었던
철없던 그랬던
꿈은 아주 멀었던 꿈일 뿐
무일푼 내게는 사치일 뿐
그러던 내게 다가와
넌 내게 다가와
마치 내가 태양인 듯
나 너만 바라봐
넌 나만 바라봐
넌 나의 A N G E L
슬픈 나를 항상 미소 짓게 해
누가 뭐라 해도
You you
내 맘을 녹여 너의
I Love you you
Cause you will always be my
넌 나의 A N G E L
슬픈 나를 항상 미소 짓게 해
누가 뭐라 해도
You you
내 맘을 녹여 너의
I Love you you
Cause you will always be my
1 2 3 4 5 6 7
칠전팔기 오르막길
올라가다 곤두박질
친구라는 무리들의
비웃는 손가락질 하는
잘난 이들을 보며
난 내 이를 갈았지
나 그렇게 살았지
내 영혼도 눈감았지
내 그림자도 귀찮아진
혹시 그때 내 맘 알어
그때 넌 날 감싸 안어
Angel My Angel
나 미소 짓게 해
널 위해 모든 할 수 있어
집도 짓게 돼
My Angel My Angel
나 미소 짓게 해
널 위해 모든 할 수 있어
집도 짓게 돼
넌 나의 A N G E L
슬픈 나를 항상 미소 짓게 해
누가 뭐라 해도
You you
내 맘을 녹여 너의
I Love you you
Cause you will always be my
넌 나의 A N G E L
슬픈 나를 항상 미소 짓게 해
누가 뭐라 해도
You you
내 맘을 녹여 너의
I Love you you
Cause you will always be my
웃음이 번져 내 입가에 넘쳐
No matter what they say
Imma hold you closer
웃음이 번져 내 입가에 넘쳐
No matter what they say
Imma hold you closer
Used to be a silly bum
지칠 때로 지쳤던
힘들어 쓰러졌던
내게 날개를 달아줘
Used to be a silly bum
지칠 때로 지쳤던
힘들어 쓰러졌던
내게 날개를 달아줘
넌 나의 A N G E L
슬픈 나를 항상 미소 짓게 해
누가 뭐라 해도
You you
내 맘을 녹여 너의
I Love you you
Cause you will always be my
넌 나의 A N G E L
슬픈 나를 항상 미소 짓게 해
누가 뭐라 해도
You you
내 맘을 녹여 너의
I Love you you
Cause you will always be my
넌 나의 A N G E L
슬픈 나를 항상 미소 짓게 해
누가 뭐라 해도
You you
내 맘을 녹여 너의
I Love you you
Cause you will always be my
넌 나의 A N G E L
슬픈 나를 항상 미소 짓게 해
누가 뭐라 해도
You you
내 맘을 녹여 너의
I Love you you
Cause you will always be my
      `,
    },
    {
      title: "Why Would I Ever - Paula DeAnda",
      src: "/music/whywouldiever.mp3",
      lyrics: `
Why would I ever
Why would I ever
Why would I ever think of leaving you leaving you
Why would I ever
Why would I ever
Why would I ever think of leaving you leaving you
Wait a minute baby tell me what's up lately
I've been knowing you too long
Why you hiding something
Thought we was through with fronting
I can tell there's something wrong I can tell
How could you even think that
I wouldn't have your back
It's me and you against the world
No matter what we go through
I'ma always roll with you
I promise I'll be your girl
Why would I ever
Why would I ever
Why would I ever think of leaving you
Someone say why would I ever
Baby I'll never
'Cause I just wanna know how to get through
Someone say
'Cause you put together every piece of me
Baby you you know exactly what I need to be
So tell me
Why would I ever
Why would I ever
Why would I ever think of leaving you
Wait a minute hold up
They said when you rolled up
You was yelling off the chain
You're mad when I can't make time
Should of known that I'm on my grind
Baby know it's all on your brain
Now we've been through some problems
Trust me we can solve them
We got too much in it to lose so much in it
You've always been my best friend
Stop placing your bets when
Baby I'm not leaving you I'm not leaving you
Why would I ever
Why would I ever
Why would I ever think of leaving you
Someone say
Why would I ever
Baby I'll never
'Cause I just wanna know how to get through
Someone say
'Cause you put together every piece of me
Baby you you know exactly what I need to be
So tell me
Why would I ever
Why would I ever
Why would I ever think of leaving you
Tell me why did you ever question
Question everything we spend on
Between us we got that
Have you seen us we got that
We got that love
Why would I ever
Why would I ever
Why would I ever think of leaving you
Someone say
Why would I ever
Baby I'll never
'Cause I just wanna know how to get through
No
'Cause you put together every piece of me
Baby you you know exactly what I need to be
So tell me
Why would I ever
Why would I ever
Why would I ever think of leaving you
I'm not leaving you no I'm not leaving you
I won't leave you in the cold in the cold
I'm not leaving you I'm not leaving you
Baby I know I love you
Why would I ever
Why would I ever
Why would I ever think of leaving you
Why would I ever
Why would I ever
Why would I ever think of leaving you
      `,
    },
    {
      title: "a thousand years - Christina Perri",
      src: "/music/athousandyears.mp3",
      lyrics: `
Heart beats fast
Colors and promises how to be brave
How can i love when i'm afraid to fall
But watching you stand alone
All of my doubt
Suddenly goes away somehow
One step closer
I have died every day waiting for you
Darling, don't be afraid
I have loved you for a thousand years
I‘ll love you for a thousand more
Time stands still
Beauty in all she is
I will be brave
I will not let anything take away
What's standing in front of me
Every breath
Every hour has come to this
One step closer
I have died every day waiting for you
Darling, don't be afraid
I have loved you for a thousand years
I’ll love you for a thousand more
All along I believed i would find you
Time has brought your heart to me
I have loved you for a thousand years
I‘ll love you for a thousand more
One step closer
One step closer
I have died every day waiting for you
Darling,dont't be afraid
I have loved you for a thousand years
I'll loved you for a thousand more
And all along i believed i would find you
Time has brought your heart to me
I have loved you for a thousand years
I’ll love you for a thousand more
      `,
    },
    {
      title: "修炼爱情 - 林俊杰",
      src: "/music/xiulianaiqing.mp3",
      lyrics: `
凭什么要失望
藏眼泪到心脏
往事不会说谎 别跟它为难
我们两人之间不需要这样
我想
修炼爱情的心酸
学会放好以前的渴望
我们那些信仰要忘记多难
远距离的欣赏 近距离的迷惘
谁说太阳会找到月亮
别人有的爱我们不可能模仿
修炼爱情的悲欢
我们这些努力不简单
快乐炼成泪水是一种勇敢
几年前的幻想 几年后的原谅
为一张脸去养一身伤
别讲想念我 我会受不了这样
记忆它真嚣张
路灯把痛点亮
情人一起看过多少次月亮
它在天空看过多少次遗忘
多少心慌
修炼爱情的心酸
学会放好以前的渴望
我们那些信仰要忘记多难
远距离的欣赏 近距离的迷惘
谁说太阳会找到月亮
别人有的爱我们不可能模仿
修炼爱情的悲欢
我们这些努力不简单
快乐炼成泪水是一种勇敢
几年前的幻想 几年后的原谅
为一张脸去养一身伤
别讲想念我 我会受不了这样 Oh
笑着说爱让人疯狂
哭着说爱让人紧张
忘不了那个人就投降
修炼爱情的悲欢
我们这些努力不简单
快乐炼成泪水是一种勇敢 Wooh
几年前的幻想 几年后的原谅
为一张脸去养一身伤
别讲想念我 我会受不了这样
几年前的幻想 几年后的原谅
为一张脸去养一身伤
别讲想念我
我会受不了这样
      `,
    },
    {
      title: "Always Online - 林俊杰",
      src: "/music/alwaysonline.mp3",
      lyrics: `
变色的生活 任性的挑拨
疯狂的冒出了头
单方的守候 试探的温柔
还是少了点什么
遥远两端 爱挂在天空飞
风停了也无所谓
只因为你总说
Everything will be okay
准备好了three two one
I'm always online
和你one to one 爱开始扩散
我们连结了 穿越
天空 银河 oh
开始倒数three two one
删除我的孤单
More and more 尽是深刻
爱亮了 爱笑了
I'm always online
变色的生活 任性的挑拨
疯狂的冒出了头
单方的守候 试探的温柔
却还是少了点什么
遥远两端 爱挂在天空飞
风停了也无所谓
只因为你总说
Everything will be okay
我准备好了three two one
I'm always online
和你one to one 爱开始扩散
我们连结了 穿越
天空 银河 oh
开始倒数three two one
删除我的孤单
More and more 尽是深刻
爱亮了 爱笑了
I'm always online
准备好了three two one
I'm always online
和你one to one 爱开始扩散
我们连结了 穿越
天空 银河
开始倒数three two one
删除我的孤单
爱亮了 爱笑了
I'm always online
爱亮了 爱笑了
I'm always online
      `,
    },
    {
      title: "空白 - Pank/罗凯元",
      src: "/music/kongbai.mp3",
      lyrics: `
我想念分开前的那一秒
就不会让你在我手心摆落
我想念冬夜不止那拥抱
你的吻低下头就轻易得到
Now can you feel me like
Baby please don't playing my heart
承受的谎话有巨大落差
你也不必再次解释或收场
你总有办法
唤醒我的梦做最后代价
你给的空白让我快能忘掉你
粗心的我还偏偏却又入了戏
你陷的苦海唤我来去拯救你
活得像企鹅身处北极不知道该躲到哪里
Uuuu
I falling with u u u u u
I am going psycho
Fallin into ur“苦海”
怪我还没学会
怎么彻底了却这种无奈
那天雨很大没听清wut u say
Now I still be foolishly waiting
For ul can 要多久才敢
MEGet ur luv out of my mind
你织的围巾留窗台
连房间都不习惯没你的温度难心安
Babe I can't take dat
I can't say any(thin)
你给的空白是pay-back
肆意摆动的雨点 
藏快红的眼你渐冷的对白 像Ice on my neck
你给的空白让我快能忘掉你
粗心的我还偏偏却又入了戏
你陷的苦海唤我来去拯救你
活得像企鹅身处北极不知道该躲到哪里
Uuuu
I falling with u u u u u
      `,
    },
    {
      title: "红蔷薇白玫瑰 - 邓紫棋",
      src: "/music/hqwbmg.mp3",
      lyrics: `
说不出说不出一句话
连我自己都很惊讶
面对最熟悉的你
曾经最熟悉的你oh
我竟如此害怕
我说不出口你能不能别走
留不住你曾对我的温柔
此刻我忐忑的心
你勉强的表情
爱情到底是怎么从美丽慢慢凋零
每一个夜晚我都还梦见你
也看到天真的自己
还记得我们当时如此相信
月亮会一直带领
往幸福的路径
月亮也听见你说
说你会一直爱我
梦里鲜红的蔷薇
睁眼是苍白的玫瑰
它躺在月亮下
纪念着曾经最真挚的爱
记忆里快乐再真切
早已被冷空气凝结
而此刻月亮下
只有伶仃的一个墓地
守护着死去的爱
我不懂我不懂为什么
你没一点的舍不得
面对这陌生的你
眼前这陌生的你oh
我努力冷静
就算我真的求你别走
就算真的勇敢地说出口
此刻我脆弱的心
你麻木的表情
爱情真的就这么从美丽慢慢凋零
每一个夜晚我都还梦见你
也看到天真的自己
还记得我们当时如此相信
月亮会一直带领
往幸福的路径
月亮也听见你说
说你会一直爱我
梦里鲜红的蔷薇
睁眼是苍白的玫瑰
它躺在月亮下
纪念着曾经最真挚的爱
记忆里快乐再真切
早已被冷空气凝结
而此刻月亮下
只有伶仃的一个墓地
守护着死去的爱
这 死去的爱
爱爱爱爱
当时你手中的那一束玫瑰
和耳边轻轻说的那一句
사랑해 사랑해
사랑해사랑해
至少你能不能别忘记
梦里鲜红的蔷薇
睁眼是苍白的玫瑰
它躺在月亮下
纪念着曾经最真挚的爱
记忆里快乐再真切
早已被冷空气凝结
而此刻月亮下
只有伶仃的一个墓地
守护着死去的爱
死去的爱
死去的爱
死去的爱
死去的爱
啊啊
      `,
    },
    {
      title: "背对背拥抱 - 林俊杰",
      src: "/music/beiduibeiyongbao.mp3",
      lyrics: `
话总说不清楚
该怎么明了
一字一句像圈套
旧帐总翻不完
谁无理取闹
你的双手甩开
刚好的微妙
然后战火再燃烧
我们背对背拥抱
滥用沉默在咆哮
爱情来不及变老
葬送在烽火的玩笑
我们背对背拥抱
真话兜着圈子乱乱绕
只是想让我知道
只是想让你知道
爱的警告
话总说不清楚
该怎么明了
一字一句像圈套
旧帐总翻不完
谁无理取闹
你的双手甩开
刚好的微妙
然后战火再燃烧
我们背对背拥抱
滥用沉默在咆哮
爱情来不及变老
葬送在烽火的玩笑
我们背对背拥抱
真话兜着圈子乱乱绕
只是想让我知道
只是想让你知道
爱的警告
我不要一直到
形同陌路变成自找
既然可以拥抱
就不要轻易放掉
我们背对背拥抱
滥用沉默在咆哮
爱情来不及变老
葬送在烽火的玩笑
我们背对背拥抱
真话兜着圈子乱乱绕
只是想让我知道
只是想让你知道
这警告
只是想让我知道
只是想让你知道
爱的警告
      `,
    },
  ];

  // ---------- 粒子爱心（淡蓝高质感，实心粒子，循环聚散） ----------
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false });
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    const DPR = window.devicePixelRatio || 1;
    canvas.width = Math.round(window.innerWidth * DPR);
    canvas.height = Math.round(window.innerHeight * DPR);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.scale(DPR, DPR);

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      canvas.width = Math.round(window.innerWidth * DPR);
      canvas.height = Math.round(window.innerHeight * DPR);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      buildHeartPoints();
    }
    window.addEventListener("resize", resize);

    // heart points (sampled) — used as attract targets during 聚集阶段
    let heartPoints = [];
    function heartShape(t) {
      // classic parametric heart, scaled to desired size
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y =
        13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t);
      return { x, y };
    }
    function buildHeartPoints() {
      heartPoints = [];
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2.6; // lift it a bit
      const scale = Math.min(window.innerWidth, window.innerHeight) / 36; // scales with window
      const samples = 1200; // many sample points to fill heart
      for (let i = 0; i < samples; i++) {
        const t = (i / samples) * Math.PI * 2;
        const p = heartShape(t);
        // jitter / radial layering to create filled interior (not just outline)
        for (let r = 0; r < 2; r++) {
          const rr = r * (Math.random() * 6 + 2); // layers inward
          const angle = Math.random() * Math.PI * 2;
          const px = cx + (p.x * (scale - rr)) + Math.cos(angle) * rr;
          const py = cy - (p.y * (scale - rr)) + Math.sin(angle) * rr;
          // restrict some points slightly within bounds
          heartPoints.push({ x: px, y: py });
        }
      }
      // shuffle heartPoints for distribution
      for (let i = heartPoints.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [heartPoints[i], heartPoints[j]] = [heartPoints[j], heartPoints[i]];
      }
    }
    buildHeartPoints();

    // particles
    const particles = [];
    const NUM = Math.min(1400, Math.max(400, Math.floor((window.innerWidth * window.innerHeight) / 6000))); // adaptive count

    for (let i = 0; i < NUM; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: 0,
        vy: 0,
        size: 1 + Math.random() * 2.2,
        alpha: 0.5 + Math.random() * 0.5,
        // assign heart target index (wrap)
        tidx: i % heartPoints.length,
        // scatter offset seed
        ox: Math.random() * 200 - 100,
        oy: Math.random() * 200 - 100,
      });
    }

    let frame = 0;
    const PERIOD = 600; // frames per full gather->scatter->gather cycle (approx)
    function animate() {
      frame++;
      // compute phase: 0..1..0 (gather when phase near 1)
      const phase = (1 + Math.sin((frame / PERIOD) * Math.PI * 2)) / 2; // 0..1..0 loop
      // clear background with淡蓝渐变
      const g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, "#eaf6ff");
      g.addColorStop(0.6, "#f6fbff");
      g.addColorStop(1, "#e8f4ff");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      // subtle overlay vignette for depth
      const vGrad = ctx.createRadialGradient(W / 2, H / 2.6, Math.min(W, H) / 4, W / 2, H / 2.6, Math.max(W, H));
      vGrad.addColorStop(0, "rgba(255,255,255,0)");
      vGrad.addColorStop(1, "rgba(200,220,235,0.08)");
      ctx.fillStyle = vGrad;
      ctx.fillRect(0, 0, W, H);

      // draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // target depends on phase:
        // - when phase > 0.6 (聚集阶段), particle moves toward its heart point
        // - when phase <= 0.6 (散开阶段), particle drifts outward randomly
        let tx, ty;
        if (phase > 0.55) {
          const hp = heartPoints[p.tidx % heartPoints.length];
          // small breathing offset so heart slightly pulses
          const breathe = Math.sin(frame * 0.02 + (i % 50)) * (2 + Math.sin(i));
          tx = hp.x + Math.cos(i * 12.9898) * breathe * 0.8;
          ty = hp.y + Math.sin(i * 78.233) * breathe * 0.8;
        } else {
          // scatter target: original position + outward offset scaled by scatter strength
          const scatterStrength = 200 + Math.sin(frame * 0.02 + i) * 40;
          tx = (W / 2) + (p.ox + Math.cos(i * 0.17) * scatterStrength);
          ty = (H / 2.6) + (p.oy + Math.sin(i * 0.19) * scatterStrength);
        }

        // smooth movement
        p.vx += (tx - p.x) * 0.02;
        p.vy += (ty - p.y) * 0.02;
        // damping
        p.vx *= 0.85;
        p.vy *= 0.85;
        p.x += p.vx;
        p.y += p.vy;

        // color and size subtle variation by phase
        const baseAlpha = 0.5 + 0.5 * p.alpha;
        const alpha = baseAlpha * (0.6 + 0.4 * phase); // slightly brighter when gathered
        const size = p.size * (0.9 + 0.6 * phase);

        ctx.beginPath();
        // solid filled circle (实心粒子)
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = `rgba(120,190,255,${alpha})`; // 淡蓝色粒子
        // subtle glow / blur
        ctx.shadowColor = "rgba(150,200,255,0.7)";
        ctx.shadowBlur = 8 * (0.5 + phase * 1.2);
        ctx.fill();
        // reset shadow to avoid affecting other drawings
        ctx.shadowBlur = 0;
      }

      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", resize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---------- UI / Cards ----------
  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        fontFamily: "'Inter', 'Quicksand', sans-serif",
        color: "#082033",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      }}
    >
      {/* canvas background */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          display: "block",
        }}
      />

      {/* 返回主页 */}
      <button
        onClick={() => navigate("/")}
        style={{
          position: "fixed",
          top: 22,
          left: 22,
          zIndex: 12,
          background: "rgba(255,255,255,0.7)",
          border: "1px solid rgba(30,120,180,0.12)",
          color: "#0b5f87",
          padding: "8px 14px",
          borderRadius: 999,
          cursor: "pointer",
          fontWeight: 600,
          boxShadow: "0 6px 18px rgba(10,60,90,0.08)",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
      >
        ← 返回主页
      </button>

      <div
        style={{
          position: "relative",
          zIndex: 6,
          padding: "120px 20px 100px",
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            margin: 0,
            marginBottom: 28,
            fontSize: 48,
            lineHeight: 1.05,
            color: "#0b5080",
            fontWeight: 800,
          }}
        >
          梦幻 · 音乐空间
        </h1>

        <p style={{ margin: "0 0 36px 0", color: "#12384d", fontSize: 16 }}>
          SJQ & GYF 我们都要好好的
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 28 }}>
          {songs.map((song, i) => (
            <div
              key={i}
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.95), rgba(244,250,255,0.9))",
                borderRadius: 16,
                padding: 18,
                boxShadow: "0 12px 30px rgba(8,44,66,0.06)",
                border: "1px solid rgba(12,80,120,0.05)",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                <h2 style={{ margin: 0, fontSize: 20, color: "#0a5a81", fontWeight: 700 }}>{song.title}</h2>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <button
                    onClick={() => {
                      const audio = document.querySelectorAll("audio")[i];
                      if (audio) {
                        audio.play();
                      }
                    }}
                    style={{
                      background: "linear-gradient(180deg,#e6f7ff,#d6f0ff)",
                      border: "1px solid rgba(10,120,170,0.12)",
                      color: "#075b7e",
                      padding: "8px 12px",
                      borderRadius: 10,
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    立即播放
                  </button>
                </div>
              </div>

              <audio
                controls
                src={song.src}
                style={{
                  width: "100%",
                  borderRadius: 10,
                  background: "#fff",
                  outline: "none",
                }}
                onPlay={() => setCurrentSong(i)}
              />

              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <button
                  onClick={() => setLyricsOpen((s) => ({ ...s, [i]: !s[i] }))}
                  style={{
                    background: lyricsOpen[i] ? "linear-gradient(180deg,#d7f2ff,#cceeff)" : "transparent",
                    border: "1px solid rgba(10,120,170,0.09)",
                    color: "#0a5174",
                    padding: "8px 12px",
                    borderRadius: 10,
                    cursor: "pointer",
                    fontWeight: 600,
                    boxShadow: lyricsOpen[i] ? "0 8px 20px rgba(10,120,170,0.06)" : "none",
                  }}
                >
                  {lyricsOpen[i] ? "收起歌词 ▲" : "展开歌词 ▼"}
                </button>
                <span style={{ color: "#456b7f", fontSize: 13 }}>{/* 可以放说明或时长 */}</span>
              </div>

              {lyricsOpen[i] && (
                <div
                  style={{
                    marginTop: 6,
                    padding: "14px",
                    borderRadius: 10,
                    background: "linear-gradient(180deg, rgba(240,249,255,0.9), rgba(250,252,255,0.95))",
                    border: "1px solid rgba(10,120,170,0.04)",
                    color: "#12384d",
                    fontSize: 15,
                    lineHeight: 1.7,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {song.lyrics.trim()}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}