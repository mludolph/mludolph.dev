---
title: Building a Machine Learning framework from scratch
subtitle: Not the best, but my own!
tags:
  - Machine Learning
  - Neural Networks
  - Backpropagation
fabIconPack: fas
fabIcon: code
wordcount: 1000
---

$$
\begin{aligned}
Error(\hat P) &= \mathbb{E}[D_{KL}(P || \hat P)]\\
&= \mathbb{E}\Big[ \sum_{i=1}^N P_i \log \Big(\frac{P_i}{\hat P_i}\Big) \Big]\\
&= \mathbb{E}\Big[ \sum_{i=1}^N P_i \big(\log(P_i) - \log(\hat P_i)\big) \Big]\\
&= \mathbb{E}\Big[ \sum_{i=1}^N P_i \big(\log(P_i) - \log(R_i) + \log(R_i) - \log(\hat P_i)\big) \Big]\\
&= \mathbb{E}\Big[ \Big(\sum_{i=1}^N P_i \big(\log(P_i) - \log(R_i)\big)\Big) + \sum_{i=1}^N P_i \big( \log(R_i) - \log(\hat P_i)\big) \Big]\\
&= \Big(\sum_{i=1}^N P_i \big(\log(P_i) - \log(R_i)\big)\Big) + \mathbb{E}\Big[  \sum_{i=1}^N P_i \big( \log(R_i) - \log(\hat P_i)\big) \Big]\\
&= \Big(\sum_{i=1}^N P_i \log\Big(\frac{P_i}{R_i}\Big)\Big) + \mathbb{E}\Big[  \sum_{i=1}^N P_i \log\Big(\frac{R_i}{\hat P_i}\Big) \Big]\\
&= D_{KL}(P || R) + \mathbb{E}[D_{KL}(R || \hat P)]\\
&= Bias(\hat P) + Var(\hat P)
\end{aligned}
$$

**Lorem** ipsum dolor sit amet, consectetur adipiscing elit. Duis ultrices diam elit, eget bibendum sem rhoncus at. Sed mattis arcu eu lobortis consectetur. Fusce sagittis pretium mauris, vel venenatis tellus vehicula rhoncus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et facilisis augue, feugiat ullamcorper nisi. Vestibulum dignissim vitae tortor at vulputate. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam dignissim, ligula a accumsan elementum, sem neque consectetur erat, nec laoreet elit arcu nec augue. Proin scelerisque nulla ut magna mollis, nec tempus sapien interdum. Vivamus sed auctor elit. Aliquam rhoncus scelerisque vulputate. Fusce quis purus in nisi viverra efficitur id efficitur velit. Praesent dictum libero eros, eget condimentum velit vestibulum rhoncus. Aenean sollicitudin mauris eu viverra pulvinar. Integer efficitur blandit mattis. Pellentesque luctus quis felis vel tempus.

Nulla vitae metus nec sapien posuere semper convallis vel magna. Suspendisse mattis magna in erat efficitur, eget dapibus nulla egestas. Vestibulum tincidunt vestibulum porttitor. Morbi interdum diam sit amet justo ultrices consequat. Nam interdum, nisl placerat hendrerit suscipit, tortor nisl finibus ipsum, sit amet pellentesque ligula velit sit amet ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam ut libero sed est dignissim pellentesque. Suspendisse dignissim justo id ante interdum dapibus. Quisque a augue vitae diam blandit hendrerit. Suspendisse potenti. Nulla malesuada eleifend ligula non placerat. Sed lacinia ac tortor vitae porttitor. Quisque euismod pulvinar accumsan. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin finibus accumsan massa, et euismod nibh. Praesent dignissim leo tincidunt, aliquam tortor nec, efficitur dolor.

Integer faucibus nibh ac nibh elementum, a aliquet neque mattis. Nulla mollis, tortor dapibus imperdiet aliquet, ante augue condimentum diam, in lacinia lectus nulla non lectus. Mauris sed dolor id tellus consectetur pharetra. Quisque diam velit, ullamcorper in eleifend eu, scelerisque ac lacus. Vestibulum et turpis orci. Duis sed vestibulum dolor, ut condimentum mi. Nulla luctus nibh sed nulla ultrices, at consequat dolor facilisis. Etiam lobortis massa interdum ex iaculis faucibus. Suspendisse faucibus vulputate ipsum. Nunc quis ultrices tellus. Integer id magna ut orci aliquet sodales. Morbi mollis condimentum mi, at dictum sem semper nec.

Sed imperdiet fringilla sollicitudin. Pellentesque vitae posuere odio. Curabitur blandit erat nec urna convallis, a dictum tellus dictum. Maecenas in est nibh. Nulla gravida cursus lorem, id semper purus blandit quis. Etiam at finibus dui. Suspendisse mattis vel ante quis pretium. Aenean eleifend vehicula metus at pharetra. Pellentesque bibendum libero lacus, eu cursus nisl egestas sit amet.

Aliquam ultricies lorem non maximus ultrices. Proin ac tortor ante. Morbi dignissim id ante quis placerat. Vivamus quis feugiat ipsum. Praesent luctus, ex a vestibulum venenatis, ipsum lacus faucibus tortor, eu consequat massa libero a leo. In nisl mauris, semper et libero eu, euismod sollicitudin turpis. Ut a justo orci. Nullam non purus sed massa luctus vestibulum. Donec et pharetra sapien. Vivamus mi purus, lobortis ut nisi ut, suscipit aliquam enim. Pellentesque id consectetur arcu. Donec aliquet, justo non fringilla vehicula, diam nibh porta mi, ac commodo nisl diam eget elit. In vestibulum lobortis est, maximus vestibulum nunc vestibulum vitae. Phasellus ac eleifend arcu. Quisque semper at massa quis interdum. Ut efficitur neque nec elit interdum, quis gravida nisl fringilla.
