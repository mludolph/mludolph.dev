---
title: Principal Component Analysis
subtitle: Motivation, Derivation and Implementation
tags:
  - Machine Learning
fabIconPack: fas
fabIcon: square-root-alt
wordcount: 1000
---


**Principal Component Analysis (PCA)** is a dimensionality reduction method that tries to reduce the dimensions by finding the most relevant directions in the high dimensional space. Given $N$ $d$-dimensional data points $x_1, \dots, x_N \in \mathbb{R}^d$, we can find a projection such that the projected data a) is as close to the original data is possible (**minimum noise**) or equivalently b) has maximum variance (**maximum signal**). 

For PCA we assume that the data is centered, meaning that the mean $\mu = \frac{1}{N} \sum_{i=1}^N x_i$ is $0$. We are then looking for directions $w \in \mathbb{R}^d$, for which we can show that both motivations a) and b) are equivalent:

$$
\begin{aligned}
&\min_{w} \sum_{i=1}^n \lVert (w^\top x_i)w - x_i \rVert^2\\
=& \min_{w} \sum_{i=1}^n w^\top x_i x_i^\top w w^\top w - w^\top x_i x_i^\top w + x_i^\top x_i \\
=& \min_{w} -\sum_{i=1}^n w^\top x_i x_i^\top w \\
=& \max_{w} \sum_{i=1}^n w^\top x_i x_i^\top w \\
=& \max_{w} w^\top X X^\top w\\
=& \max_{w} \frac{1}{n} w^\top x_i x_i^\top w\\
=& \max_{w} \mathbb{E}[(w^\top X)^2]\\
\stackrel{centered}{=}& \max_{w} Var(w^\top X)
\end{aligned}
$$

Since we are only looking for the direction $w$ and do not care about its length $\lVert w \rVert$, we can constrain $w$ to be of unit length, which results in the following constrained optimization problem: 

$$
\max_{w} w^\top X X^\top w \text{ s.t } \lVert w \rVert = 1
$$

The matrix $S = X X^\top$ is usually referred to as the **scatter matrix** and is positive-semidefinite and is closely related to the **biased empirical covariance** $\frac{1}{N}XX^\top$. The latter can also be used to perform PCA since the constant factor does not change the optimal value. Using the method of Lagrange multipliers we can then find the solution to the constrained optimization problem:

**1) Derive Lagrangian**: 
$$
\mathcal{L}(w, \lambda) = w^\top S w - \lambda (w^\top w - 1)
$$

**2) Solve partial derivatives of Lagrangian for 0**:

$$
\begin{aligned}
\frac{\partial L(w, \lambda)}{\partial w}
&= 2Sw - 2\lambda w \stackrel{!}{=} 0 \\
&\Leftrightarrow Sw = \lambda w
\end{aligned}
\tag{1}
$$

$$
\begin{aligned}
\frac{\partial L(w, \lambda)}{\partial \lambda}
&= w^\top w -1  \stackrel{!}{=} 0 \\
&\Leftrightarrow w^\top w= 1\\
&\stackrel{(1)}{\Leftrightarrow} w^\top S w  = \lambda
\end{aligned}
\tag{2}
$$

The resulting problem is thus a the solution to the **eigenvalue problem** $Sw = \lambda w$. From (2) we can see that we are looking for the eigenvector $w$ of $S$ with the **largest** eigenvalue $\lambda$ since we are maximizing the objective $w^\top S w = \lambda$. From (2) we can also see that the variance along an eigenvector $w_i$ is given by $\frac{1}{N} \lambda_i$, thus projecting all data points onto the largest $k \lt d$ eigenvectors preserves the most variance.

